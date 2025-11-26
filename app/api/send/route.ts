import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface EmailPayload {
  from: string;
  subject: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const body: EmailPayload = await request.json();

    const { from, subject, message } = body;

    if (!from || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "ryandwikidermawan06@gmail.com",
      subject: "Welcome to Resend!",
      html: "<strong>You're invited to try Resend. 🚀</strong>",
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
