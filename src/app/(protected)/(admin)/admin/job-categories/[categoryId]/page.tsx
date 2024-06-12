import AdminJobListingForm from "@/components/protected/admin/admin-job-listing-form";
import { prisma } from "@/lib/prisma";
import React from "react";
import { Category } from "../../../../../../../types";

type CreateJobProps = {
  params: {
    categoryId: string;
  };
};

const CreateJob = async ({ params }: CreateJobProps) => {
  const category = (await prisma.jobCategory.findFirst({
    where: {
      name: decodeURIComponent(params.categoryId),
    },
  })) as Category;
  return <AdminJobListingForm category={category} />;
};

export default CreateJob;
