import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/GitHub";
import Google from "next-auth/providers/Google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db";

export const authConfig = {
  providers: [GitHub, Google],
  adapter: DrizzleAdapter(db),
  callbacks: {
    async session({ session, user }) {
      if (session) {
        session.user.id = user.id;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signOut } = NextAuth(authConfig);
