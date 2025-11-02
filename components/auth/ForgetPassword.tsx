"use client";

import { useForm } from "react-hook-form";
import InputType from "../formInput/InputType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutInput from "../formInput/CheckoutInput";

type TSingInForm = {
  email: string;
};

const ForgetPassword = () => {
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
        Enter your email address and we will send you a link to reset your
        pasword
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

        <CheckoutInput
          register={register}
          name="acceptTerms"
          errors={errors}
          label="Agree the Terms and Policy"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
        >
          Send Request
        </button>
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
