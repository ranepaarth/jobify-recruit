"use client";

import { JobPost } from "@prisma/client";
import { BriefcaseBusiness, ExternalLink, Users2 } from "lucide-react";
import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { experience } from "./admin/admin-job-listing-form";
import JobSkills from "./job-skills";

type SingleJobCardProps = {
  job: JobPost;
};

const SingleJobCard = ({ job }: SingleJobCardProps) => {
  const jobExp = experience.filter((exp) => exp.value === job.experience)[0];
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigate = () => {
    router.replace(`/user/all-jobs/${job.id}`);
  };

  return (
    <Card className="shadow-md relative">
      <CardHeader>
        <CardTitle className="text-xl w-[70%]">{job.title}</CardTitle>
        <CardDescription>{job.companyName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <JobSkills jobSkills={job.skills} />
        <div className="flex gap-2 items-center text-sm text-neutral-600 mt-2">
          <span className="text-neutral-600">💸{job.salary}</span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium text-neutral-500/80">
            <BriefcaseBusiness className="w-4 h-4" />
            {jobExp.expInYear} Years
          </span>
          <span className="text-xs px-2 py-1 bg-blue-100 font-medium text-blue-600 rounded-sm w-fit absolute top-6 right-6">
            {job.type}
          </span>
        </div>
        {pathname.startsWith("/user") && (
          <Button
            className="flex items-center gap-4 bg-blue-900 mt-6 hover:bg-blue-950"
            onClick={handleNavigate}
          >
            Apply now <ExternalLink className="w-4 h-4" />
          </Button>
        )}
        {pathname.startsWith("/admin") && (
          <Button className="flex items-center gap-4 bg-blue-900 mt-6 hover:bg-blue-950">
            View Applicants <Users2 className="w-5 h-5" />
          </Button>
        )}
      </CardContent>
      <CardFooter>
        <span className="text-xs text-neutral-400 font-light">
          {moment(job.createdAt).fromNow()}
        </span>
      </CardFooter>
    </Card>
  );
};

export default SingleJobCard;
{
  /* <p className="text-neutral-600 font-medium line-clamp-2 mb-4">
          {job.jobDesc}
        </p> */
}
