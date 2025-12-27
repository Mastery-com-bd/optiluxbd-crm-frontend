"use client";
import { useSearchParams } from "next/navigation";
import { useVerifyEmailQuery } from "@/redux/features/auth/authApi";
import ResendMailComponent from "./ResendMailComponent";
import SuccessComponent from "../register/SuccessComponent";
import LoadingSkeleton from "./LoadingSkeleton";

const SuccessMail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useVerifyEmailQuery(token);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {data?.success ? (
        <SuccessComponent
          title="Email Verified Successfully!"
          content="your email is now verified. You can login to your account from now"
        />
      ) : (
        <ResendMailComponent />
      )}
    </>
  );
};

export default SuccessMail;
