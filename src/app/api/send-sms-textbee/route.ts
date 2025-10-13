import { NextResponse } from "next/server";
import axios from "axios";

const BASE_URL = "https://api.textbee.dev/api/v1";

export async function POST(req: Request) {
  try {
    const { recipients, message } = await req.json();

    // Basic validation
    if (!recipients || !message) {
      return NextResponse.json(
        { success: false, error: "Recipients and message are required." },
        { status: 400 }
      );
    }

    // Make API call to TextBee
    const response = await axios.post(
      `${BASE_URL}/gateway/devices/${process.env.TEXTBEE_DEVICE_ID}/send-sms`,
      {
        recipients, // array of phone numbers
        message,
      },
      {
        headers: {
          "x-api-key": process.env.TEXTBEE_API_KEY!,
        },
      }
    );

    // Return TextBee response
    return NextResponse.json({ success: true, data: response.data });
  } catch (err: any) {
    console.error("Error sending via TextBee:", err.response?.data || err.message);
    return NextResponse.json(
      {
        success: false,
        error: err.response?.data || err.message,
      },
      { status: err.response?.status || 500 }
    );
  }
}
