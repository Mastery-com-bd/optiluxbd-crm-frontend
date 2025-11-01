"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const ResetPassowrd = () => {
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{6}$/.test(pastedData)) {
      setOtpNum(pastedData.split(""));
      pastedData.split("").forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index]!.value = char;
        }
      });
      inputRefs.current[5]?.focus();
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otpNum];
    newOtp[index] = value;
    setOtpNum(newOtp);
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && otpNum[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const resendOTP = async () => {
    console.log("clicked");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      otp: otpNum.join(""),
    };
    console.log(data);
  };

  return (
    <div className="bg-[#ffffff] p-8 lg:w-[25vw] space-y-6">
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

      <form onSubmit={handleSubmit} className="space-y-2">
        <h1 className="text-sm text-gray-500">
          Enter your 6-digit code <span className="text-red-500">*</span>
        </h1>
        <div className="space-y-6">
          <div className="flex justify-center gap-2 md:gap-3">
            {otpNum.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
                onPaste={handlePaste}
                className="w-10 h-10 rounded md:text-lg font-semibold text-center border border-gray-300 text-gray-900 focus:outline-yellow-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </form>

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
