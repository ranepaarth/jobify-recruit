import { JobPost } from "@prisma/client";
import { InfoIcon } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import React from "react";
import RequiredJobExp from "../required-job-exp";

type AdminAboutJobProps = {
  job: JobPost;
};

const AdminAboutJob = ({ job }: AdminAboutJobProps) => {
  return (
    <div className="w-full max-w-screen-md mx-auto border-b-2 border-blue-800/60">
      <div className="w-full border shadow-sm rounded-lg p-4 text-neutral-800 flex items-start justify-between">
        <div className="flex-1">
          <h4 className="md:text-lg font-bold">{job.title}</h4>
          <p className="text-xs md:text-sm font-light text-neutral-600">
            {job.companyName}
          </p>
          <Link
            href={`/admin/jobs/details?id=${encodeURIComponent(job.id)}`}
            className="flex items-center text-blue-800 font-semibold mt-2 text-sm"
          >
            <InfoIcon className="w-3 h-3 mr-1" />
            <p className=" hover:underline">View Details</p>
          </Link>
        </div>
        <div className="flex flex-col text-neutral-600 flex-[0.6] items-end">
          <div className=" text-xs md:text-sm flex items-center">
            <span className="font-semibold hidden sm:block">💵 Pay:</span>
            <span className="text-blue-800 px-2 py-1 text-xs rounded-sm font-medium text-center">
              {job.salary}
            </span>
          </div>
          <div className=" text-xs md:text-sm  flex items-center">
            <span className="font-semibold hidden sm:block">💼 Job type:</span>
            <span className="text-blue-800 px-2 py-1 text-xs rounded-sm font-medium text-center">
              {job.type}
            </span>
          </div>
          <div className=" text-xs md:text-sm  flex items-center">
            <span className="font-semibold hidden sm:block">
              🌟 Experience:
            </span>
            <span className="text-blue-800 px-2 py-1 text-xs rounded-sm font-medium text-center">
              <RequiredJobExp experienceReq={job.experience} /> Years
            </span>
          </div>
        </div>
      </div>
      <p className="font-medium text-[10px] md:text-xs text-end p-4 text-neutral-400">
        <span>Posted on:</span> {moment(job.createdAt).format("Do MMMM, YYYY")}
      </p>
    </div>
  );
};

export default AdminAboutJob;
