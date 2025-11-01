"use client";
import { useForm } from "react-hook-form";
import InputType from "../formInput/InputType";
import Link from "next/link";
import Image from "next/image";

type TLockScreen = {
  password: string;
};
const LockScreen = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLockScreen>();
  const onSubmit = (data: TLockScreen) => {
    console.log(data);

    reset();
  };
  return (
    <div className="bg-[#ffffff] p-8 lg:w-[25vw] space-y-6 rounded-xl">
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={`https://www.faceplusplus.com/demo/images/demo-pic35.jpg`}
          height={500}
          width={500}
          alt="brand logo"
          className="w-24 h-24 rounded-full"
        />
        <h1 className="font-semibold text-gray-600">Steven McDonald</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <InputType
          label="Password"
          name="password"
          type="password"
          placeholder="********"
          register={register}
          required={true}
          error={errors.password}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
        >
          Unlock
        </button>
      </form>
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        Not you ? Return to
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

export default LockScreen;
