"use client";

import ResetPassword from "@/components/auth/resetPassword/ResetPassword";
import { Suspense } from "react";

const ResetPasswordProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordProvider;
