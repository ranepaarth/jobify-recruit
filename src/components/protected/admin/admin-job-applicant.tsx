"use client";

import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { applicationStatus } from "../single-job-card";
import { Application } from "./admin-job-applications-list";
import JobApplicantEditBtn from "./job-applicant-edit-btn";

const className = {
  Applied: "text-blue-500 sm:text-neutral-800",
  Accepted: "text-emerald-500 sm:text-neutral-800",
  Rejected: "text-red-500 sm:text-neutral-800",
};

const AdminJobApplicant = ({ application }: { application: Application }) => {
  return (
    <TableRow
      className={`hover:bg-neutral-50 ${
        className[application.applicationStatus]
      }`}
    >
      <TableCell className="flex items-start gap-2 cursor-pointer">
        <Image
          src={`https://api.dicebear.com/8.x/open-peeps/png?seed=${application.user.email}`}
          alt=""
          width={480}
          height={480}
          className="w-10 rounded-full border border-neutral-600 p-0.5"
        />
        <div className="flex flex-col">
          {application.user.name}
          <div className="text-sm text-muted-foreground md:inline">
            {application.user.email}
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge
          className={`${
            applicationStatus[application.applicationStatus].className
          }`}
          variant={"default"}
        >
          {application.applicationStatus}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell text-xs font-medium text-neutral-600">
        {moment(application.dateApplied).format("Do MMMM,YYYY")}
      </TableCell>
      <TableCell className="text-right">
        <Link
          href={application.user.resumeUrl!}
          target="_blank"
          className="flex justify-end hover:underline text-neutral-800"
        >
          View <ExternalLink className="ml-2 w-4 h-4" />
        </Link>
      </TableCell>
      <TableCell className="text-right">
        <JobApplicantEditBtn application={application} />
      </TableCell>
    </TableRow>
  );
};

export default AdminJobApplicant;
