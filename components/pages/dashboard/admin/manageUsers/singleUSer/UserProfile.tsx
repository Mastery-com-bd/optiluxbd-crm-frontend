/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useDeleteUserMutation,
  useGetASingleUserQuery,
} from "@/redux/features/user/userApi";
import { Calendar, Clock, UserCheck } from "lucide-react";
import { convertDate } from "@/utills/dateConverter";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import DeleteUSerModal from "./DeleteUSerModal";
import ProfileLoader from "../../../profile/ProfileLoader";
import ProfileImage from "../../../profile/ProfileImage";
import UserInfoEditComponent from "./UserInfoEditCmponent";
import UserRoleEditComponent from "./UserRoleEditComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressComponent from "../../../profile/AddressComponent";

const UserProfile = ({ id }: { id: string }) => {
  // get user information
  const { data, isLoading } = useGetASingleUserQuery(id, {
    refetchOnMountOrArgChange: false,
  });
  const userInfo = data?.data;

  // local state
  const [deleteUser] = useDeleteUserMutation();

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center space-y-10">
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
                  <Calendar size={16} />
                  <span className="text-gray-600 dark:text-gray-400">
                    Joined:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {convertDate(new Date(userInfo?.created_at)).creationDate}
                    </span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock size={15} />
                  <span className="text-gray-600 dark:text-gray-400">
                    Last Login:{" "}
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {userInfo?.last_login ? (
                        <span>
                          {
                            convertDate(new Date(userInfo?.last_login))
                              .creationTime
                          }
                          ,
                          {
                            convertDate(new Date(userInfo?.last_login))
                              .creationDate
                          }
                        </span>
                      ) : (
                        "Not yet"
                      )}
                    </span>
                  </span>
                </div>
                <UserRoleEditComponent userInfo={userInfo} />
              </div>
            </div>
          </section>
          {/* Profile Details Section */}
          <section className="w-full">
            <Tabs defaultValue="personal" className="w-full ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
              </TabsList>

              {/* PERSONAL INFO TAB */}
              <TabsContent value="personal">
                <UserInfoEditComponent userInfo={userInfo} />
              </TabsContent>

              {/* ADDRESS TAB */}
              <TabsContent value="address">
                <AddressComponent userInfo={userInfo} userFor="yes" />
              </TabsContent>
            </Tabs>
          </section>

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
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
