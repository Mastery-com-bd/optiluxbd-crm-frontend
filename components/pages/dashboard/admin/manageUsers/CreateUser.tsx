/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TRegisterForm } from "@/components/auth/Registration";
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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateUser = () => {
  const [open, setOpen] = useState(false);
  const { visible, toggle } = usePasswordToggle();
  const [registration] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>();

  const onSubmit = async (data: TRegisterForm) => {
    if (data?.acceptTerms) {
      delete data.acceptTerms;
    }
    delete data.confirmPassword;
    try {
      const res = await registration(data).unwrap();
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
        reset();
        setOpen(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Damian D."
              className={errors.name ? "border-red-500" : ""}
              {...register("name", { required: "Name is required" })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={errors.email ? "border-red-500" : ""}
              {...register("email", { required: "Email is required" })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              type="phone"
              placeholder="+880185XXXXXXX"
              className={errors.phone ? "border-red-500" : ""}
              {...register("phone", { required: "phone number is required" })}
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={visible ? "text" : "password"}
              placeholder="********"
              className={errors.password ? "border-red-500" : ""}
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                  message:
                    "Use at least 8 characters with letters, numbers, and symbols",
                },
              })}
            />
            <button
              type="button"
              onClick={toggle}
              className="absolute right-2 top-8 text-gray-400 hover:text-gray-600"
            >
              {visible ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
            <p className="text-gray-500 text-sm">
              use min 8 character with letters numbers and symbols
            </p>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
