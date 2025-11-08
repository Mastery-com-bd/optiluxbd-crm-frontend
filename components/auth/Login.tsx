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
import { userLogin } from "@/service/auth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "@/redux/features/user/userApi";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  keepSignedIn: z.boolean().optional(),
});

export type TLoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { visible, toggle } = usePasswordToggle();
  const [redirect, setRedirect] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TLoginData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectParam = params.get("redirectPath");
    if (redirectParam) {
      Promise.resolve().then(() => {
        setRedirect(redirectParam);
      });
    }
  }, []);

  const onSubmit = async (data: TLoginData) => {
    delete data.keepSignedIn;
    try {
      const res = await userLogin(data);
      // const res = await login(data).unwrap();
      if (res?.success) {
        const token = res?.data?.token;
        const user = decodeToken(token);
        dispatch(setUser({ user, token: res?.data?.token }));
        toast.success(res?.message, {
          duration: 3000,
        });
        reset();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
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

  const handleAdmin = async () => {
    const data = {
      email: "admin@gmail.com",
      password: "Password@123",
    };
    try {
      const res = await userLogin(data);
      // const res = await login(data).unwrap();
      if (res?.success) {
        const token = res?.data?.token;
        const user = decodeToken(token);
        dispatch(setUser({ user, token: res?.data?.token }));
        toast.success(res?.message, {
          duration: 3000,
        });
        reset();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
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

  const handleAgent = async () => {
    const data = {
      email: "absbashar04@gmail.com",
      password: "Password@123",
    };
    try {
      const res = await userLogin(data);
      // const res = await login(data).unwrap();
      if (res?.success) {
        const token = res?.data?.token;
        const user = decodeToken(token);
        dispatch(setUser({ user, token: res?.data?.token }));
        toast.success(res?.message, {
          duration: 3000,
        });
        reset();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
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

  const handleCustomer = async () => {
    const data = {
      email: "absbashar04@gmail.com",
      password: "Password@123",
    };
    try {
      const res = await userLogin(data);
      // const res = await login(data).unwrap();
      if (res?.success) {
        const token = res?.data?.token;
        const user = decodeToken(token);
        dispatch(setUser({ user, token: res?.data?.token }));
        toast.success(res?.message, {
          duration: 3000,
        });
        reset();
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/dashboard");
        }
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
    <div className="bg-white dark:bg-gray-800 p-8 lg:w-[30vw] space-y-6 rounded-xl shadow-md dark:shadow-none">
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src="https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png"
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>

      <p className="text-center text-sm px-6 lg:px-16 text-gray-500 dark:text-gray-400">
        Lets get you signed in. Enter your email and password to continue
      </p>

      <div className="flex items-center justify-between">
        <Button
          onClick={handleAdmin}
          type="submit"
          disabled={isSubmitting}
          className=" bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Admin"}
        </Button>
        <Button
          onClick={handleAgent}
          type="submit"
          disabled={isSubmitting}
          className=" bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Agent"}
        </Button>
        <Button
          onClick={handleCustomer}
          type="submit"
          disabled={isSubmitting}
          className=" bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Customer"}
        </Button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
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

        {/* Password */}
        <div className="space-y-2 relative">
          <Label
            htmlFor="password"
            className="text-gray-700 dark:text-gray-200"
          >
            Password
          </Label>
          <Input
            id="password"
            type={visible ? "text" : "password"}
            placeholder="********"
            className={`${
              errors.password
                ? "border-red-500 dark:border-red-400"
                : "border-gray-300 dark:border-gray-700"
            } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={toggle}
            className="absolute right-2 top-8 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
          >
            {visible ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        {/* Keep Signed In & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Controller
              name="keepSignedIn"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="keepSignedIn"
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                />
              )}
            />
            <Label
              htmlFor="keepSignedIn"
              className="text-gray-700 dark:text-gray-200"
            >
              Keep me signed in
            </Label>
          </div>
          <Link
            href="/forgot-password"
            className="border-b border-gray-500 text-gray-400 text-sm dark:border-gray-600 dark:text-gray-300"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>

      {/* Registration Link */}
      <p className="flex justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
        New here ?
        <Link
          className="border-b border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400"
          href="/register"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
