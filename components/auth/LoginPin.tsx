"use client";
import Image from "next/image";
import Link from "next/link";
import InputPin from "../formInput/InputPin";

const LoginPin = () => {
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    otpNum: string[]
  ) => {
    e.preventDefault();
    const data = {
      otp: otpNum.join(""),
    };
    console.log(data);
  };
  return (
    <div className="bg-[#ffffff] p-8 lg:w-[24vw] space-y-6 rounded-xl">
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>
      <p className="flex items-center justify-center text-center text-sm px-6  text-[#a2b1ca]">
        This screen is locked. Enter your PIN to continue
      </p>
      <div className="flex flex-col items-center gap-4">
        <Image
          src={`https://images.unsplash.com/photo-1651684215020-f7a5b6610f23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069`}
          height={500}
          width={500}
          alt="brand logo"
          className="w-24 h-24 rounded-full object-cover"
        />
        <h1 className="font-semibold text-gray-600">Steven McDonald</h1>
      </div>
      <InputPin handleSubmit={handleSubmit} />
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        Not you ? Return to
        <Link
          className="border-b border-[#ffc500] text-yellow-600"
          href="/register"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default LoginPin;
