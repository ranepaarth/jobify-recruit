import JobsListing from "@/components/protected/job-listing";
import React from "react";

const AllJobsPage = () => {
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
