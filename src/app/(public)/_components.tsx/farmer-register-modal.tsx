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
import { api } from "@/trpc/react";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import RegisterForm from "./resigter-form";
import type { Farmer } from "@prisma/client";
import { formatName } from "@/lib/distributionUtils";
function FarmerRegisterModal({
  open,
  openModal,
}: {
  openModal: React.Dispatch<React.SetStateAction<"register" | "login" | null>>;
  open: "register" | "login" | null;
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = React.useState("");
  const [farmer, setFarmer] = useState<Farmer | null>(null);
  const [step, setStep] = useState<"send-otp" | "inpu-otp" | "register">(
    "send-otp",
  );
  const onClose = () => openModal(null);
  const onOpenLogin = () => openModal("login");

  const { mutate: sendOtp, isPending: sendOtpIsPending } =
    api.public_register.sendOTP.useMutation({
      async onSuccess(data) {
        const sms = await sendSMS({ ...data });
        console.log(sms.success);
        if (sms.success) {
          setStep("inpu-otp");
        }
      },
      onError(error) {
        console.log(error);
        toast.error(error.message);
      },
    });

  const { mutate: confirmOtp, isPending: confirmOtpIsPending } =
    api.public_register.submitOtp.useMutation({
      async onSuccess(data) {
        if (data.success && data.data) {
          toast.success("OTP verified successfully");
          setFarmer(data.data);
          setStep("register");
        } else {
          toast.error(data.message);
        }
      },
      onError(error) {
        console.log(error);
        toast.error(error.message);
      },
    });

  const onSubmit = () => {
    sendOtp({ phoneNumber });
  };

  const onConfirmOtp = () => {
    if (value.length < 6) return toast.error("OTP must be 6 digits");
    confirmOtp({ phoneNumber, otp: parseInt(value) });
  };

  const sendSMS = async ({
    phoneNumber,
    otp,
  }: {
    phoneNumber: string;
    otp: number;
  }) => {
    const res = await fetch("/api/send-sms-phil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: phoneNumber, // recipient number
        message: `Your OTP code is: ${otp}\nThis code will expire in 5 minutes.\n\n- GeoAgri`, // message content
        senderId: "PhilSMS", // if you have a valid sender id
      }),
    });

    return await res.json();
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
          {step === "send-otp" ? (
            <>
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
                  placeholder="Input phone number format +639XXXXXXXXX"
                />
                <Button onClick={onSubmit} disabled={sendOtpIsPending}>
                  Submit
                </Button>
              </div>
            </>
          ) : step === "inpu-otp" ? (
            <div className="flex w-full flex-col items-center justify-center">
              <div className="space-y-4">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className="scale-125 md:scale-150">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <div className="text-center text-sm">
                  {value === "" ? (
                    <>Enter your one-time otp.</>
                  ) : (
                    <>You entered: {value}</>
                  )}
                </div>
              </div>
              <Button
                onClick={onConfirmOtp}
                disabled={confirmOtpIsPending}
                className="mt-5 w-full"
              >
                Submit OTP
              </Button>
            </div>
          ) : (
            <div className="w-full">
              {farmer ? (
                <div className="mb-5 px-5">
                  <p className="font-bold text-lg">Welcome, {formatName(farmer)}!</p>
                  <p className="text-slate-500">
                    Please fill out your account registration details.
                  </p>
                </div>
              ) : (
                <div></div>
              )}
              <RegisterForm phoneNumber={phoneNumber} onClose={onOpenLogin} />
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default FarmerRegisterModal;
