import JobApplication from "@/components/protected/user/job-application";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import { userHasApplied } from "@/lib/user-has-applied";
import { JobPost } from "@prisma/client";
import React from "react";

type JobApplicationPageProps = {
  params: {
    jobId: string;
  };
};

const JobApplicationPage = async ({ params }: JobApplicationPageProps) => {
  const job = await prisma.jobPost.findUnique({
    where: {
      id: params.jobId,
    },
  });
  const user = await getUser();

  if (!job) {
    return <div>The job you are looking for does not exist!</div>;
  }
  const hasApplied = await userHasApplied(user.id, job.id);

  return (
    <div className="w-full flex justify-center flex-1">
      <JobApplication resumeUrl={user.resumeUrl} job={job as JobPost} hasApplied={hasApplied}/>
    </div>
  );
};

export default JobApplicationPage;
