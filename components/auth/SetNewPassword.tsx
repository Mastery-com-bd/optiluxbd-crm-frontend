/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Controller, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  useResetPasswordMutation,
  useValidateresetTokenQuery,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export type TSetNewPass = {
  password: string;
  confirmPass?: string;
  acceptTerms?: boolean;
};

const SetNewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);
  const router = useRouter();
  const { visible, toggle } = usePasswordToggle();
  const [resetPassword] = useResetPasswordMutation();
  const { data, isLoading } = useValidateresetTokenQuery(token);
  console.log(data);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSetNewPass>();
  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: TSetNewPass) => {
    delete data.acceptTerms;
    delete data.confirmPass;
    try {
      const res = await resetPassword({ data, token }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        router.push("/login");
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

  if (isLoading) {
    return (
      <div className="bg-white p-8 lg:w-[30vw] space-y-6 rounded-xl w-full max-w-md mx-auto">
        <div className="w-[40vw] lg:w-[8vw] mx-auto flex justify-center">
          <Skeleton className="h-12 w-32 rounded-md" />
        </div>
        <div className="flex flex-col items-center space-y-2">
          <Skeleton className="h-3 w-[80%]" />
          <Skeleton className="h-3 w-[70%]" />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-3 w-[60%]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <Skeleton className="h-3 w-[70%]" />
            </div>
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <div className="flex justify-center space-x-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    );
  }

  return (
    <>
      {data?.success ? (
        <div className="bg-[#ffffff] p-8 lg:w-[30vw] space-y-6 rounded-xl">
          <div className="w-[30vw] lg:w-[8vw] mx-auto">
            <Image
              src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
              height={500}
              width={500}
              alt="brand logo"
            />
          </div>
          <p className="flex items-center justify-center text-center text-sm px-6 lg:px-16 text-[#a2b1ca]">
            Set your new password after verifying and confirm it again by
            retyping it
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2 relative">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={visible ? "text" : "password"}
                placeholder="********"
                className={errors.password ? "border-red-500" : ""}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Use at least 8 characters with letters, numbers, and symbols",
                  },
                })}
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                {visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <p className="text-gray-500 text-sm">
                use min 8 character with letters numbers and symbols
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPass">Confirm New Password</Label>
              <Input
                id="confirmPass"
                type="password"
                placeholder="********"
                className={errors.confirmPass ? "border-red-500" : ""}
                {...register("confirmPass", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
            </div>
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
                      className="text-sm text-gray-600"
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
            >
              {isSubmitting ? "Updating password..." : "Update password"}
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
      ) : (
        <div className="bg-[#ffffff] p-8 lg:w-[30vw] space-y-6 rounded-xl text-center">
          <div className="w-[30vw] lg:w-[8vw] mx-auto">
            <Image
              src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
              height={500}
              width={500}
              alt="brand logo"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-red-600">
              Verification Failed
            </h2>
            <p className="text-sm text-gray-600">
              Sorry, your verification link is invalid or expired.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button
              className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white"
              asChild
            >
              <Link href="/forgot-password">Return</Link>
            </Button>

            <p className="text-gray-500 text-sm">
              or{" "}
              <Link
                className="border-b border-[#ffc500] text-yellow-600"
                href="/login"
              >
                Go to Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SetNewPassword;
