"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/lib/db-users";
import { LoginSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export const loginAction = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success)
    return {
      error: "Invalid fields!",
    };

  const { email, password } = validatedFields.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      error: "Email does not exist!",
    };
  }
  const matchedPassword = await bcrypt.compare(password, user.password);

  if (!matchedPassword) {
    return {
      error: "Incorrect Password!",
    };
  }

  try {
    if (user.role === "Admin") {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/admin",
      });
    }
    if (user.role === "User") {
      await signIn("credentials", {
        email,
        password,
        redirectTo: "/user",
      });
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }

  return {
    success: "Login successful!",
  };
};
