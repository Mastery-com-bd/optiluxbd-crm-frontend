/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Controller, useForm, useWatch } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { decodeToken } from "@/utills/decodeToken";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Eye, EyeOff } from "lucide-react";

type TRegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms?: boolean;
};

const Registration = () => {
  const router = useRouter();
  const [registration] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const { visible, toggle } = usePasswordToggle();
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterForm>();
  const passwordValue = useWatch({ control, name: "password" });

  const onSubmit = async (data: TRegisterForm) => {
    if (data?.acceptTerms) {
      delete data.acceptTerms;
    }
    try {
      const res = await registration(data).unwrap();
      const user = decodeToken(res?.data);
      dispatch(setUser({ user, token: res?.data }));
      reset();
      router.push("/");
      toast.success("successfully registered", { duration: 3000 });
    } catch (error: any) {
      const errorInfo =
        error?.data?.errorSource[1]?.message ||
        error?.data?.message ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <div className="bg-[#ffffff] p-8 lg:w-[30vw] space-y-6 rounded-xl">
      <div className="w-[30vw] lg:w-[8vw] mx-auto">
        <Image
          src={`https://optilux.com.bd/OptiluxImage/OptiluxBD-Png%20(logo).png`}
          height={500}
          width={500}
          alt="brand logo"
        />
      </div>
      <p className="flex items-center justify-center text-center text-sm px-6 lg:px-16 text-[#a2b1ca]">
        Lets get you started in. Create your account by entering your details
        below
      </p>
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
        <Controller
          name="acceptTerms"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="acceptTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <Label htmlFor="acceptTerms" className="text-sm text-gray-600">
                  Agree to the Terms and Policy
                </Label>
              </div>

              {errors.acceptTerms && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  ⚠️ Please accept the terms to continue
                </p>
              )}
            </div>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 hover:bg-[#ffc500] text-white cursor-pointer"
        >
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className=" flex justify-center gap-1 text-gray-500 text-sm">
        Already have an account ?
        <Link
          className="border-b border-[#ffc500] text-yellow-600"
          href="/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Registration;
