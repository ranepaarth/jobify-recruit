import SingleJobCard from "@/components/protected/single-job-card";
import { prisma } from "@/lib/prisma";
import React from "react";

const JobsListing = async () => {
  const jobs = await prisma.jobPost.findMany();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3">
      {jobs.map((job) => (
        <SingleJobCard job={job} key={job.id} />
      ))}
    </div>
  );
};

export default JobsListing;
