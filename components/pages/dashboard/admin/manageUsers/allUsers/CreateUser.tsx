/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordRules } from "@/components/auth/Registration";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateUserByAdminMutation } from "@/redux/features/user/userApi";

const createUserSchema = z.object({
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
  role: z.enum(["ADMIN", "AGENT", "CUSTOMER"], "Role is required"),
  is_active: z.boolean("Status is required"),
});

export type createYSerForm = z.infer<typeof createUserSchema>;

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const { visible, toggle } = usePasswordToggle();
  const [touched, setTouched] = useState(false);
  const [passwordtext, setPasswordText] = useState("");
  const [createUser] = useCreateUserByAdminMutation();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<createYSerForm>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: createYSerForm) => {
    data.phone = `+88${data.phone}`;
    try {
      const res = await createUser(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
        setOpen(false);
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
    <Dialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-[#ffc500] text-white">
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-[90vw] rounded-xl">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription>
            Fill out the details below to manually create a new user account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
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
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
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
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200">
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

          <div className="space-y-2 relative">
            <Label
              htmlFor="password"
              className="text-gray-700 dark:text-gray-200"
            >
              Password
            </Label>
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
            <button
              type="button"
              onClick={toggle}
              className="absolute right-2 top-8 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
            >
              {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            {touched && (
              <div className="mt-2 space-y-1">
                {passwordRules
                  .filter((rule) => !rule.regex.test(passwordtext || ""))
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

          {/* Role Dropdown */}
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label
                  htmlFor="role"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Role
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full text-left bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border ${
                        fieldState.error
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      } flex justify-between items-center`}
                    >
                      {field.value || "Select Role"}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
                    {["ADMIN", "AGENT", "CUSTOMER"].map((role) => (
                      <DropdownMenuItem
                        key={role}
                        className={`${
                          field.value === role
                            ? "font-semibold text-primary"
                            : ""
                        }`}
                        onClick={() => field.onChange(role)}
                      >
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {fieldState.error && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />

          {/* Active Status Dropdown */}
          <Controller
            name="is_active"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field, fieldState }) => (
              <div className="space-y-2">
                <Label
                  htmlFor="active"
                  className="text-gray-700 dark:text-gray-200"
                >
                  Active
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full text-left bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border ${
                        fieldState.error
                          ? "border-red-500 dark:border-red-400"
                          : "border-gray-300 dark:border-gray-700"
                      } flex justify-between items-center`}
                    >
                      {field.value !== undefined
                        ? field.value
                          ? "Yes"
                          : "No"
                        : "Select Status"}
                      <ChevronDown size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 w-full">
                    {[true, false].map((status) => (
                      <DropdownMenuItem
                        key={String(status)}
                        className={`${
                          field.value === status
                            ? "font-semibold text-primary"
                            : ""
                        }`}
                        onClick={() => field.onChange(status)}
                      >
                        {status ? "Yes" : "No"}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {fieldState.error && (
                  <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                    {fieldState.error.message}
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
