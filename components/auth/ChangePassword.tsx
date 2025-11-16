/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdatePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordRules } from "@/components/auth/Registration";

const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
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
  })
  .refine((data) => data.currentPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TChangePassword = z.infer<typeof changePasswordSchema>;

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { visible, toggle } = usePasswordToggle();
  const [touched, setTouched] = useState(false);
  const [passwordtext, setPasswordText] = useState("");
  const [updatePassword] = useUpdatePasswordMutation();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TChangePassword>({
    resolver: zodResolver(changePasswordSchema),
  });
  const passwordValue = useWatch({ control, name: "newPassword" });

  const onSubmit = async (data: TChangePassword) => {
    const { confirmPassword, ...remaining } = data;
    try {
      const res = await updatePassword(remaining).unwrap();
      if (res?.data) {
        toast.success("successfully logged in", {
          duration: 3000,
        });
        reset();
        setIsOpen(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.data?.message || error?.error || "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <div>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-sm font-medium text-yellow-600 hover:text-yellow-700 cursor-pointer"
        >
          Change Password
        </button>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-100 mt-4"
          >
            <div className="space-y-2 relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type={open ? "text" : "password"}
                placeholder="********"
                className={errors.currentPassword ? "border-red-500" : ""}
                {...register("currentPassword", {
                  required: "current password is required",
                })}
              />
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                {open ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="space-y-2 relative">
              <Label
                htmlFor="newPassword"
                className="text-gray-700 dark:text-gray-200"
              >
                New Password
              </Label>

              {/* Password input */}
              <Input
                id="newPassword"
                type={visible ? "text" : "password"}
                placeholder="********"
                className={`${
                  errors.newPassword
                    ? "border-red-500 dark:border-red-400"
                    : "border-gray-300 dark:border-gray-700"
                } bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200`}
                {...register("newPassword", {
                  required: "New password is required",
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                className={errors.confirmPassword ? "border-red-500 " : ""}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                })}
              />
            </div>

            <div className="flex justify-between ">
              <Button
                type="button"
                disabled={isSubmitting}
                variant="secondary"
                onClick={() => setIsOpen(false)}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Update Password
              </Button>
            </div>
          </motion.div>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
