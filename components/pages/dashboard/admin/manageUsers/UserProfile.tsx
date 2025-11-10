/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetASingleUserQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import { motion } from "framer-motion";
import ProfileImage from "../../agent/ProfileImage";
import {
  FileText,
  Info,
  Mail,
  MapPin,
  Phone,
  ShieldUser,
  UserCheck,
} from "lucide-react";
import { convertDate } from "@/utills/dateConverter";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { IProfileInfo } from "../../agent/Profile";
import {
  resetProfile,
  setBio,
  setCity,
  setCountry,
  setDateOfBirth,
  setGender,
  setname,
  setPhone,
} from "@/redux/features/agent/agentProfileSlice";
import { currentUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
const UserProfile = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetASingleUserQuery(id, {
    refetchOnMountOrArgChange: false,
  });
  const userInfo = data?.data;

  const nameSplit = userInfo?.name?.split(" ") ?? [];
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IProfileInfo | null>(null);
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
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-black dark:text-gray-100">
                  {userInfo?.name}
                </h4>
                <p className="text-gray-500 dark:text-gray-300 text-sm flex items-center gap-1">
                  <ShieldUser size={15} /> {userInfo?.role}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm flex items-center gap-1">
                  <MapPin size={16} /> {userInfo?.city ?? "no city added"},{" "}
                  {userInfo?.country ?? "no country added"}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm lg:w-[30vw] flex items-start gap-1">
                  <FileText size={15} /> {userInfo?.bio ?? "no bio"}
                </p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Mail
                      size={16}
                      className={
                        userInfo?.email_verified
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Email Verified: {userInfo?.email_verified ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Phone
                      size={16}
                      className={
                        userInfo?.phone_verified
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Phone Verified: {userInfo?.phone_verified ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <UserCheck
                      size={16}
                      className={
                        userInfo?.is_active ? "text-green-500" : "text-red-500"
                      }
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Active: {userInfo?.is_active ? "Yes" : "No"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Info
                      size={16}
                      className={
                        userInfo?.status === "active"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Status: {userInfo?.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Since {convertDate(new Date(userInfo?.created_at)).creationDate}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              last Login{" "}
              {userInfo?.last_login
                ? new Date(userInfo?.last_login).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "not yet"}
            </p>
          </section>

          {/* Profile Details Section */}
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
                    Gender
                  </p>
                  <p className="font-medium capitalize">
                    {userInfo?.gender ?? "no gender added"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Date of Birth
                  </p>
                  <p className="font-medium">
                    {userInfo?.dateOfBirth || "no date"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Country
                  </p>
                  <p className="font-medium">
                    {userInfo?.country ?? "no country"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    City
                  </p>
                  <p className="font-medium">{userInfo?.city ?? "no city"}</p>
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
                    value={formData?.name.split(" ")[0]}
                    onChange={(e) => {
                      /* your logic */
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
                    value={formData?.name.split(" ")[1] ?? ""}
                    onChange={(e) => {
                      /* your logic */
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
                      /* your logic */
                    }}
                    placeholder="Phone"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData?.gender ?? ""}
                    onChange={(e) => {
                      /* your logic */
                    }}
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Date of Birth
                  </label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData?.dateOfBirth ?? ""}
                    onChange={(e) => {
                      /* your logic */
                    }}
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Country
                  </label>
                  <input
                    name="country"
                    value={formData?.country ?? ""}
                    onChange={(e) => {
                      /* your logic */
                    }}
                    placeholder="Country"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    City
                  </label>
                  <input
                    name="city"
                    value={formData?.city ?? ""}
                    onChange={(e) => {
                      /* your logic */
                    }}
                    placeholder="City"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none"
                  />
                </div>

                <div className="sm:col-span-2 flex flex-col gap-1">
                  <label className="text-gray-700 dark:text-gray-200">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData?.bio ?? ""}
                    onChange={(e) => {
                      /* your logic */
                    }}
                    placeholder="Write your bio..."
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 outline-none min-h-[100px]"
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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
