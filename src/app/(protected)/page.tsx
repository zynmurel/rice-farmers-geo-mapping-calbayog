"use client";
import { LoaderCircle } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

function Page() {
  const { data } = useSession();
  const path = usePathname();
  const router = useRouter();
  if (data?.user.type === "ADMIN" && !path.startsWith("/admin")) {
    router.push("admin");
  } else if (data?.user.type === "FARMER" && !path.startsWith("/farmer")) {
    router.push("farmer");
  }
  return <div className=" min-h-screen w-full items-center justify-center flex bg-sidebar/90 text-white"><LoaderCircle className=" mr-2 animate-spin"/>Loading...</div>;
}

export default Page;
