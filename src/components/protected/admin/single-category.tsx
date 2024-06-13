"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Category } from "../../../../types";

const SingleCategory = ({ category }: { category: Category }) => {
  return (
    <Link
      className="p-2 px-4 border border-blue-900 text-blue-900 hover:bg-blue-50 rounded shadow-sm text-sm md:text-base text-center flex items-center justify-between transition-colors duration-200 ease-in-out"
      href={`/admin/job-categories/${encodeURIComponent(category.name)}`}
    >
      {category.name} <PlusIcon className="ml-2 w-4 h-4" />
    </Link>
  );
};

export default SingleCategory;
