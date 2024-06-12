"use server";

import { prisma } from "@/lib/prisma";
import { CreateCategorySchema } from "@/schema/zod-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createCategoryAction = async (
  values: z.infer<typeof CreateCategorySchema>
) => {
  const validatedFields = CreateCategorySchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid input field!",
    };
  }

  const { name } = validatedFields.data;

  const category = await prisma.jobCategory.create({
    data: {
      name,
    },
  });

  if (!category) {
    return {
      error: "Error while creating category",
    };
  }

  revalidatePath("/admin/job-categories");

  return {
    success: `Category ${name} created successfully!`,
  };
};
