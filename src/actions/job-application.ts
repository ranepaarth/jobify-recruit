"use server";

import { getUserById } from "@/lib/db-users";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import { JobApplicationSchema } from "@/schema/zod-schema";
import { z } from "zod";

export const applyToJob = async (
  values: z.infer<typeof JobApplicationSchema>
) => {
  const validatedFields = JobApplicationSchema.safeParse(values);

  const user = await getUser();

  if (!validatedFields.success) {
    return {
      error: "Invalid pdf format!",
    };
  }

  const { jobId } = validatedFields.data;

  const applicant = await getUserById(user.id);

  if (!applicant) {
    return {
      error: "Unauthorized access denied!",
    };
  }

  const job = await prisma.jobPost.findUnique({
    where: {
      id: jobId,
    },
  });

  if (!job) {
    return {
      error: "The job you are applying for does not exist!",
    };
  }

  const hasUserApplied = await prisma.jobPostUser.findUnique({
    where: {
      userId_jobPostId: {
        userId: user.id,
        jobPostId: jobId,
      },
    },
  });

  if (hasUserApplied) {
    return {
      error: "You have already applied to this job!",
    };
  }

  await prisma.jobPostUser.create({
    data: {
      userId: user.id,
      jobPostId: jobId,
    },
  });

  // TODO: Send Email to admin and user, sender will be myself===> I will send mail to both admin and applicant

  return {
    success: "Job Application successful!",
  };
};
