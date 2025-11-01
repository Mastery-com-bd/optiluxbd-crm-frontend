/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Ban } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface ITermsCheckboxProps {
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  required?: boolean;
  label?: string;
}
const CheckoutInput = ({
  register,
  name,
  errors,
  required = false,
  label,
}: ITermsCheckboxProps) => {
  return (
    <section className=" font-inter">
      <label className="flex items-start space-x-2 cursor-pointer">
        {errors?.[name] && <Ban className="text-red-600" />}
        <input
          type="checkbox"
          {...register(name, {
            ...(required && { required: `${name} is required` }),
          })}
          className="accent-black mt-1 w-4 h-4 "
        />
        {label ? (
          <span>{label}</span>
        ) : (
          <span className="text-gray-500">Keep me signed in</span>
        )}
      </label>
    </section>
  );
};

export default CheckoutInput;
