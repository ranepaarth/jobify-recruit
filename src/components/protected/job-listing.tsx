import SingleJobCard from "@/components/protected/single-job-card";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import { userHasApplied } from "@/lib/user-has-applied";
import React from "react";

const JobsListing = async () => {
  const jobs = await prisma.jobPost.findMany();
  const loggedInUser = await getUser();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
      {jobs.map(async (job) => {
        const hasApplied = await userHasApplied(loggedInUser.id, job.id);
        if (hasApplied) {
          return (
            <SingleJobCard
              job={job}
              key={job.id}
              userId={loggedInUser.id}
              hasApplied={true}
            />
          );
        }
        return (
          <SingleJobCard
            job={job}
            key={job.id}
            userId={loggedInUser.id}
            hasApplied={false}
          />
        );
      })}
    </div>
  );
};

export default JobsListing;
