import SingleJobCard from "@/components/protected/single-job-card";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";

const AppliedPage = async () => {
  const user = await getUser();
  const appliedToJobs = await prisma.jobPostUser.findMany({
    where: {
      userId: user.id,
    },
    include: {
      jobPost: true,
    },
  });

  if (appliedToJobs.length <= 0) {
    return (
      <div className="text-xl font-bold w-full flex flex-col gap-4 text-neutral-800">
        <p>You&apos;ve not applied to any jobs yet</p>
        <Link
          href={"/user/all-jobs"}
          className="bg-blue-900 hover:bg-blue-950 w-full text-center py-1.5 text-white rounded-md text-sm max-w-[250px]"
        >
          Return to job search
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6">
      <h3 className="text-2xl font-bold pb-2 border-b-4 border-blue-800 w-fit pr-4 text-neutral-800">
        Jobs Applied
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
        {appliedToJobs.map((appliedJob) => (
          <SingleJobCard
            hasApplied={appliedJob.applicationStatus}
            job={appliedJob.jobPost}
            userId={user.id}
            key={appliedJob.id}
          />
        ))}
      </div>
    </div>
  );
};

export default AppliedPage;
