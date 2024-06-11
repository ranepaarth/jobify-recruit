"use server";

import { prisma } from "@/lib/db";
import { RegisterSchema } from "@/schema/zod-schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const registerAction = async (
  values: z.infer<typeof RegisterSchema>
) => {
  const validatedForm = RegisterSchema.safeParse(values);

  if (!validatedForm.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password, name } = validatedForm.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    return {
      error: "Email already exists!",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      error: "Something went wrong while creating your account!",
    };
  }

  return {
    success: "Account created Successfully!",
  };
};
