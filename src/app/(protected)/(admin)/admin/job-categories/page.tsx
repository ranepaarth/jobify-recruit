import CategoryList from "@/components/protected/admin/category-list";
import CreateCategoryForm from "@/components/protected/admin/create-category-form";
import { prisma } from "@/lib/prisma";
import React from "react";

const JobCategories = async () => {
  const categories = await prisma.jobCategory.findMany()
  return (
    <div className="w-full flex flex-col gap-6 text-neutral-800">
      <h3 className="text-3xl font-semibold text-start w-full flex items-baseline">
        🏷️ Job Categories
      </h3>
      <div className="font-semibold sm:text-lg text-neutral-600 flex flex-col space-y-2">
        Select a category to create a new Job Post
        <span className="w-2/5 max-w-[250px] flex items-center gap-2 text-xs text-neutral-400 font-normal">
          <hr className="border-b border-neutral-300 flex-1" />
          OR
          <hr className="border-b border-neutral-300 flex-1" />
        </span>
        <div>
          <CreateCategoryForm />
        </div>
        <div>
          <CategoryList categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default JobCategories;
