"use client";
import { convertDate } from "@/utills/dateConverter";
import { Calendar, Clock } from "lucide-react";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { TAuthUSer } from "@/redux/features/auth/authSlice";
import ProfileLoader from "./ProfileLoader";
import ChangePassword from "@/components/auth/ChangePassword";
import ProfileImage from "./ProfileImage";
import MyOrders from "./MyOrders";
import EditInfoComponent from "./EditInfoComponent";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddressComponent from "./AddressComponent";

const Profile = () => {
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  const userInfo = data?.data;
  const orderInfo = userInfo?.orders;
  const { role } = getPermissions(userInfo as TAuthUSer);
  console.log(userInfo);
  if (isLoading) {
    return <ProfileLoader />;
  }

  return (
    <>
      <section className=" bg-gray-50 dark:bg-gray-950 p-6 flex flex-col items-center space-y-10 ">
        <div className="w-full lg:w-[60vw] bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
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
                    <span className="text-gray-600 dark:text-gray-400">
                      User ID:{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {userInfo?.userId}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Role:{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {role
                          .map(
                            (r) =>
                              r.charAt(0).toUpperCase() +
                              r.slice(1).toLowerCase()
                          )
                          .join(", ")}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-yellow-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Joined:{" "}
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {
                          convertDate(new Date(userInfo?.created_at))
                            .creationDate
                        }
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
            {/* edit the personal info and address section */}
            <section className="w-full">
              <Tabs defaultValue="personal" className="w-full ">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="address">Address</TabsTrigger>
                </TabsList>

                {/* PERSONAL INFO TAB */}
                <TabsContent value="personal">
                  <EditInfoComponent userInfo={userInfo} />
                </TabsContent>

                {/* ADDRESS TAB */}
                <TabsContent value="address">
                  <AddressComponent userInfo={userInfo} />
                </TabsContent>
              </Tabs>
            </section>
            <ChangePassword />
          </div>
        </div>
        {/* <ProfileStats/> */}
      </section>
      <MyOrders order={orderInfo} />
    </>
  );
};

export default Profile;
