"use client";

import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Category } from "../../../../types";

const SingleCategory = ({ category }: { category: Category }) => {
  return (
    <Link
      className="p-2 px-4 border rounded shadow-sm text-sm md:text-base text-center flex items-center justify-between hover:bg-neutral-100 transition-colors duration-200 ease-in-out"
      href={`/admin/job-categories/${encodeURIComponent(category.name)}`}
    >
      {category.name} <PlusIcon className="w-4 h-4" />
    </Link>
  );
};

export default SingleCategory;
