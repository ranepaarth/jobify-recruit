import SingleJobCard from "@/components/protected/single-job-card";
import { getUser } from "@/lib/get-logged-in-user";
import { prisma } from "@/lib/prisma";
import React from "react";

const JobsListing = async () => {
  const jobs = await prisma.jobPost.findMany();
  const loggedInUser = await getUser();

  if (!jobs.length) {
    return (
      <p className="mt-5 font-medium text-neutral-600">No Jobs posted yet</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
      {jobs.map(async (job) => (
        <SingleJobCard job={job} key={job.id} userId={loggedInUser.id} />
      ))}
    </div>
  );
};

export default JobsListing;
