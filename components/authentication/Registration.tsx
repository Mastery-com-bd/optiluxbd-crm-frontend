"use client";
import { useForm } from "react-hook-form";
import InputType from "../formInput/InputType";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CheckoutInput from "../formInput/CheckoutInput";

type TRegisterForm = {
  name: string;
  email: string;
  password: string;
};

const Registration = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
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
        <InputType
          label="Name"
          name="name"
          placeholder="Damian D."
          type="text"
          register={register}
          required={true}
          error={errors.name}
        />
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
          props="register"
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
          Create account
        </button>
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
