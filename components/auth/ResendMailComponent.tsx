"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SendEmailSuccess from "./SendEmailSuccess";

const resendMailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type TVerifyEmail = z.infer<typeof resendMailSchema>;

const ResendMailComponent = () => {
  const [resendEmail] = useResendVerificationEmailMutation();
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TVerifyEmail>({
    resolver: zodResolver(resendMailSchema),
  });

  const onSubmit = async (data: TVerifyEmail) => {
    try {
      const res = await resendEmail(data).unwrap();
      if (res?.message) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(true);
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <>
      {open ? (
        <SendEmailSuccess setOpen={setOpen} />
      ) : (
        <div className="bg-[#ffffff] dark:bg-gray-800 rounded-xl shadow-md dark:shadow-none  p-8 lg:w-[25vw] w-[90vw] mx-auto space-y-6 ">
          <div className="w-[30vw] lg:w-[8vw] mx-auto">
            <Image
              src="https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png"
              height={500}
              width={500}
              alt="brand logo"
            />
          </div>
          <p className="flex items-center justify-center text-center text-sm px-6 text-[#a2b1ca]">
            Oops! It looks like your email is not verified yet.
          </p>

          <h1 className="text-gray-700 font-bold text-center">
            Please verify your email to continue
          </h1>

          <div className="flex justify-center">
            <AlertCircle className="text-red-500 w-20 h-20" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-300 transition-colors"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
            >
              {isSubmitting ? "Sending request..." : "Send request"}
            </Button>
          </form>
          <p className=" flex justify-center gap-1 text-gray-500 text-sm">
            Return to
            <Link
              className="border-b border-[#ffc500] text-yellow-600"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default ResendMailComponent;
