import JobsListing from "@/components/protected/job-listing";
import AboutJob from "@/components/protected/user/job-application/about-job";
import JobApplyButton from "@/components/protected/user/job-application/job-apply-button";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import { userHasApplied } from "@/lib/user-has-applied";
import React from "react";

type AllJobsPageProps = {
  searchParams: {
    jobId: string;
  };
};

const AllJobsPage = async ({ searchParams }: AllJobsPageProps) => {
  const job =
    searchParams.jobId &&
    (await prisma.jobPost.findUnique({
      where: {
        id: searchParams.jobId,
      },
    }));
  const user = await getUser();

  if (job) {
    const hasApplied = await userHasApplied(user.id, job.id);
    return (
      <div className="flex flex-col gap-4">
        <AboutJob job={job} />
        <JobApplyButton jobId={job.id} hasApplied={hasApplied} />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="text-2xl font-bold pb-2 border-b-4 border-blue-800 w-fit pr-4 text-neutral-800">
        Apply to Jobs
      </h3>
      <JobsListing />
    </div>
  );
};

export default AllJobsPage;
