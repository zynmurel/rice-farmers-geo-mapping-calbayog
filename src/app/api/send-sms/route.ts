import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { number, message } = await req.json();

    // Send SMS using Semaphore
    const response = await axios.post("https://api.semaphore.co/api/v4/messages", {
      apikey: process.env.SEMAPHORE_API_KEY, // store in .env
      number,
      message,
      sendername: "GEO-MAPPING", // optional, customize if you have registered sender name
    });

    return NextResponse.json({ success: true, data: response.data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
