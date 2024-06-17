import AdminAboutJob from "@/components/protected/admin/admin-about-job";
import AdminJobApplicationsList from "@/components/protected/admin/admin-job-applications-list";
import { prisma } from "@/lib/prisma";
import React from "react";
type JobApplicantsPageProps = {
  searchParams: {
    jobId: string;
  };
};

const JobApplicantsPage = async ({ searchParams }: JobApplicantsPageProps) => {
  console.log(searchParams);

  const jobApplications = await prisma.jobPostUser.findMany({
    where: {
      jobPostId: searchParams.jobId,
    },
    include: {
      user: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const job =
    searchParams.jobId &&
    (await prisma.jobPost.findUnique({
      where: {
        id: searchParams.jobId,
      },
    }));

  if (!job) {
    return <div>The job you are looking for does&apos;nt exist</div>;
  }

  return (
    <div className="w-full">
      <AdminAboutJob job={job} />
      <AdminJobApplicationsList applications={jobApplications} />
    </div>
  );
};

export default JobApplicantsPage;
