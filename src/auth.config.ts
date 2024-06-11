import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./lib/db-users";
import { LoginSchema } from "./schema/zod-schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (!matchedPassword) {
          return null;
        }
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
