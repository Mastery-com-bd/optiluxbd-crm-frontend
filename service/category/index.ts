/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Query } from "@/types/shared";
import { createData, deleteData, readData } from "../apiService/crud";
import { config } from "@/config";
import { getValidToken } from "../authService/validToken";
import { revalidatePath } from "next/cache";
import { TData } from "@/components/pages/dashboard/categories/all/UpdateCategory";

export type TCreateCategory = {
  name: string;
  description: string;
};

export type TCreateSubCategory = {
  name: string;
  description: string;
  categoryId: number;
};

export const getAllCategories = async (query?: Query) => {
  const res = await readData("/categories", ["Categories"], query);
  return res;
};

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

export const getSubCategories = async (query?: Query) => {
  const res = await readData("/subcategories", ["sub-categories"], query);
  return res;
};

export const deleteCategory = async (id: number) => {
  const res = await deleteData(
    `/categories/${id}`,
    "/dashboard/admin/categories",
  );
  return res;
};

export const deleteSubCategory = async (id: number) => {
  const res = await deleteData(
    `/subcategories/${id}`,
    "/dashboard/admin/categories",
  );
  return res;
};

export const getCategoryById = async (id: number) => {
  const res = await readData(`/categories/${id}`, ["Categories"]);
  return res;
};

export const getSubCategoryById = async (id: number) => {
  const res = await readData(`/subcategories/${id}`, ["sub-categories"]);
  return res;
};

export const uploadCategoryImage = async (data: FormData, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api as string}/images/categories/${id}/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/admin/categories");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const uploadSubCategoryImage = async (data: FormData, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api as string}/images/subcategories/${id}/image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/admin/categories");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteCategoryImage = async (id: number) => {
  const res = await deleteData(
    `/images/categories/${id}/image`,
    "/dashboard/admin/categories",
  );
  return res;
};

export const deleteSubCategoryImage = async (id: number) => {
  const res = await deleteData(
    `/images/subcategories/${id}/image`,
    "/dashboard/admin/categories",
  );
  return res;
};

export const updateCategory = async (data: Partial<TData>, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api as string}/categories/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/admin/categories");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateSubCategory = async (data: Partial<TData>, id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api as string}/categories/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/admin/categories");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
