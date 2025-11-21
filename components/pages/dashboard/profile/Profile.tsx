/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { convertDate } from "@/utills/dateConverter";
import { Calendar, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentuserInfo,
  resetProfile,
  setname,
  setPhone,
} from "@/redux/features/agent/agentProfileSlice";
import {
  useGetMyProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { toast } from "sonner";
import { TStatus } from "@/types/user/user.types";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { TAuthUSer, TUSerRole } from "@/redux/features/auth/authSlice";
import ProfileLoader from "./ProfileLoader";
import ChangePassword from "@/components/auth/ChangePassword";
import ProfileImage from "./ProfileImage";

export interface IProfileInfo {
  id: number;
  avatar_secure_url: string;
  name: string;
  email: string;
  phone: string;
  created_at: string;
  roles: TUSerRole[];
  is_active: boolean;
  address: string;
  status: TStatus;
}

const Profile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const userInfo = data?.data;
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(currentuserInfo);
  const [formData, setFormData] = useState<IProfileInfo | null>(null);
  const [updateInfo] = useUpdateUserInfoMutation();
  const { role } = getPermissions(userInfo as TAuthUSer);
  useEffect(() => {
    if (userInfo) {
      Promise.resolve().then(() => {
        setFormData(userInfo as IProfileInfo);
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

  if (isLoading) {
    return <ProfileLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center space-y-10 ">
      <div className="w-full lg:w-[60vw] bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold text-black dark:text-gray-100 mb-8 border-b pb-4 border-gray-200 dark:border-gray-700">
          My Profile
        </h2>

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
                {/* <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Active
                  </p>
                  <p className="font-medium">
                    {userInfo?.is_active ? "Yes" : "No"}
                  </p>
                </div> */}
                {/* <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </p>
                  <p className="font-medium">
                    {userInfo?.address ?? "no address"}
                  </p>
                </div> */}
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
          <ChangePassword />
        </div>
      </div>
      {/* <ProfileStats/> */}
    </div>
  );
};

export default Profile;
