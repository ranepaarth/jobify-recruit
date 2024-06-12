import React from "react";
import { CategoryListType } from "../../../../types";
import SingleCategory from "./single-category";

type CategoryListProps = {
  categories: CategoryListType;
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-10 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((category) => (
        <SingleCategory category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
