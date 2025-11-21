// app/_components/AppProviders.tsx
"use client";

import { ThemeProvider } from "./theme-provider";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import "leaflet/dist/leaflet.css";
import LocaleInitializer from "./locale-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <NuqsAdapter>
        <SessionProvider>
          <TRPCReactProvider>
            <LocaleInitializer>{children}</LocaleInitializer>
          </TRPCReactProvider>
        </SessionProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
}
