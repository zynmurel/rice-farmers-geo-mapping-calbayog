"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function FarmerRegisterModal({
  open,
  openModal,
}: {
  openModal: React.Dispatch<React.SetStateAction<"register" | "login" | null>>;
  open: "register" | "login" | null;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const onClose = () => openModal(null);

  const onSubmit = () => {
    sendSMS(phoneNumber);
  };

  const sendSMS = async (number: string) => {
    const res = await fetch("/api/send-sms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: number, // recipient number
        message: "Hello from Next.js + Semaphore 🚀",
      }),
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <Dialog open={open === "register"} onOpenChange={onClose}>
      <DialogContent className="max-w-md px-5 py-5 pb-10 sm:px-10">
        <DialogHeader className="flex w-full flex-col items-center">
          <div className="flex flex-col items-center justify-center gap-3">
            <Image
              width={100}
              height={100}
              alt="logo"
              src={"/logo.png"}
              className="size-10"
            />
            <div className="text text-primary mb-5 text-center text-4xl font-black uppercase">
              <p className="tracking-widest">GEO-AGRI</p>
              <p className="text-xs font-normal">
                Calbayog City, Samar, Philippines
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-0">
            <DialogTitle>Farmer Registration</DialogTitle>
            <DialogDescription>
              Enter your submitted phone number to our office.
            </DialogDescription>
          </div>
          <div className="grid w-full gap-5 pt-5">
            <Input
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Input your phone number"
            />
            <Button onClick={onSubmit}>Submit</Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FarmerRegisterModal;
