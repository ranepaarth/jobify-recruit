import { prisma } from "@/lib/prisma";

export const userHasApplied = async (userId: string, jobId: string) => {
  const hasApplied = await prisma.jobPostUser.findUnique({
    where: {
      userId_jobPostId: {
        userId,
        jobPostId: jobId,
      },
    },
  });

  return !!hasApplied
};
