"use client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

const SendEmailSuccess = ({
  setOpen,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 w-full md:w-[28vw] space-y-6 rounded-xl shadow-md dark:shadow-none mx-auto">
      {/* Logo */}
      <div className="w-[30vw] md:w-[10vw] mx-auto">
        <Image
          src="https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png"
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>

      {/* Intro message */}
      <h1 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-200">
        Email sent Successful 🎉
      </h1>

      {/* Explanation */}
      <p className="text-center text-sm text-[#a2b1ca] px-4">
        Great job! You have sent email successfully. To continue, please verify
        your email address. We’ve sent a confirmation link to your inbox.
      </p>

      {/* Icon */}
      <div className="flex justify-center">
        <CheckCircle className="text-green-500 w-16 h-16" />
      </div>

      {/* Warning message */}
      <p className="text-center text-xs text-red-500 font-medium px-6">
        ⚠️ You will not be able to login until your email is verified.
      </p>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Link
          href="/login"
          className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 text-center"
        >
          Back to Login
        </Link>

        <p className="text-center text-xs text-gray-500 dark:text-gray-400 flex gap-2 items-center">
          Didn’t receive the verification email?
          <button
            onClick={() => setOpen(false)}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Resend email
          </button>
        </p>
      </div>
    </div>
  );
};

export default SendEmailSuccess;
