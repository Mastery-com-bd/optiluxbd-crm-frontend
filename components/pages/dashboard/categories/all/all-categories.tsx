/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import AddCategory from "./addCategory";
import PageHeader from "../../shared/pageHeader";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TCategories } from "@/types/category.type";
import ActiveIcon from "@/components/svgIcon/ActiveIcon";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import AddSubCategory from "./AddSubCategory";
import { toast } from "sonner";
import {
  deleteCategory,
  deleteCategoryImage,
  deleteSubCategory,
  deleteSubCategoryImage,
  uploadCategoryImage,
  uploadSubCategoryImage,
} from "@/service/category";
import Link from "next/link";
import CategoryDropdown from "../CategoryDropdown";
import UpdateCategory from "./UpdateCategory";

type TCategoryPageProps = {
  categories: TCategories[];
};

export type THandleConfirm = {
  setLoading: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
};

const AllCategories = ({ categories }: TCategoryPageProps) => {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<TCategories>(categories[0]);

  const handleDeleteCategory = async ({
    setLoading,
    setOpen,
    id,
  }: THandleConfirm) => {
    setLoading(true);
    const toastId = toast.loading("Processing...");
    try {
      const result = await deleteCategory(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
    }
  };

  const handleDeleteSubCategory = async ({
    setLoading,
    setOpen,
    id,
  }: THandleConfirm) => {
    setLoading(true);
    const toastId = toast.loading("Processing...");
    try {
      const result = await deleteSubCategory(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
    }
  };

  const handleSetCategoryImage = async ({
    image,
    id,
    setLoading,
    setOpen,
  }: {
    image: File;
    id: number;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const formData = new FormData();
    formData.append("category_image", image);
    const toastId = toast.loading("image uploading");
    setLoading(true);
    try {
      const result = await uploadCategoryImage(formData, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setLoading(false);
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  const handleSetSubCategoryImage = async ({
    image,
    id,
    setLoading,
    setOpen,
  }: {
    image: File;
    id: number;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
  }) => {
    const formData = new FormData();
    formData.append("subcategory_image", image);
    const toastId = toast.loading("image uploading");
    setLoading(true);
    try {
      const result = await uploadSubCategoryImage(formData, id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setLoading(false);
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  const handleDeleteCategoryImage = async ({
    setLoading,
    setOpen,
    id,
  }: THandleConfirm) => {
    setLoading(true);
    const toastId = toast.loading("Deleting Category Image...");
    try {
      const result = await deleteCategoryImage(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
    }
  };

  const handleDeleteSubCategoryImage = async ({
    setLoading,
    setOpen,
    id,
  }: THandleConfirm) => {
    setLoading(true);
    const toastId = toast.loading("Deleting SubCategory Image...");
    try {
      const result = await deleteSubCategoryImage(id);
      if (result?.success) {
        toast.success(result?.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
        setLoading(false);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <PageHeader
            title="All Category"
            description="Browse and manage All Category"
          />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddCategory />
        </div>
      </div>

      <div className="relative flex items-center justify-start">
        <Input
          icon={<Search />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in category"
        />
      </div>

      {!categories.length ? (
        <Card className="effect">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              No Category available right now
            </CardTitle>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="col-span-3 space-y-3">
            <h1 className="text-[28px] font-semibold">Categories</h1>
            <div className="space-y-3">
              {categories.map((p) => {
                const active = current?.id === p?.id;
                return (
                  <div
                    key={p?.id}
                    onClick={() => setCurrent(p)}
                    className="w-[260px] relative effect hover:scale-[1.02] transition-transform flex items-center gap-6 rounded-xl p-4 text-left overflow-hidden group cursor-pointer effect"
                  >
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 duration-500"
                    >
                      <CategoryDropdown
                        title="Want to Delete This Category?"
                        description="If you delete this category, the sub category of this category will also be deleted. The product with this category will be uncategorized. This action can`t be undone"
                        id={p?.id}
                        onConfirm={handleDeleteCategory}
                        buttonName="Delete Category"
                        secondButtonName="Delete Image"
                        handleSubmit={handleSetCategoryImage}
                        onDeleteConfirm={handleDeleteCategoryImage}
                        imageTitle="Want to delete this category image?"
                        imageDescription="If you delete the image from this category it will be deleted permanently and can`t be undone"
                        imageUrl={p?.image_url as string}
                      >
                        <UpdateCategory
                          title="Update Category"
                          slug="category"
                          data={p}
                          id={p?.id}
                        />
                      </CategoryDropdown>
                    </div>
                    {active && <ActiveIcon />}
                    <div className="flex items-center justify-center rounded-[12px] overflow-hidden bg-transparent!">
                      <Image
                        src={
                          p?.image_url ||
                          "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                        }
                        alt={p?.name}
                        height={100}
                        width={100}
                        className=" w-24 h-24 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Content */}
          <section className="col-span-9 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-[28px] font-semibold ">Sub Categories</h2>
              <AddSubCategory id={current?.id} />
            </div>
            {current?.subCategories.length ? (
              <div className="grid grid-cols-3 gap-5">
                {current?.subCategories.map((c) => (
                  <div key={c.id} className="relative group">
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity z-30 duration-500"
                    >
                      <CategoryDropdown
                        title="Want to Delete This  Sub-Category?"
                        description="If you delete this sub-category, the product with this sub-category will be uncategorized. This action can`t be undone"
                        id={c?.id}
                        onConfirm={handleDeleteSubCategory}
                        handleSubmit={handleSetSubCategoryImage}
                        buttonName="Delete Sub Category"
                        secondButtonName="Delete Image"
                        onDeleteConfirm={handleDeleteSubCategoryImage}
                        imageTitle="Want to delete this category image?"
                        imageDescription="If you delete the image from this category it will be deleted permanently and can`t be undone"
                        imageUrl={c?.image_url as string}
                      >
                        <UpdateCategory
                          title="Update Sub Category"
                          slug="subCategory"
                          data={c}
                          id={c?.id}
                        />
                      </CategoryDropdown>
                    </div>
                    <Link href="/dashboard">
                      <div className="max-w-[265px] p-5 cursor-pointer hover:scale-[1.02] transition-transform effect rounded-[12px] ">
                        <div className="flex items-center justify-center py-2 effect rounded-[12px] overflow-hidden bg-transparent!">
                          <Image
                            src={
                              c?.image_url ||
                              "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                            }
                            alt={c?.name}
                            width={200}
                            height={200}
                            className=" w-24 h-24 object-contain"
                          />
                        </div>
                        <h3 className="text-white font-semibold text-center mt-4">
                          {c?.name}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <Card className="effect">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    No Sub categories for this category
                  </CardTitle>
                </CardHeader>
              </Card>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default AllCategories;
