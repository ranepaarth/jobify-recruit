"use server";

import { prisma } from "@/lib/prisma";
import { CreateJobPostSchema } from "@/schema/zod-schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createJobPostAction = async (
  values: z.infer<typeof CreateJobPostSchema>
) => {
  const validatedFields = CreateJobPostSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const {
    category,
    companyDesc,
    companyName,
    experience,
    jobDesc,
    salary,
    skills,
    title,
    type,
  } = validatedFields.data;

  const jobCategory = await prisma.jobCategory.findFirst({
    where: {
      name: category,
    },
  });

  if (!jobCategory) {
    return {
      error: "Provided job category does not exist!",
    };
  }

  const jobPost = await prisma.jobPost.create({
    data: {
      companyDesc,
      companyName,
      experience,
      jobDesc,
      salary,
      skills,
      title,
      type,
      categoryId: jobCategory.id,
    },
  });

  if (!jobPost) {
    return {
      error: "Error while creating this job post!",
    };
  }

  revalidatePath('/admin/jobs')

  return {
    success: "Job post created Successfully",
  };
};
