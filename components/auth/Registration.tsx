/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import RegistrationSuccess from "./RegistrationSuccess";

export const passwordRules = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?\":{}|<>]/ },
];

const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .min(11, "please enter a valid phone number")
      .regex(/^01\d{9}$/, "please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include at least one uppercase letter")
      .regex(/[a-z]/, "Must include at least one lowercase letter")
      .regex(/[0-9]/, "Must include at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Must include at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(1, "Confirm password is required")
      .optional(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TRegisterForm = z.infer<typeof registerSchema>;

const Registration = () => {
  const [registration] = useRegisterMutation();
  const { visible, toggle } = usePasswordToggle();
  const [touched, setTouched] = useState(false);
  const [passwordtext, setPasswordText] = useState("");
  const [open, setOpen] = useState(true);
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: TRegisterForm) => {
    const { confirmPassword, acceptTerms, ...payload } = data;
    payload.phone = `+88${payload.phone}`;
    try {
      const res = await registration(payload).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(true);
        reset();
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <>
      {open ? (
        <RegistrationSuccess />
      ) : (
        <div className="bg-white dark:bg-gray-800 px-8 py-4 lg:w-[30vw] space-y-3 rounded-xl shadow-md dark:shadow-none">
          <div className="w-[30vw] lg:w-[8vw] mx-auto">
            <Image
              src="https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png"
              height={500}
              width={500}
              alt="brand logo"
            />
          </div>

          <p className="text-center text-sm px-6 lg:px-16 text-gray-500 dark:text-gray-400">
            Lets get you started in. Create your account by entering your
            details below
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-gray-700 dark:text-gray-200"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Damian D."
                className={`${
                  errors.name
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("name", { required: "Name is required" })}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-gray-700 dark:text-gray-200"
              >
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className={`${
                  errors.email
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("email", { required: "Email is required" })}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-gray-700 dark:text-gray-200"
              >
                Phone number
              </Label>
              <Input
                id="phone"
                type="phone"
                placeholder="0185XXXXXXX"
                className={`${
                  errors.phone
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01\d{9}$/,
                    message: "please enter a valid phone number",
                  },
                })}
              />
              {errors.phone && (
                <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Label
                htmlFor="password"
                className="text-gray-700 dark:text-gray-200"
              >
                Password
              </Label>

              {/* Password input */}
              <Input
                id="password"
                type={visible ? "text" : "password"}
                placeholder="********"
                className={`${
                  errors.password
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("password", {
                  required: "Password is required",
                  onChange: (e) => {
                    setPasswordText(e.target.value);
                    setTouched(true);
                  },
                  onBlur: () => setTouched(true),
                })}
              />

              {/* Eye toggle */}
              <button
                type="button"
                onClick={toggle}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                {visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>

              {/* Dynamic password rules */}
              {touched && (
                <div className="mt-2 space-y-1">
                  {passwordRules
                    .filter((rule) => !rule.regex.test(passwordtext || "")) // show only invalid ones
                    .map((rule) => (
                      <div
                        key={rule.label}
                        className="flex items-center gap-2 text-sm transition-all duration-200 ease-in-out"
                      >
                        <span className="text-red-500 dark:text-red-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3.5 h-3.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {rule.label}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 dark:text-gray-200"
              >
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className={`${
                  errors.confirmPassword
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="flex items-center gap-1 text-sm text-red-600 dark:text-red-400 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Accept Terms */}
            <Controller
              name="acceptTerms"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="acceptTerms"
                      checked={!!field.value}
                      onCheckedChange={(checked) =>
                        field.onChange(checked === true)
                      }
                    />
                    <Label
                      htmlFor="acceptTerms"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      Agree to the Terms and Policy
                    </Label>
                  </div>

                  {errors.acceptTerms && (
                    <p className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1">
                      ⚠️ Please accept the terms to continue
                    </p>
                  )}
                </div>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="flex justify-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
            Already have an account ?
            <Link
              className="border-b border-yellow-500 dark:border-yellow-400 text-yellow-600 dark:text-yellow-400"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Registration;
