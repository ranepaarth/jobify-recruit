"use server";

import { getUserByEmail } from "@/lib/db-users";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, name, password, isAdmin } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Email already taken!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = isAdmin ? "Admin" : "User";

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });

  if (!user) {
    return {
      error: "Error occurred while creating your account!",
    };
  }

  return {
    success: "Account created successfully!",
  };
};
