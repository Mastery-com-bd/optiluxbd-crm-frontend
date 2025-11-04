"use client";

import Image from "next/image";
import Link from "next/link";
import InputPin, { TSubmitHandler } from "./InputPin";

const ResetPassowrd = () => {
  const resendOTP = async () => {
    console.log("clicked");
  };

  const handleSubmit = async ({ e, otpNum, setLoading }: TSubmitHandler) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      otp: otpNum.join(""),
    };
    console.log(data);
    setLoading(false);
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
      <p className="flex items-center justify-center text-center text-sm px-6 text-[#a2b1ca]">
        We`ve emailed you a 6-digit verification code in your email, you have
        sent us`
      </p>
      <InputPin handleSubmit={handleSubmit} />
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        Don`t have a code` ?
        <button
          onClick={resendOTP}
          className="border-b border-[#ffc500] text-yellow-600 cursor-pointer"
        >
          {" "}
          Resend
        </button>{" "}
        or
        <Link
          className="border-b border-[#ffc500] text-yellow-600"
          href="/call-us"
        >
          Call Us
        </Link>
      </p>
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

export default ResetPassowrd;
