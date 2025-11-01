"use client";

import Image from "next/image";
import VerifyEmailIcon from "../svgIcon/VerifyEmailIcon";

const SuccessMail = () => {
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
        Awesome ! You`ve read the important message like a pro`
      </p>

      <h1 className="text-gray-700 font-bold text-center">
        Well Done! Email verified Successfully
      </h1>
      <div className="flex justify-center">
        <VerifyEmailIcon />
      </div>
      <button
        type="submit"
        className="w-full p-2 rounded-lg transition bg-yellow-500 text-white hover:bg-[#ffc500] duration-300 cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SuccessMail;
