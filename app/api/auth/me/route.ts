// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import { connectToDB } from '@/lib/mongodb'; // Adjust this path to your DB connection file
// import { User } from '@/models/User';        // Adjust this path to your User model

// const JWT_SECRET = process.env.JWT_SECRET!;

// export async function GET(req: Request) {
//   try {
//     await connectToDB();

//     const cookie = req.headers.get('cookie') || '';
//     const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));

//     if (!tokenCookie) {
//       return NextResponse.json({ user: null }, { status: 401 });
//     }

//     const token = tokenCookie.split('=')[1];
//     const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

//     const user = await User.findById(decoded.userId).select('email premium');
//     if (!user) {
//       return NextResponse.json({ user: null }, { status: 404 });
//     }

//     return NextResponse.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         premium: user.premium,
//          premiumSince: user.premiumSince,
//       },
      
//     });
//   } catch (err) {
//     console.error('[auth/me] Error:', err);
//     return NextResponse.json({ user: null }, { status: 500 });
//   }
// }


import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDB } from '@/lib/mongodb';
import { User } from '@/models/User';
import { Payment } from '@/models/Payment'; // Import the Payment model

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    await connectToDB();

    // Extract token from cookies
    const cookie = req.headers.get('cookie') || '';
    const tokenCookie = cookie.split('; ').find((c) => c.startsWith('token='));

    if (!tokenCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = tokenCookie.split('=')[1];
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Fetch user with essential fields
    const user = await User.findById(decoded.userId)
      .select('email premium premiumSince name picture provider createdAt');
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Fetch latest successful payment (for premium status verification)
    const latestPayment = await Payment.findOne({
      userId: user._id,
      status: 'captured'
    })
    .sort({ createdAt: -1 })
    .select('amount currency createdAt invoiceId planId');

    // Fetch payment count for stats
    const paymentCount = await Payment.countDocuments({
      userId: user._id,
      status: 'captured'
    });

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        provider: user.provider,
        premium: user.premium,
        premiumSince: user.premiumSince,
        createdAt: user.createdAt,
        stats: {
          payments: paymentCount
        }
      },
      payment: latestPayment ? {
        amount: latestPayment.amount / 100, // Convert from paise to rupees
        currency: latestPayment.currency,
        date: latestPayment.createdAt,
        invoiceId: latestPayment.invoiceId,
        planId: latestPayment.planId
      } : null
    });

  } catch (err) {
    console.error('[auth/me] Error:', err);
    
    // Handle specific JWT errors
    if (err instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid token' }, 
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}
