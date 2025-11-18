/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteUserMutation,
  useGetASingleUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { motion } from "framer-motion";
import { Calendar, ChevronDown, Clock, UserCheck } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  resetProfile,
  setname,
  setPhone,
  setStatus,
} from "@/redux/features/agent/agentProfileSlice";
import { toast } from "sonner";
import DeleteUSerModal from "./DeleteUSerModal";
import ProfileLoader from "../../../profile/ProfileLoader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TStatus } from "@/types/user/user.types";
import { IProfileInfo } from "../../../profile/Profile";
import ProfileImage from "../../../profile/ProfileImage";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";

const UserProfile = ({ id }: { id: string }) => {
  // get user information
  const { data, isLoading } = useGetASingleUserQuery(id, {
    refetchOnMountOrArgChange: false,
  });
  const userInfo = data?.data;
  // local state
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IProfileInfo | null>(null);
  // redux state
  const [updateInfo] = useUpdateUserInfoMutation();
  const [deleteUser] = useDeleteUserMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(currentUser);
  const { role, permissions } = getPermissions(user as TAuthUSer);

  useEffect(() => {
    if (userInfo) {
      Promise.resolve().then(() => {
        setFormData(userInfo);
      });
    }
  }, [userInfo]);

  const [first, ...rest] = (formData?.name || "").trim().split(" ");
  const last = rest.join(" ");

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

  const handleConfirm = async (
    setLoading: Dispatch<SetStateAction<boolean>>,
    id: number
  ) => {
    try {
      const res = await deleteUser(id).unwrap();
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

  if (isLoading) {
    return <ProfileLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex flex-col items-center space-y-10">
      <div className="w-full lg:w-[60vw] bg-white dark:bg-gray-800 rounded-2xl shadow p-8">
        <div className="space-y-6">
          {/* Profile Header Section */}
          <section className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600 space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ProfileImage
                profileImage={userInfo?.avatar_secure_url}
                id={userInfo?.id}
              />
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-black dark:text-gray-100">
                  {userInfo?.name}
                </h4>

                {/* Account Activity */}
                <div className="flex items-center gap-2 text-sm">
                  <UserCheck
                    size={16}
                    className={
                      userInfo?.is_active ? "text-green-500" : "text-gray-400"
                    }
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Account Status:{" "}
                    <span
                      className={`font-medium ${
                        userInfo?.is_active
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {userInfo?.is_active ? "Active" : "Inactive"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar size={15} className="text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Joined:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {convertDate(new Date(userInfo?.created_at)).creationDate}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} className="text-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">
                    Last Login:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {userInfo?.last_login
                        ? new Date(userInfo?.last_login).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Not yet"}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Profile Details Section */}
          <section>
            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300 relative">
                {permissions.includes("USERS UPDATE") && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="absolute top-0 right-0 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 dark:text-black dark:hover:bg-yellow-500 transition cursor-pointer"
                  >
                    Edit
                  </Button>
                )}

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
                    <p className="font-medium">
                      {userInfo?.name?.split(" ")[1]}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Email address
                  </p>
                  <p className="font-medium">{userInfo?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </p>
                  <p className="font-medium">{userInfo?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Role
                  </p>
                  <p className="font-medium capitalize">
                    {role
                      .map(
                        (r) =>
                          r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
                      )
                      .join(", ")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active
                  </p>
                  <p className="font-medium">
                    {userInfo?.is_active ? "Yes" : "No"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="font-medium">
                    {userInfo?.address ?? "no address"}
                  </p>
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

                {/* <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Role
                  </label>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between border rounded-lg text-gray-700 dark:text-gray-100 dark:border-gray-600 dark:bg-gray-700"
                      >
                        {getPermissions(formData as TAuthUSer).role ||
                          "select role"}
                        <ChevronDown className="w-4 h-4 opacity-70" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-full">
                      <DropdownMenuRadioGroup
                        value={getPermissions(formData as TAuthUSer).role[1]}
                        onValueChange={(value) => setRole(value)}
                      >
                        {roleOptions.map((item) => (
                          <DropdownMenuRadioItem key={item} value={item}>
                            {item}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div> */}
                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Status
                  </label>

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
          {permissions.includes("USERS DELETE") && (
            <div>
              <DeleteUSerModal
                handleConfirm={handleConfirm}
                id={userInfo?.id}
                className="bg-red-100 dark:bg-red-700 hover:bg-red-200 dark:hover:bg-red-600 cursor-pointer"
                buttonClass="text-red-600 dark:text-red-300"
                level=" Delete user?"
                content="This action cannot be undone. It will permanently remove the user’s
            account and all associated data from the system."
                buttonName="Delete"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
