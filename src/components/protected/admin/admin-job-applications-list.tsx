import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { JobPostUser, User } from "@prisma/client";
import React from "react";
import { applicationStatus } from "../single-job-card";
import AdminJobApplicant from "./admin-job-applicant";

export type Application = { user: User } & JobPostUser;

type AdminJobApplicantsProps = {
  applications: Application[];
};

const AdminJobApplicationsList = ({
  applications,
}: AdminJobApplicantsProps) => {
  return (
    <div className="flex flex-col gap-4 max-w-screen-md mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Applicant</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Applied on</TableHead>
            <TableHead className="text-right">Resume</TableHead>
            <TableHead className="text-right">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((application) => (
            <AdminJobApplicant application={application} key={application.id} />
          ))}
        </TableBody>
      </Table>
      <div className="w-full mx-auto flex justify-center my-10 text-xl font-bold text-neutral-800">
        {applications.length <= 0 && (
          <p>Currently, there are no applicants for this job!</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobApplicationsList;
