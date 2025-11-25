/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IAddress } from "@/types/address.types";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  currentAddress,
  resetAddress,
  setCity,
  setDivission,
  setPost,
  setStreet,
  setThana,
} from "@/redux/features/address/addressSlice";
import {
  useDeleteAddressMutation,
  useUpdateAddressMutation,
} from "@/redux/features/address/addressApi";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { bangladeshData } from "@/constants/DivisionDataset";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const EditAddressComponent = ({ address }: { address: IAddress }) => {
  // local state
  const [formData, setFormData] = useState<IAddress | null>(address);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [districts, setDistricts] = useState<
    { city: string; thanas: string[] }[]
  >([]);
  const [thanas, setThanas] = useState<string[]>([]);
  // redux state
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const dispatch = useAppDispatch();
  const currentAddressInfo = useAppSelector(currentAddress);
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddreess] = useDeleteAddressMutation();

  useEffect(() => {
    if (!editing || !formData) return;

    Promise.resolve().then(() => {
      const divisionData = bangladeshData.find(
        (d) => d.division === formData.division
      );
      const districts = divisionData?.districts || [];
      const districtData = districts.find((d) => d.city === formData.city);
      const thanas = districtData?.thanas || [];

      setDistricts(districts);
      setThanas(thanas);
    });
  }, [editing, formData]);

  const handleDivisionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev!,
      division: value,
      city: "",
      thana: "",
    }));
    dispatch(setDivission(value));

    const divisionData = bangladeshData.find((d) => d.division === value);
    setDistricts(divisionData?.districts || []);
    setThanas([]);
  };

  // Handle city change
  const handleCityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev!,
      city: value,
      thana: "",
    }));
    dispatch(setCity(value));

    const cityData = districts.find((d) => d.city === value);
    setThanas(cityData?.thanas || []);
  };

  // Handle thana change
  const handleThanaChange = (value: string) => {
    setFormData((prev) => ({
      ...prev!,
      thana: value,
    }));
    dispatch(setThana(value));
  };

  const handleCancel = () => {
    setFormData(address);
    setEditing(false);
    dispatch(resetAddress());
  };

  const handleSave = async () => {
    setLoading(true);
    const data = {
      id: address?.id,
      currentAddressInfo,
    };
    try {
      const res = await updateAddress(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        dispatch(resetAddress());
        setEditing(false);
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
      setLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    const toastId = toast.loading("address deletion", { duration: 3000 });
    try {
      const res = await deleteAddreess(address?.id).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setOpenDeleteModal(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <div>
      {!editing ? (
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
                <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setEditing(true)}>
                Edit Address
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => setOpenDeleteModal(true)}
              >
                Delete Address
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openDeleteModal} onOpenChange={setOpenDeleteModal}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  address.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setOpenDeleteModal(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteAddress}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Division
              </p>
              <p className="font-semibold">
                {address.division || "No division"}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">City</p>
              <p className="font-semibold">{address.city || "No city"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Thana</p>
              <p className="font-semibold">{address.thana || "No thana"}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Post</p>
              <p className="font-semibold">{address.post || "No post"}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-gray-500 dark:text-gray-400">Street</p>
              <p className="font-semibold">{address.street || "No street"}</p>
            </div>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0.6, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300"
        >
          {/* Division Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Division</label>
            <Select
              onValueChange={handleDivisionChange}
              value={formData?.division}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Division" />
              </SelectTrigger>
              <SelectContent>
                {bangladeshData.map((d) => (
                  <SelectItem key={d.division} value={d.division}>
                    {d.division}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">City</label>
            <Select onValueChange={handleCityChange} value={formData?.city}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.city} value={d.city}>
                    {d.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thana Dropdown */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Thana</label>
            <Select onValueChange={handleThanaChange} value={formData?.thana}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Thana" />
              </SelectTrigger>
              <SelectContent>
                {thanas.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Post */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Post</label>
            <input
              value={formData?.post || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev!, post: value }));
                dispatch(setPost(value));
              }}
              placeholder="Post"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
            />
          </div>

          {/* Street */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Street</label>
            <input
              value={formData?.street || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev!, street: value }));
                dispatch(setStreet(value));
              }}
              placeholder="Street"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="sm:col-span-2 flex justify-end gap-3">
            <button
              disabled={loading}
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
            >
              {loading ? "Saving..." : "Save Change"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EditAddressComponent;
