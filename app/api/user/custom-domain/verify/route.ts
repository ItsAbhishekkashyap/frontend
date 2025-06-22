import { NextRequest, NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest';
import { User, IUser } from '@/models/User';
import dns from 'dns/promises';
import { connectToDB } from '@/lib/mongodb';
import nodemailer from 'nodemailer';

const CNAME_TARGET = 'cname.branqly.xyz';

export interface CustomDomain {
  domain: string;
  isVerified: boolean;
  cnameTarget?: string;
}

export interface VerifyDomainRequestBody {
  domainToVerify: string;
}

// ✅ Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.NOTIFY_EMAIL_USER, // your email here (like branqly@gmail.com)
    pass: process.env.NOTIFY_EMAIL_PASS, // app-specific password (never your main password)
  },
});

// ✅ Function to send notification email to you
async function sendVerificationEmail(domain: string, userEmail: string): Promise<void> {
  const mailOptions = {
    from: `"Branqly Notification" <${process.env.NOTIFY_EMAIL_USER}>`,
    to: process.env.NOTIFY_EMAIL_RECEIVER, // your personal email to get notification
    subject: `New Custom Domain Verified: ${domain}`,
    html: `
      <h3>New Custom Domain Verified</h3>
      <p><strong>Domain:</strong> ${domain}</p>
      <p><strong>User Email:</strong> ${userEmail}</p>
      <p>Reminder: Please add this domain manually to Vercel for SSL configuration.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectToDB();

  const user: IUser | null = await getUserFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body: VerifyDomainRequestBody = await req.json();
    const domainToVerify: string = body.domainToVerify?.trim().toLowerCase() || '';

    if (!domainToVerify) {
      return NextResponse.json({ error: 'Domain to verify is required' }, { status: 400 });
    }

    const fullUser = await User.findById(user._id).select('customDomains email');
    if (!fullUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const customDomains = fullUser.customDomains as CustomDomain[];

    if (!Array.isArray(customDomains) || customDomains.length === 0) {
      return NextResponse.json({ error: 'No custom domains found for user' }, { status: 400 });
    }

    const domainObj = customDomains.find((d: CustomDomain) => d.domain === domainToVerify);

    if (!domainObj) {
      return NextResponse.json({ error: 'Domain not found in your list' }, { status: 404 });
    }

    // Step 1: DNS CNAME lookup
    try {
      const records: string[] = await dns.resolveCname(domainToVerify);

      if (records.length === 0) {
        return NextResponse.json({ verified: false, error: 'No CNAME records found.' }, { status: 400 });
      }

      const expected = CNAME_TARGET.toLowerCase();
      const cnameMatch = records.some((record) => record.toLowerCase() === expected);

      if (!cnameMatch) {
        return NextResponse.json(
          { verified: false, error: `CNAME mismatch. Found: ${records.join(', ')}` },
          { status: 400 }
        );
      }
    } catch (dnsError) {
      console.error('DNS lookup error:', dnsError);
      return NextResponse.json({ verified: false, error: 'DNS lookup failed.' }, { status: 400 });
    }

    // Step 2: HTTP HEAD check
    try {
      const response = await fetch(`https://${domainToVerify}/__test`, { method: 'HEAD' });

      if (!response.ok) {
        return NextResponse.json({
          verified: false,
          error: `HTTP HEAD check failed: ${response.status} ${response.statusText}. Possible wildcard missing on Vercel.`,
        }, { status: 400 });
      }
    } catch (fetchError) {
      console.error('HTTP HEAD check error:', fetchError);
      return NextResponse.json({
        verified: false,
        error: 'HTTP HEAD request failed. The domain might not be correctly connected or Vercel wildcard domain is missing.',
      }, { status: 400 });
    }

    // ✅ All checks passed
    domainObj.isVerified = true;
    await fullUser.save();

    // ✅ Send Email to You
    await sendVerificationEmail(domainToVerify, fullUser.email);

    return NextResponse.json({ verified: true, domain: domainToVerify });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

