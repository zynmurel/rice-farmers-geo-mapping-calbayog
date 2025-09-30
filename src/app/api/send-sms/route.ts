import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { number, message } = await req.json();

    const res = await fetch("https://api.semaphore.co/api/v4/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        apikey: process.env.SEMAPHORE_API_KEY!, // store your API key in .env
        number,
        message,
      }),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error sending SMS:", error);
    return NextResponse.json({ error: "Failed to send SMS" }, { status: 500 });
  }
}