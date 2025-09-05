import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const { name, email, message }: ContactPayload = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Fallback: use Nodemailer with Ethereal test account
      const testAccount = await nodemailer.createTestAccount();
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });

      const info = await transporter.sendMail({
        from: 'Kim Visuals <no-reply@example.com>',
        to: 'kim.zuercher@kimzo.net',
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

      const previewUrl = nodemailer.getTestMessageUrl(info);
      return NextResponse.json({ ok: true, previewUrl });
    } else {
      const resend = new Resend(apiKey);

      const result = await resend.emails.send({
        from: "Kim Visuals <onboarding@resend.dev>",
        to: ["kim.zuercher@kimzo.net"],
        reply_to: email,
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });

      if (result.error) {
        return NextResponse.json({ error: result.error.message }, { status: 500 });
      }

      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


