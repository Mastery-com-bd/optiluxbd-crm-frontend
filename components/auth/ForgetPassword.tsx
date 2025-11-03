"use client";

import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

type TSingInForm = {
  email: string;
  acceptTerms: boolean;
};

const ForgetPassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TSingInForm>();

  const onSubmit = (data: TSingInForm) => {
    console.log(data);
    router.push("/");
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
        Enter your email address and we will send you a link to reset your
        pasword
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={errors.email ? "border-red-500" : ""}
            {...register("email", { required: "Email is required" })}
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
  );
};

export default ForgetPassword;
