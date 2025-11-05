"use client";
import SuccessMail from "@/components/auth/SuccessMail";
import { Suspense } from "react";

const VerifyEmailProvider = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessMail />
    </Suspense>
  );
};

export default VerifyEmailProvider;
