"use client";

import { JobPost } from "@prisma/client";
import { BriefcaseBusiness, Users2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
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

const applicationStatus = {
  Applied: {
    className: "bg-blue-50 text-blue-900",
    label: "Applied",
  },
  Accepted: {
    className: "bg-emerald-50 text-emerald-600",
    label: "Viewed",
  },
  Rejected: {
    className: "bg-red-50 text-red-500",
    label: "Not Selected",
  },
};

type SingleJobCardProps = {
  job: JobPost;
  userId: string;
  hasApplied?: "Applied" | "Accepted" | "Rejected";
};

const SingleJobCard = ({ job, hasApplied }: SingleJobCardProps) => {
  const jobExp = experience.filter((exp) => exp.value === job.experience)[0];
  const pathname = usePathname();

  const router = useRouter();
  const handleClick = () => {
    if (pathname.startsWith("/user"))
      router.push(`/user/all-jobs?jobId=${job.id}`);
    if (pathname.startsWith("/admin")) return;
  };

  return (
    <Card
      className="shadow-md relative cursor-pointer hover:border-blue-900"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-lg w-[70%] flex flex-col gap-1">
          {hasApplied && (
            <span
              className={`${applicationStatus[hasApplied].className} font-bold px-2 py-1 text-xs w-fit rounded tracking-normal`}
            >
              {applicationStatus[hasApplied].label}
            </span>
          )}
          <Link
            className="px-0 text-lg font-semibold text-start hover:underline"
            href={`/user/all-jobs?jobId=${job.id}`}
          >
            {job.title}
          </Link>
        </CardTitle>
        <CardDescription>{job.companyName}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex gap-2 items-center text-sm text-neutral-600 mt-2">
          <span className="text-neutral-600">💸{job.salary}</span>
          <span>•</span>
          <span className="flex items-center gap-1 font-medium text-neutral-500/80">
            <BriefcaseBusiness className="w-4 h-4" />
            {jobExp.expInYear} Years
          </span>
          <span className="text-[10px] px-2 py-0.5 bg-blue-100 font-medium text-blue-600 rounded-sm w-fit absolute top-6 right-6">
            {job.type}
          </span>
        </div>
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
