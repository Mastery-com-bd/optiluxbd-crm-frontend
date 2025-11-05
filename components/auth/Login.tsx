/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { decodeToken } from "@/utills/decodeToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";

type TLoginData = {
  email: string;
  password: string;
  keepSignedIn?: boolean;
};

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { visible, toggle } = usePasswordToggle();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>();

  const onSubmit = async (data: TLoginData) => {
    delete data.keepSignedIn;
    try {
      const res = await login(data).unwrap();
      if (res?.success) {
        console.log(res?.data?.token);
        const token = res?.data?.token;
        const user = decodeToken(token);
        dispatch(setUser({ user, token: res?.data?.token }));
        toast.success(res?.message, {
          duration: 3000,
        });
        router.push("/dashboard/agent/profile");
        reset();
      }
    } catch (error: any) {
      console.log(error);
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
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
        Lets get you signed in. Enter your email and password to continue
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
        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={visible ? "text" : "password"}
            placeholder="********"
            className={errors.password ? "border-red-500" : ""}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
          >
            {visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Controller
              name="keepSignedIn"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="keepSignedIn"
                  checked={field.value || false} // only true when checked
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label htmlFor="keepSignedIn">Keep me signed in</Label>
          </div>
          <Link
            href="/forgot-password"
            className=" border-b border-gray-500 text-gray-400 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        New here ?
        <Link
          className="border-b border-[#ffc500] text-yellow-600"
          href="/register"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
