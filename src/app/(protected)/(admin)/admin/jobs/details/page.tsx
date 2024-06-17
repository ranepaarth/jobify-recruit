import AboutJob from "@/components/protected/user/job-application/about-job";
import { prisma } from "@/lib/prisma";
import React from "react";

type AdminJobDetailsProps = {
  searchParams: {
    id: string;
  };
};

const AdminJobDetails = async ({ searchParams }: AdminJobDetailsProps) => {
  console.log(searchParams);
  const job = await prisma.jobPost.findUnique({
    where: {
      id: searchParams.id,
    },
  });

  if (!job) {
    return <p>The job you are looking for does not exist!</p>;
  }

  return <AboutJob job={job} />;
};

export default AdminJobDetails;
