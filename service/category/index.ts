"use server";

import { Query } from "@/types/shared";
import { createData, readData } from "../apiService/crud";

export type TCreateCategory = {
  name: string;
  description: string;
};

export type TCreateSubCategory = {
  name: string;
  description: string;
  categoryId: number;
};

export async function getAllCategories(query?: Query) {
  const res = await readData("/categories", ["Categories"], query);
  return res;
}

export const createCategories = async (data: TCreateCategory) => {
  const res = await createData(
    "/categories",
    "dashboard/admin/categories",
    data,
  );
  return res;
};

export const createSubCategories = async (data: TCreateSubCategory[]) => {
  const res = await createData(
    "/subcategories",
    "dashboard/admin/categories",
    data,
  );
  return res;
};

export async function getSubCategories(query?: Query) {
  const res = await readData("/subcategories", ["sub-categories"], query);
  return res;
}
