import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Make sure this is in your .env file

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!email || !message || !name) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev", 
      to: ["abhi47025@gmail.com"], 
      subject: "New Contact Form Submission from Branqly",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("Email send result:", data);

    if (data.error) {
      console.error("Resend Error:", data.error);
      return NextResponse.json({ success: false, error: "Email service error" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

