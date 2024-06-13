import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: UserRole;
  resumeUrl:string
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

type Category = {
  id: string;
  name: string;
};

type CategoryListType = Category[];
