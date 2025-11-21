"use client";
import { useEffect } from "react";
import { useLocaleStore } from "@/store/localeStore";

export default function LocaleInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const setLocale = useLocaleStore((state) => state.setLocale);

  useEffect(() => {
    const savedLocale =
      (localStorage.getItem("locale") as "en" | "tl" | "wr") || "en";
    setLocale(savedLocale);
  }, [setLocale]);

  return <>{children}</>;
}
