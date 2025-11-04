"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
          src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764`}
          height={500}
          width={500}
          alt="brand logo"
          className="w-24 h-24 rounded-full"
        />
        <h1 className="font-semibold text-gray-600">Steven McDonald</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
        >
          {isSubmitting ? "Unlocking..." : "Unlock"}
        </Button>
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
