/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ChangePassword from "@/components/auth/ChangePassword";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { attendenceMocData } from "@/constants/mocData";
import {
  useAttendenceHistoryQuery,
  useCheckInAttendenceMutation,
  useCheckOutAttendenceMutation,
  useEndBreakMutation,
  useGetAllAttendenceQuery,
  useStartBreakMutation,
} from "@/redux/features/attendence/attendenceAPI";
import { TAuthUSer, TUSerRole } from "@/redux/features/auth/authSlice";
import { useGetMyProfileQuery } from "@/redux/features/user/userApi";
import { TStatus } from "@/types/user/user.types";
import { convertDate } from "@/utills/dateConverter";
import { getPermissions } from "@/utills/getPermissionAndRole";
import { Calendar, Clock, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AddressComponent from "./AddressComponent";
import AttendanceTable from "./attendenceTable";
import EditInfoComponent from "./EditInfoComponent";
import MyOrders from "./MyOrders";
import ProfileImage from "./ProfileImage";
import ProfileLoader from "./ProfileLoader";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";

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
  const [checkInAttendence] = useCheckInAttendenceMutation();
  const [startBreak] = useStartBreakMutation();
  const [endBreak] = useEndBreakMutation();
  const [checkOutAttendence] = useCheckOutAttendenceMutation();
  const { data, isLoading } = useGetMyProfileQuery(undefined);
  // const { data, isLoading } = useGetProfileQuery(undefined);
  const { data: attendenceData, isLoading: attendenceLoading } =
    useAttendenceHistoryQuery(undefined);
  const { data: allAttendenceData, isLoading: allAttendenceDataLoading } =
    useGetAllAttendenceQuery(undefined);
  const userInfo = data?.data;
  const attendenceInfo = attendenceData?.data;
  const currentTime = new Date();
  const checkInTime = new Date(attendenceInfo?.checkInTime);
  const orderInfo = userInfo?.orders;
  const [loading, setLoading] = useState(false);
  // const currentUser = useAppSelector(currentuserInfo);
  const { role } = getPermissions(userInfo as TAuthUSer);

  const handleCheckIn = async () => {
    setLoading(true);

    const currentShift =
      new Date().getHours() < 16 ||
      (new Date().getHours() === 16 && new Date().getMinutes() < 30)
        ? "MORNING"
        : "EVENING";

    const payload = {
      shift: currentShift,
    };
    try {
      const res = await checkInAttendence(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        setLoading(false);
        window.location.reload();
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

  const handleStartBreak = async () => {
    setLoading(true);
    try {
      const res = await startBreak(undefined).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
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

  const handleEndBreak = async () => {
    setLoading(true);
    try {
      const res = await endBreak(undefined).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
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

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const res = await checkOutAttendence(undefined).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
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

  const [breakLabel, setBreakLabel] = useState<string>("End Break");

  useEffect(() => {
    if (!attendenceInfo?.breaks?.[0]?.startTime) return;

    const interval = setInterval(() => {
      const breakStart = new Date(attendenceInfo.breaks[0].startTime);
      const now = new Date();
      const diffMs =
        breakStart.getTime() + 40 * 60 * 1000 - now.getTime() - 1000 * 60 * 20;

      if (diffMs <= 0) {
        const lateMs = Math.abs(diffMs);
        const lateMins = Math.floor(lateMs / 60000);
        const lateSecs = Math.floor((lateMs % 60000) / 1000);
        setBreakLabel(
          `End Break (-${lateMins}:${lateSecs < 10 ? "0" : ""}${lateSecs})`
        );
      } else {
        const mins = Math.floor(diffMs / 60000);
        const secs = Math.floor((diffMs % 60000) / 1000);
        setBreakLabel(`End Break (${mins}:${secs < 10 ? "0" : ""}${secs})`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [attendenceInfo?.breaks]);

  if (isLoading || attendenceLoading || allAttendenceDataLoading) {
    return <ProfileLoader />;
  }

  return (
    <>
      <section className="  p-6 flex flex-col items-center space-y-10 ">
        <div className="w-full lg:w-[60vw] bg-white dark:bg-gray-900 rounded-2xl shadow p-8">
          <div className="w-full flex justify-between items-center border-b border-gray-200 dark:border-gray-700 mb-5 pb-3">
            <h2 className="text-2xl font-semibold ">My Profile</h2>
            {/* Mark Attendance Button */}
            <div className="flex justify-end">
              {!attendenceInfo?.breaks[0]?.endTime &&
              checkInTime < currentTime ? (
                <div>
                  {attendenceInfo?.breaks[0]?.startTime ? (
                    <div>
                      {attendenceInfo?.breaks[0]?.endTime ? (
                        <Button
                          onClick={handleCheckOut}
                          className="px-4 py-2 rounded-sm cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin w-5 h-5" />
                              Loading...
                            </>
                          ) : (
                            "End Shift"
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleEndBreak}
                          className="px-4 py-2 rounded-sm cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="animate-spin w-5 h-5" />
                              Loading...
                            </>
                          ) : (
                            breakLabel
                          )}
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      onClick={handleStartBreak}
                      className="px-4 py-2 rounded-sm cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin w-5 h-5" />
                          Loading...
                        </>
                      ) : (
                        "Start Break"
                      )}
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  onClick={handleCheckIn}
                  className="px-4 py-2 rounded-sm cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-5 h-5" />
                      Loading...
                    </>
                  ) : (
                    "Mark Attendance"
                  )}
                </Button>
              )}
            </div>
          </div>

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
      <AttendanceTable data={attendenceMocData} />
    </>
  );
};

export default Profile;
