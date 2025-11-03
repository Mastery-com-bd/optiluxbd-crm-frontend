"use client";

import Image from "next/image";
import { Controller, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type TSetNewPass = {
  password: string;
  confirmPass: string;
  acceptTerms: boolean;
};
const SetNewPassword = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSetNewPass>();
  const passwordValue = useWatch({ control, name: "password" });
  const onSubmit = (data: TSetNewPass) => {
    console.log(data);
    reset();
  };
  return (
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
        Set your new password after verifying and confirm it again by retyping
        it
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
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
            className={
              errors.confirmPass
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }
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
                <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
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
  );
};

export default SetNewPassword;
