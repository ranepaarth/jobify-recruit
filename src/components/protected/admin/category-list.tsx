import React from "react";
import { CategoryListType } from "../../../../types";
import SingleCategory from "./single-category";

type CategoryListProps = {
  categories: CategoryListType;
};

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div className="flex items-center flex-wrap gap-4 mt-4 border-t pt-4">
      {categories.map((category) => (
        <SingleCategory category={category} key={category.id} />
      ))}
    </div>
  );
};

export default CategoryList;
