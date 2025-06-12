import Razorpay from 'razorpay'; // Import the class
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('x-razorpay-signature')!;

  const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  
  // Use the class method, not the instance method:
  const isValid = Razorpay.validateWebhookSignature(body, signature, secret);

  if (!isValid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // TODO: Handle the verified webhook event
  return NextResponse.json({ success: true });
}

