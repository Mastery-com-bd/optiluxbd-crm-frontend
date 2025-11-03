"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type TSubmitHandler = {
  e: React.FormEvent<HTMLFormElement>;
  otpNum: string[];
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const InputPin = ({
  handleSubmit,
}: {
  handleSubmit: ({ e, otpNum, setLoading }: TSubmitHandler) => Promise<void>;
}) => {
  const [otpNum, setOtpNum] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [loading, setLoading] = useState(false);

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
    <form
      onSubmit={(e) => handleSubmit({ e, otpNum, setLoading })}
      className="space-y-2"
    >
      <h1 className="text-sm text-gray-500">
        Enter your 6-digit code <span className="text-red-500">*</span>
      </h1>
      <div className="space-y-6">
        <div className="flex justify-center gap-2 md:gap-3">
          {otpNum.map((digit, index) => (
            <Input
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
              className="w-10 h-10 md:text-lg font-semibold text-center border border-gray-300 text-gray-900 focus-visible:ring-yellow-500"
            />
          ))}
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
        >
          {loading ? "Confirming..." : "Confirm"}
        </Button>
      </div>
    </form>
  );
};

export default InputPin;
