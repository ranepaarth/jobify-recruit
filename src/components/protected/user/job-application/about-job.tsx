"use client";

import { CardContent } from "@/components/ui/card";
import { JobPost } from "@prisma/client";
import React from "react";
import { experience } from "../../admin/admin-job-listing-form";
import JobSkills from "../../job-skills";
import DescriptionInfo from "./job-desc";
import { getRequiredJobExperience } from "@/lib/get-required-job-exp";

const AboutJob = ({ job }: { job: JobPost }) => {
  const jobExp = getRequiredJobExperience(job.experience);

  return (
    <div className="text-neutral-800 max-w-[500px] w-full">
      <CardContent>
        <h4 className="text-2xl font-semibold mb-1">{job.title}</h4>
        <p className="text-neutral-600 text-sm">{job.companyName}</p>
      </CardContent>
      <hr className="mb-4" />
      <CardContent className="space">
        <p className="font-semibold mb-2">Job details</p>
        <div className="flex items-start gap-6 mb-6">
          <span>💵</span>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Pay</span>
            <span className="text-xs font-medium tracking-wider text-blue-800 bg-blue-50 px-2 py-1 rounded-sm">
              {job.salary}
            </span>
          </div>
        </div>
        <div className="flex items-start gap-6">
          <span>💼</span>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Job type</span>
            <span className="text-xs font-medium tracking-wider text-blue-800 bg-blue-50 px-2 py-1 rounded-sm">
              {job.type}
            </span>
          </div>
        </div>
      </CardContent>
      <hr className="mb-4" />
      <CardContent className="space-y-6">
        <DescriptionInfo title="About us" desc={job.companyDesc} />
        <DescriptionInfo title="Job responsibility" desc={job.jobDesc} />

        <JobSkills jobSkills={job.skills} />
        <div className="flex gap-2">
          <span className="font-medium text-sm mb-1">Experience:</span>
          <p className="text-sm font-light">{jobExp.expInYear} Years</p>
        </div>
      </CardContent>
    </div>
  );
};

export default AboutJob;
