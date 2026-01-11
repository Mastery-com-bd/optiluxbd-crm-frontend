"use client";

import { useValidateresetTokenQuery } from "@/redux/features/auth/authApi";
import { useSearchParams } from "next/navigation";
import LoadingSkeleton from "./LoadingSkeleton";
import SetNewPassword from "./SetNewPassword";
import LoginText from "../login/LoginText";
import FaildComponent from "../register/FaildComponent";
import { useState } from "react";
import SuccessComponent from "../register/SuccessComponent";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data, isLoading } = useValidateresetTokenQuery(token);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    // <div className="w-full">
    //   {data?.success ? (
    //     <div>
    //       {open ? (
    //         <SuccessComponent
    //           title="Password reset Successfully!"
    //           content="your password has reset successfully. You can login to your account with the new password"
    //         />
    //       ) : (
    //         <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
    //           <LoginText />
    //           <SetNewPassword token={token as string} setOpen={setOpen} />
    //         </div>
    //       )}
    //     </div>
    //   ) : (
    //     <FaildComponent
    //       title="Opps An Error Occured"
    //       content="it means your reset link is not correct or invalid to reset your password. You can resend your email to get the reset link"
    //       buttonText="Resend Email"
    //       path="/forgot-password"
    //     />
    //   )}
    // </div>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 lg:gap-x-56">
      <LoginText />
      <SetNewPassword token={token as string} setOpen={setOpen} />
    </div>
  );
};

export default ResetPassword;
