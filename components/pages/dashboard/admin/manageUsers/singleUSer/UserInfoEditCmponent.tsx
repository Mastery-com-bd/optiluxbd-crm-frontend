/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IProfileInfo } from "@/types/user/userProfileType";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import {
  resetProfile,
  setname,
  setPhone,
  setStatus,
} from "@/redux/features/agent/agentProfileSlice";
import { ChevronDown } from "lucide-react";
import { TStatus } from "@/types/user/user.types";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import { currentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const UserInfoEditComponent = ({ userInfo }: { userInfo: IProfileInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IProfileInfo | null>(userInfo);
  const [first, ...rest] = (formData?.name || "").trim().split(" ");
  const last = rest.join(" ");
  const dispatch = useAppDispatch();
  const [updateInfo] = useUpdateUserInfoMutation();

  const handleCancel = () => {
    setFormData(userInfo);
    setIsEditing(false);
    dispatch(resetProfile());
  };

  const handleSave = async () => {
    setLoading(true);
    const data = {
      id: userInfo?.id,
      currentUser,
    };
    try {
      const res = await updateInfo(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        dispatch(resetProfile());
        setIsEditing(false);
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

  return (
    <section>
      {!isEditing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 relative">
          <Button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
          >
            Edit
          </Button>

          {/* Static info */}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              First Name
            </p>
            <p className="font-medium">{userInfo?.name?.split(" ")[0]}</p>
          </div>
          {userInfo?.name?.split(" ")[1] && (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last Name
              </p>
              <p className="font-medium">{userInfo?.name?.split(" ")[1]}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p className="font-medium">{userInfo?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
            <p className="font-medium">{userInfo?.phone}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
            <p className="font-medium">{userInfo?.is_active ? "Yes" : "No"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">UserID</p>
            <p className="font-medium">{userInfo?.userId ?? "no id"}</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0.6, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300"
        >
          {/* Editable inputs */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">
              First Name
            </label>
            <input
              name="firstName"
              value={first}
              onChange={(e) => {
                const newFirst = e.target.value;
                const newName = `${newFirst} ${last}`.trim();
                setFormData((prev) => ({
                  ...prev!,
                  name: newName,
                }));
                dispatch(setname(newName));
              }}
              placeholder="First Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">
              Last Name
            </label>
            <input
              name="lastName"
              value={last}
              onChange={(e) => {
                const newLast = e.target.value;
                const newName = `${first} ${newLast}`.trim();
                setFormData((prev) => ({
                  ...prev!,
                  name: newName,
                }));
                dispatch(setname(newName));
              }}
              placeholder="Last Name"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">
              Phone Number
            </label>
            <input
              name="phone"
              value={formData?.phone ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({
                  ...prev!,
                  phone: value,
                }));
                dispatch(setPhone(value));
              }}
              placeholder="Phone"
              className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Status</label>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between border rounded-lg text-gray-700 dark:text-gray-100 dark:border-gray-600 dark:bg-gray-700"
                >
                  {formData?.status || "select status"}
                  <ChevronDown className="w-4 h-4 opacity-70" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full">
                <DropdownMenuRadioGroup
                  value={formData?.status}
                  onValueChange={(value) => setStatus(value as TStatus)}
                >
                  {["ACTIVE", "INACTIVE", "SUSPENDED", "DISABLED"].map(
                    (item) => (
                      <DropdownMenuRadioItem key={item} value={item}>
                        {item}
                      </DropdownMenuRadioItem>
                    )
                  )}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 dark:text-gray-200">Activity</label>

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
                  onValueChange={(value) => setStatus(value as TStatus)}
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

          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
            <Button
              disabled={loading}
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
            >
              {loading ? "Saving" : "Save Change"}
            </Button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default UserInfoEditComponent;
