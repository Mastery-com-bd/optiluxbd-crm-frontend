"use client";

import { useForm } from "react-hook-form";
import InputType from "../formInput/InputType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutInput from "../formInput/CheckoutInput";

type TSingInForm = {
  email: string;
  password: string;
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
    <div className="bg-[#ffffff] p-8 lg:w-[30vw] space-y-6">
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
        <InputType
          label="Email address"
          name="email"
          placeholder="you@example.com"
          type="email"
          register={register}
          required={true}
          error={errors.email}
        />
        <InputType
          label="Password"
          name="password"
          type="password"
          placeholder="********"
          register={register}
          required={true}
          error={errors.password}
        />
        <div className="flex items-center justify-between">
          <CheckoutInput
            register={register}
            name="acceptTerms"
            errors={errors}
          />
          <Link
            href="/forgot-password"
            className=" border-b border-gray-500 text-gray-400 text-sm"
          >
            Forgot Password?
          </Link>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
        >
          Login
        </button>
      </form>
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        New here ?
        <Link
          className="border-b border-[#ffc500] text-yellow-600"
          href="/registration"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default Login;
