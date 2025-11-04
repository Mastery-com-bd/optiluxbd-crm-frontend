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

type TChangePassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePassword = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const { visible, toggle } = usePasswordToggle();
  const [updatePassword] = useUpdatePasswordMutation();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TChangePassword>();
  const passwordValue = useWatch({ control, name: "newPassword" });

  const onSubmit = async (data: TChangePassword) => {
    try {
      const res = await updatePassword(data).unwrap();
      if (res?.data) {
        toast.success("successfully logged in", {
          duration: 3000,
        });
        reset();
        setOpen(false);
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
            className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100 mt-4"
          >
            <div className="space-y-2 relative">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type={visible ? "text" : "password"}
                placeholder="********"
                className={errors.currentPassword ? "border-red-500" : ""}
                {...register("currentPassword", {
                  required: "current password is required",
                })}
              />
              <button
                type="button"
                onClick={toggle}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                {visible ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <div className="space-y-2 relative">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={visible ? "text" : "password"}
                placeholder="********"
                className={errors.newPassword ? "border-red-500" : ""}
                {...register("newPassword", {
                  required: "new password is required",
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    message:
                      "Use at least 8 characters with letters, numbers, and symbols",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
              >
                {open ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <p className="text-gray-500 text-sm">
                use min 8 character with letters numbers and symbols
              </p>
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
