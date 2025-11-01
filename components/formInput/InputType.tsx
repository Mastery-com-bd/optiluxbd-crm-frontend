/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

type TInputTypeProps = {
  label: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  required?: boolean;
  props?: string;
};

const InputType = ({
  label,
  name,
  placeholder = "",
  register,
  error,
  type = "text",
  required = false,
  props,
}: TInputTypeProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full font-inter relative space-y-3">
      <label className="block text-sm font-semibold text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...register(name, {
            ...(required && { required: `${label} is required` }),
            ...(type === "email" && {
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "enter a valid email address",
              },
            }),
            ...(type === "date" && {
              validate: (value) => {
                const birthDate = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                if (label !== "Service Date") {
                  const isUnderage =
                    age < 18 ||
                    (age === 18 &&
                      today <
                        new Date(birthDate.setFullYear(today.getFullYear())));
                  return !isUnderage || "You must be at least 18 years old.";
                }
              },
            }),
            ...(type === "password" &&
              name === "newPassword" && {
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "use min 8 character with letters numbers and symbols",
                },
              }),
          })}
          className={`peer w-full px-4 py-2 rounded-lg border transition-all duration-300 outline-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:border hover:border-gray-500 ${
            error
              ? "border-2 border-red-300 focus:border-red-300 focus:ring-red-300"
              : "border border-gray-300 dark:border-gray-600 "
          }`}
          placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        />
        {type === "password" && (
          <span
            className="absolute top-3 right-3 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={18} />}
          </span>
        )}
      </div>
      {props === "register" && (
        <p className="text-gray-500 text-sm">
          use min 8 character with letters numbers and symbols
        </p>
      )}
    </div>
  );
};

export default InputType;
