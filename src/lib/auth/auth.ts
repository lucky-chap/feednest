import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";

import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import prismadb from "@/lib/prisma/prismadb";

const adapter = PrismaAdapter(prismadb);

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter,
  providers: [Google],
  callbacks: {
    async session({ session }: any) {
      const users = await prismadb.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });
      session.user.role = users?.role;
      return session;
    },
  },
  session: { strategy: "jwt" },
});
