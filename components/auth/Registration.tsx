"use client";
import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
  acceptTerms: boolean;
};

const Registration = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>();
  const onSubmit = (data: TRegisterForm) => {
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
        Lets get you started in. Create your account by entering your details
        below
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Damian D."
            className={errors.name ? "border-red-500" : ""}
            {...register("name", { required: "Name is required" })}
          />
        </div>
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        Already have an account ?
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

export default Registration;
