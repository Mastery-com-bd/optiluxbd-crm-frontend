"use client";

import SetNewPassword from "@/components/auth/SetNewPassword";
import { Suspense } from "react";

const ResetPasswordProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetNewPassword />
    </Suspense>
  );
};

export default ResetPasswordProvider;
