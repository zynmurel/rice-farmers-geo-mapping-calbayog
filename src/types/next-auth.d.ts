// src/types/next-auth.d.ts
import NextAuth from "next-auth";
import type { UserType } from "./config";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      type :UserType
    };
  }

  interface User {
    id: number;
    adminName?: string | null;
      type :UserType
  }
}
