"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import LoginForm from "../(public)/_components.tsx/login-form";
function FarmerLoginModal({
  open,
  openModal,
}: {
  openModal: React.Dispatch<React.SetStateAction<"register" | "login" | null>>;
  open: "register" | "login" | null;
}) {
  const onClose = () => openModal(null);

  return (
    <Dialog open={open === "login"} onOpenChange={onClose}>
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
            <DialogTitle>Farmer Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to get the latest updates.
            </DialogDescription>
          </div>
        </DialogHeader>
        <LoginForm userType="FARMER" />
      </DialogContent>
    </Dialog>
  );
}

export default FarmerLoginModal;
