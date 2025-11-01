"use client";

import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import InputType from "../formInput/InputType";
import CheckoutInput from "../formInput/CheckoutInput";
import Link from "next/link";

export type TSetNewPass = {
  password: string;
  confirmPass: string;
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
        Set your new password after verifying and confirm it again by retyping
        it
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputType
          label="Password"
          name="password"
          placeholder="********"
          type="password"
          register={register}
          required={true}
          error={errors.password}
          props="register"
        />
        <InputType
          label="Confirm New Password"
          name="confirmPass"
          type="password"
          placeholder="********"
          register={register}
          required={true}
          error={errors.confirmPass}
          validateMatch={passwordValue}
        />
        <CheckoutInput
          register={register}
          name="acceptTerms"
          errors={errors}
          required={true}
          label="Agree the Terms and Policy"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
        >
          Update password
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

export default SetNewPassword;
