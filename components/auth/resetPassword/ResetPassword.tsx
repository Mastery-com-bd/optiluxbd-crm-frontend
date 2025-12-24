"use client";

import { useValidateresetTokenQuery } from "@/redux/features/auth/authApi";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";

import FaildResetPassword from "./FaildResetPassword";
import SetNewPassword from "./SetNewPassword";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useValidateresetTokenQuery(token);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {data?.success ? (
        <SetNewPassword token={token as string} />
      ) : (
        <FaildResetPassword />
      )}
    </>
  );
};

export default ResetPassword;
