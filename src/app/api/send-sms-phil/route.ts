// app/api/philsms-send/route.ts (Next.js App Router)
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { recipient, message, senderId } = await req.json();

    const body = JSON.stringify({
      recipient,
      sender_id: senderId,  // optional — use default if not supplied
      message,
      type: "plain", // or “sms” depending on API spec
    });

    const response = await fetch("https://app.philsms.com/api/v3/sms/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PHILSMS_API_TOKEN!}`,
        Accept: "application/json",
      },
      body,
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("PhilSMS error:", data);
      return NextResponse.json({ success: false, error: data }, { status: response.status });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("Error sending via PhilSMS:", err);
    return NextResponse.json({ success: false, error: err }, { status: 500 });
  }
}
