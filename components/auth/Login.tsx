"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

type TSingInForm = {
  email: string;
  password: string;
  keepSignedIn?: boolean;
};

const Login = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
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
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            className={errors.password ? "border-red-500" : ""}
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="keepSignedIn" {...register("keepSignedIn")} />
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
