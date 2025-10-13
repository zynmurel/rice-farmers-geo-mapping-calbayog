"use client";
import { useState } from "react";

export default function SmsSender() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");

  const sendSms = async () => {
    const res = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: "639307038821", // ✅ must be in 63 format
        message: "Hello from my Next.js app 🚀",
      }),
    });

    const data = await res.json();
    console.log(data);
  };
  const sendSms2 = async () => {
    const res = await fetch("/api/send-sms-phil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: "639070824804", // ✅ must be in 63 format
        message: "Im haki gods",
        senderId: "PhilSMS", // if you have a valid sender id
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  const sendSms3 = async () => {
    const res = await fetch("/api/send-sms-textbee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipients: [to],
        message: message,
      }),
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="space-y-2 p-4">
      <input
        className="w-full border p-2"
        placeholder="+639XXXXXXXXX"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <textarea
        className="w-full border p-2"
        placeholder="Your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="rounded bg-blue-500 p-2 text-white" onClick={sendSms}>
        Send SMS
      </button>
      <button className="rounded bg-blue-500 p-2 text-white" onClick={sendSms2}>
        Send SMS2
      </button>
      <button className="rounded bg-blue-500 p-2 text-white" onClick={sendSms3}>
        Send SMS3
      </button>
    </div>
  );
}
