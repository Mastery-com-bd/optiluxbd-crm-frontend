/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  currentuserInfo,
  resetProfile,
  setname,
  setPhone,
} from "@/redux/features/agent/agentProfileSlice";
import { useUpdateUserInfoMutation } from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { IProfileInfo } from "@/types/user/userProfileType";

const EditInfoComponent = ({ userInfo }: { userInfo: IProfileInfo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IProfileInfo | null>(userInfo);
  const [first, ...rest] = (formData?.name || "").trim().split(" ");
  const last = rest.join(" ");
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(currentuserInfo);
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
          <button
            onClick={() => setIsEditing(true)}
            className="absolute top-0 right-0 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
          >
            Edit
          </button>

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

          <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
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
              {loading ? "Saving" : "Save Change"}
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default EditInfoComponent;
