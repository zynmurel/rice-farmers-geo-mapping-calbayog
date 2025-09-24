import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { db } from "@/server/db";
import type { UserType } from "@/types/config";
import { formatName } from "@/lib/distributionUtils";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  session: {
    strategy: "jwt", // ✅ use JWT so it can be decoded in middleware
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        type: { label: "Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        let user;
        let name;
        console.log(credentials.type);
        if (credentials.type === "ADMIN") {
          user = await db.admin.findUnique({
            where: { username: credentials.username as string },
          });
          name = user?.adminName;
        }

        if (credentials.type === "FARMER") {
          user = await db.farmerAccount.findFirst({
            where: {
              OR: [
                {
                  Farmer: {
                    phoneNumber: credentials.username as string,
                  },
                },
                {
                  username: credentials.username as string,
                },
              ],
            },
            include: { Farmer: true },
          });
          name = user?.Farmer ? formatName(user?.Farmer) : "";
        }

        if (!user) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password,
        );
        if (!isValid) return null;
        return {
          id: user.id,
          name: name || "",
          email: user.username,
          type: credentials.type as UserType,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  // adapter: PrismaAdapter(db),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // store user ID
        token.type = user.type as UserType;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as UserType; // ✅ make type available in session
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
