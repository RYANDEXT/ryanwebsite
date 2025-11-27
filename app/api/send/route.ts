import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface EmailPayload {
  from: string;
  name: string;
  message: string;
}

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const TO_EMAIL = process.env.MY_EMAIL;
  try {
    const body: EmailPayload = await request.json();

    const { from, name, message } = body;

    if (!from || !name || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: TO_EMAIL!,
      subject: `from ${from}: ${name}`,
      html: `
      <h1>Message from${from}</h1>
      <p>${message}</p>
      `,
      replyTo: from,
    });
    if (error) {
      console.error("Resend Error", error);
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("General API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
