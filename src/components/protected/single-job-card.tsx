"use client";

import { JobPost } from "@prisma/client";
import { BriefcaseBusiness, ExternalLink, Users2 } from "lucide-react";
import moment from "moment";
import { usePathname } from "next/navigation";
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

type SingleJobCardProps = {
  job: JobPost;
};

const SingleJobCard = ({ job }: SingleJobCardProps) => {
  const jobExp = experience.filter((exp) => exp.value === job.experience)[0];
  const pathname = usePathname();
  const skills = job.skills.split(",").filter((skill) => skill.trim().length > 0);

  console.log(skills)
  return (
    <Card className="shadow-md relative">
      <CardHeader>
        <CardTitle className="text-xl w-[70%]">{job.title}</CardTitle>
        <CardDescription>{job.companyName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-neutral-600 font-medium line-clamp-2 mb-4">
          {job.jobDesc}
        </p>
        <div className="my-4 flex flex-col gap-2">
          <span className="font-medium text-sm">Skills Required:</span>
          <div className="space-x-2">
            {skills.map(
              (skill, index) =>
                skill.length > 0 && (
                  <span
                    key={index}
                    className="text-sm px-2 py-2 border shadow-sm rounded-sm bg-blue-50 text-blue-700"
                  >
                    {skill.trim()}
                  </span>
                )
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center text-sm text-neutral-600">
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
        {!pathname.startsWith("/admin") && (
          <Button className="flex items-center gap-4 bg-blue-900 mt-6 hover:bg-blue-950">
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
