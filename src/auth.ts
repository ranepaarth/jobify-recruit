import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./lib/db-users";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (!session.user || !token.sub) return session;
      session.user.role = token.role;
      session.user.id = token.sub;
      const user = await getUserById(token.sub);

      session.user.resumeUrl = user?.resumeUrl as string;
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await getUserById(token.sub);

      if (!user) return token;

      token.role = user.role;
      token.resumeUrl = user.resumeUrl;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
