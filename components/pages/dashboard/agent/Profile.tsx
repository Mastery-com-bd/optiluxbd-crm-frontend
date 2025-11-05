/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { convertDate } from "@/utills/dateConverter";
import ProfileImage from "./ProfileImage";
import { FileText, MapPin, ShieldUser } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentuserInfo,
  resetProfile,
  setBio,
  setCity,
  setCountry,
  setDateOfBirth,
  setGender,
  setname,
  setPhone,
} from "@/redux/features/agent/agentProfileSlice";
import ProfileStats from "./ProfileStats";
import {
  useGetProfileQuery,
  useUpdateUserInfoMutation,
} from "@/redux/features/user/userApi";
import ProfileLoader from "./ProfileLoader";
import { toast } from "sonner";
// import ChangePassword from "./ChangePassword";

interface IProfileInfo {
  id: number;
  avatar_secure_url: string;
  name: string;
  role: string;
  city?: string;
  country?: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  bio?: string;
  created_at: string;
}

const Profile = () => {
  const { data, isLoading } = useGetProfileQuery(undefined);
  const userInfo = data?.data;
  const nameSplit = userInfo?.name?.split(" ") ?? [];
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(currentuserInfo);
  const [formData, setFormData] = useState<IProfileInfo | null>(null);
  const [updateInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (userInfo) {
      Promise.resolve().then(() => {
        setFormData(userInfo as IProfileInfo);
      });
    }
  }, [userInfo]);

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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center space-y-10 ">
      <div className="w-full lg:w-[60vw] bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold text-black mb-8 border-b pb-4 border-gray-200">
          My Profile
        </h2>
        <div className="space-y-6">
          <section className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-2">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <ProfileImage
                profileImage={userInfo?.avatar_secure_url}
                id={userInfo?.id}
              />
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-black">
                  {userInfo?.name}
                </h4>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <span>
                    <ShieldUser size={15} />
                  </span>{" "}
                  <span> {userInfo?.role}</span>
                </p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <span>
                    {" "}
                    <MapPin size={16} />{" "}
                  </span>
                  {userInfo?.city ?? "no city added"},{" "}
                  {userInfo?.country ?? "no country added"}
                </p>
                <p className="text-gray-500 text-sm lg:w-[30vw] flex items-start gap-1">
                  <span>
                    <FileText size={15} />
                  </span>{" "}
                  {userInfo?.bio ?? "no bio"}
                </p>
              </div>
            </div>
            <p className="text-gray-600">
              Since {convertDate(new Date(userInfo?.created_at)).creationDate}
            </p>
          </section>
          <section>
            {!isEditing ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 relative">
                <button
                  onClick={() => setIsEditing(true)}
                  className="absolute top-0 right-0 px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-500 transition cursor-pointer"
                >
                  Edit
                </button>
                <div>
                  <p className="text-sm text-gray-500">First Name</p>
                  <p className="font-medium">{userInfo?.name?.split(" ")[0]}</p>
                </div>
                {userInfo?.name?.split(" ")[1] && (
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="font-medium">
                      {userInfo?.name?.split(" ")[1]}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Email address</p>
                  <p className="font-medium">{userInfo?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userInfo?.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium capitalize">
                    {userInfo?.gender ?? "no gender added"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="font-medium">
                    {userInfo?.dateOfBirth || "no date"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Country</p>
                  <p className="font-medium">
                    {userInfo?.country ?? "no city"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">City</p>
                  <p className="font-medium">{userInfo?.city ?? "no city"}</p>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0.6, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700"
              >
                <div className="flex flex-col gap-1">
                  <label> First Name</label>
                  <input
                    name="firstName"
                    value={formData?.name.split(" ")[0]}
                    onChange={(e) => {
                      const value = e.target.value;
                      const fullName = `${value} ${
                        nameSplit[1] && nameSplit[1]
                      }`;
                      setFormData((prev) => ({
                        ...prev!,
                        name: fullName,
                      }));
                      dispatch(setname(fullName));
                    }}
                    placeholder="First Name"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label> Last Name</label>
                  <input
                    name="lastName"
                    value={formData?.name.split(" ")[1] ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const fullName = `${nameSplit[0]} ${value}`;
                      setFormData((prev) => ({
                        ...prev!,
                        name: fullName,
                      }));
                      dispatch(setname(fullName));
                    }}
                    placeholder="Last Name"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label> Phone Number</label>
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
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label> Gender</label>
                  <select
                    name="gender"
                    value={formData?.gender ?? ""}
                    onChange={(e) => {
                      type TGender = "male" | "female" | "others";
                      const value = e.target.value as TGender;
                      setFormData((prev) => ({
                        ...prev!,
                        gender: value,
                      }));
                      dispatch(setGender(value));
                    }}
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <label> Date of Birth</label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData?.dateOfBirth ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev!,
                        dateOfBirth: value,
                      }));
                      dispatch(setDateOfBirth(value));
                    }}
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label> Country</label>
                  <input
                    name="country"
                    value={formData?.country ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev!,
                        country: value,
                      }));
                      dispatch(setCountry(value));
                    }}
                    placeholder="Country"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label> City</label>
                  <input
                    name="city"
                    value={formData?.city}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev!,
                        city: value,
                      }));
                      dispatch(setCity(value));
                    }}
                    placeholder="City"
                    className="p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label> Bio</label>
                  <textarea
                    name="bio"
                    value={formData?.bio ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev!,
                        bio: value,
                      }));
                      dispatch(setBio(value));
                    }}
                    placeholder="Write your bio..."
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none min-h-[100px]"
                  />
                </div>

                <div className="sm:col-span-2 flex justify-end gap-3 mt-4">
                  <button
                    disabled={loading}
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-400 text-black font-medium hover:bg-yellow-500 transition cursor-pointer"
                  >
                    {loading ? "Saving" : "Save Change"}
                  </button>
                </div>
              </motion.div>
            )}
          </section>
        </div>
        {/* <div className="flex items-center justify-center mt-10">
          <ChangePassword />
        </div> */}
      </div>

      <ProfileStats />
    </div>
  );
};

export default Profile;
