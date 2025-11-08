/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export type TForgotPassword = z.infer<typeof forgotPasswordSchema>;

const ForgetPassword = () => {
  const [forgotPassword] = useForgetPasswordMutation();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPassword) => {
    const { acceptTerms, ...payload } = data;
    try {
      const res = await forgotPassword(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[1]?.message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 lg:w-[30vw] space-y-6 rounded-xl shadow-md transition-colors duration-300">
      {/* Logo */}
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src="https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png"
          height={500}
          width={500}
          alt="brand logo"
          className="mx-auto"
        />
      </div>

      {/* Subtitle */}
      <p className="flex items-center justify-center text-center text-sm px-6 lg:px-16 text-[#a2b1ca] dark:text-gray-400">
        Enter your email address and we’ll send you a link to reset your
        password
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
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

        {/* Terms Checkbox */}
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label
                  htmlFor="acceptTerms"
                  className="text-sm text-gray-600 dark:text-gray-300"
                >
                  Agree to the Terms and Policy
                </Label>
              </div>

              {errors.acceptTerms && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  ⚠️ Please accept the terms to continue
                </p>
              )}
            </div>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white dark:bg-yellow-600 dark:hover:bg-yellow-500 cursor-pointer transition-colors"
        >
          {isSubmitting ? "Sending request..." : "Send request"}
        </Button>
      </form>

      {/* Footer */}
      <p className="flex justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
        Return to
        <Link
          className="border-b border-yellow-500 text-yellow-600 dark:text-yellow-400 dark:border-yellow-400 hover:text-yellow-500 transition-colors"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default ForgetPassword;
