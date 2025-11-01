"use client";

import { FormEvent, useRef, useState } from "react";

const InputPin = ({
  handleSubmit,
}: {
  handleSubmit: (
    e: FormEvent<HTMLFormElement>,
    otpNum: string[]
  ) => Promise<void>;
}) => {
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

  return (
    <form onSubmit={(e) => handleSubmit(e, otpNum)} className="space-y-2">
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
  );
};

export default InputPin;
