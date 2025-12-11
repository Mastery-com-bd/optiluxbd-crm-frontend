/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  useDeleteComboPackageMutation,
  useGetASingleCOmboPackageQuery,
  useUpdateComboPackageMutation,
} from "@/redux/features/combo/comboApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package, Calendar, DollarSign, ChevronDown } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";
import DeleteUSerModal from "../../admin/manageUsers/singleUSer/DeleteUSerModal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import GetSingleComboSkeleton from "./GetSingleComboSkeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { TCombo } from "@/types/comboPackage";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentCombo,
  resetCombo,
  setDescription,
  setDiscountPrice,
  setFeatured,
  setname,
  setSku,
  setTags,
} from "@/redux/features/combo/comboSlice";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ComboProductstable from "./ComboProductstable";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
import { getPermissions } from "@/utills/getPermissionAndRole";
import ComboDetails from "./ComboDetails";

const GetASingleCombo = ({ id }: { id: string }) => {
  // get a single combo
  const { data, isLoading: loading } = useGetASingleCOmboPackageQuery(id);
  const ComboPackage = data?.data as TCombo;
  // redux state
  const [updatePackage] = useUpdateComboPackageMutation();
  const [deletePackage] = useDeleteComboPackageMutation();
  const currentComboPackage = useAppSelector(currentCombo);
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const { permissions } = getPermissions(user as TAuthUSer);
  // local state
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<TCombo | null>(null);
  const [tagInput, setTagInput] = useState(formData?.tags.join(", ") || "");

  useEffect(() => {
    if (formData?.tags?.length) {
      Promise.resolve().then(() => {
        setTagInput(formData.tags.join(", "));
      });
    }
  }, [formData?.tags]);

  useEffect(() => {
    if (ComboPackage) {
      Promise.resolve().then(() => {
        setFormData(ComboPackage);
      });
    }
  }, [ComboPackage]);

  const handleConfirm = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    try {
      const res = await deletePackage(id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    dispatch(resetCombo());
    setFormData(ComboPackage);
  };

  const handleSave = async () => {
    setIsLoading(true);
    const data = {
      id: ComboPackage?.id,
      currentComboPackage,
    };
    try {
      const res = await updatePackage(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        dispatch(resetCombo());
        setOpen(false);
        setIsLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setIsLoading(false);
    }
  };

  if (loading) {
    return <GetSingleComboSkeleton />;
  }

  return (
    <section className=" bg-transparent text-foreground space-y-4 w-full px-4">
      {/* <div className="max-w-6xl mx-auto p-6 space-y-6">
        {!open ? (
          <Card className="shadow-sm border dark:border-gray-700">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-xl font-semibold flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  {ComboPackage?.name}
                </CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {ComboPackage?.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {ComboPackage?.tags?.map((tag: string, i: number) => (
                  <Badge key={i} variant="secondary" className="capitalize">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">SKU</p>
                <p className="font-medium">{ComboPackage?.sku}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created At
                </p>
                <p className="font-medium flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {
                    convertDate(new Date(ComboPackage?.created_at)).creationTime
                  }{" "}
                  {convertDate(new Date(ComboPackage?.created_at)).creationDate}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Price
                </p>
                <p className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {parseFloat(ComboPackage?.packagePrice).toLocaleString()} ৳
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Discounted Price
                </p>
                <p className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {ComboPackage?.discountPrice} ৳
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Savings
                </p>
                <p className="font-semibold text-amber-600 dark:text-amber-400">
                  {ComboPackage?.savingsPercent}% (
                  {parseFloat(ComboPackage?.savingsAmount).toLocaleString()} ৳)
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Status
                </p>
                <Badge
                  variant={ComboPackage?.is_active ? "default" : "destructive"}
                  className="uppercase"
                >
                  {ComboPackage?.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardContent>
            {permissions.includes("PACKAGES UPDATE") && (
              <CardContent className="flex justify-end items-center">
                <Button
                  onClick={() => setOpen(true)}
                  className=" px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
                >
                  Edit Info
                </Button>
              </CardContent>
            )}
          </Card>
        ) : (
          <Card className="shadow-sm border dark:border-gray-700 w-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Edit Combo Package
              </CardTitle>
            </CardHeader>

            <CardContent className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Package Name
                </Label>
                <Input
                  id="name"
                  value={formData?.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!formData) return;
                    setFormData((prev) => ({
                      ...prev!,
                      name: value,
                    }));
                    dispatch(setname(value));
                  }}
                  placeholder="Enter combo name"
                  className="dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  SKU Number
                </Label>
                <Input
                  id="sku"
                  value={formData?.sku?.replace(/^PKG-/, "") || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!formData) return;
                    setFormData((prev) => ({
                      ...prev!,
                      sku: value,
                    }));
                    dispatch(setSku(value));
                  }}
                  placeholder="Enter combo name"
                  className="dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discountPrice" className="text-sm font-medium">
                  Discount Price
                </Label>
                <Input
                  id="discountPrice"
                  type="number"
                  value={formData?.discountPrice}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (!formData) return;
                    setFormData((prev) => ({
                      ...prev!,
                      discountPrice: value,
                    }));
                    dispatch(setDiscountPrice(value));
                  }}
                  placeholder="Enter discount price"
                  className="dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData?.description}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (!formData) return;
                    setFormData((prev) => ({
                      ...prev!,
                      description: value,
                    }));
                    dispatch(setDescription(value));
                  }}
                  placeholder="Enter package description"
                  className="min-h-[100px] dark:bg-gray-800 dark:text-gray-100"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-gray-700 dark:text-gray-200">
                  Activity
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border rounded-lg text-gray-700 dark:text-gray-100 dark:border-gray-600 dark:bg-gray-700"
                    >
                      {formData?.is_active ? "Yes" : "No"}
                      <ChevronDown className="w-4 h-4 opacity-70" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuRadioGroup
                      value={formData?.is_active ? "Yes" : "No"}
                      onValueChange={(value) => {
                        const activity = value === "Yes";
                        if (!formData) return;
                        setFormData((prev) => ({
                          ...prev!,
                          is_active: activity,
                        }));
                        dispatch(setFeatured(activity));
                      }}
                    >
                      {["Yes", "No"].map((item) => (
                        <DropdownMenuRadioItem key={item} value={item}>
                          {item}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tags" className="text-sm font-medium">
                  Tags
                </Label>
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onBlur={() => {
                    const updatedTags = tagInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                    if (!formData) return;
                    setFormData((prev) => ({
                      ...prev!,
                      tags: updatedTags,
                    }));

                    dispatch(setTags(updatedTags));
                  }}
                  placeholder="Enter tags separated by commas (e.g. office, starter, 10%-off)"
                  className="dark:bg-gray-800 dark:text-gray-100"
                />
              </div>
            </CardContent>
            <CardContent className="flex justify-end items-center gap-4 border-t dark:border-gray-700 pt-4">
              <Button
                disabled={isLoading}
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardContent>
          </Card>
        )}
        <Separator />
        <ComboProductstable ComboPackage={ComboPackage} />
        {permissions.includes("PACKAGES DELETE") && (
          <div className="flex items-center justify-end">
            <DeleteUSerModal
              handleConfirm={handleConfirm}
              id={ComboPackage?.id}
              className="bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 cursor-pointer"
              buttonClass="text-red-600 dark:text-red-300"
              level=" Delete Combo Package?"
              content="This action cannot be undone. It will permanently remove the combo and its details from the system."
              buttonName="Delete"
            />
          </div>
        )}
      </div> */}

      <ComboDetails />
    </section>
  );
};

export default GetASingleCombo;
