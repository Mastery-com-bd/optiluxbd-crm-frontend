"use client";

import Image from "next/image";
import VerifyEmailIcon from "../svgIcon/VerifyEmailIcon";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailQuery } from "@/redux/features/auth/authApi";
import { Skeleton } from "../ui/skeleton";
import ResendMailComponent from "./ResendMailComponent";
import Link from "next/link";

const SuccessMail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useVerifyEmailQuery(token);

  if (isLoading) {
    return (
      <div className="bg-[#ffffff] p-8 lg:w-[25vw] w-[90vw] mx-auto space-y-6 rounded-xl">
        <div className="w-[30vw] lg:w-[8vw] mx-auto flex justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
        <div className="flex items-center justify-center text-center">
          <Skeleton className="h-4 w-[80%]" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-5 w-[60%]" />
        </div>
        <div className="flex justify-center">
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
        <div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.success ? (
        <div className="bg-[#ffffff] p-8 lg:w-[25vw] space-y-6 rounded-xl">
          <div className="w-[30vw] lg:w-[8vw] mx-auto">
            <Image
              src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
              height={500}
              width={500}
              alt="brand logo"
            />
          </div>
          <p className="flex items-center justify-center text-center text-sm px-6 text-[#a2b1ca]">
            Awesome ! You`ve read the important message like a pro`
          </p>

          <h1 className="text-gray-700 font-bold text-center">
            Well Done! Email verified Successfully
          </h1>
          <div className="flex justify-center">
            <VerifyEmailIcon />
          </div>
          <Link
            href="login"
            className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 "
          >
            Back to login
          </Link>
        </div>
      ) : (
        <ResendMailComponent />
      )}
    </>
  );
};

export default SuccessMail;
