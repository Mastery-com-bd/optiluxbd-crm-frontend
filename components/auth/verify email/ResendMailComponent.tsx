"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MoveRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useResendVerificationEmailMutation } from "@/redux/features/auth/authApi";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SubmissionSuccess from "../register/SubmissionSuccess";
import FaildComponent from "../register/FaildComponent";
import LargeYellowSvg from "@/components/svgIcon/LargeYellowSvg";

const resendMailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export type TVerifyEmail = z.infer<typeof resendMailSchema>;

const ResendMailComponent = () => {
  const [resendEmail] = useResendVerificationEmailMutation();
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TVerifyEmail>({
    resolver: zodResolver(resendMailSchema),
  });

  const onSubmit = async (data: TVerifyEmail) => {
    try {
      const res = await resendEmail(data).unwrap();
      if (res?.message) {
        toast.success(res?.message, { duration: 3000 });
        setOpen(true);
        reset();
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
    <>
      {open ? (
        <SubmissionSuccess
          title="Check Your Email Inbox"
          content="we have sent a verification link to your email Please check your inbox "
          path="/verify-email"
          buttonName="send again"
          buttonTitle="Didn`t get any Email ?"
        />
      ) : (
        <FaildComponent
          title="Opps An Error Occured"
          content="it means your email is not verified yet to login. You can resend your email to get the verification link">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              className={`${
                errors.email && "border-red-500 dark:border-red-400"
              } bg-transparent text-[#514D6A] placeholder:text-[#514D6A] placeholder:text-sm outline-none border border-[#2C293D] py-2 px-5 rounded-full w-full`}
              {...register("email", { required: "Email is required" })}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden w-full text-white">
              {/* top and bottom line */}
              <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/20 rounded-tl-xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/20 rounded-br-xl pointer-events-none" />

              {/* Button text */}
              <p className="flex items-center gap-2">
                <span className="text-sm">Submit</span>
                <MoveRight />
              </p>

              <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
                <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
              </div>
              <div className="pointer-events-none">
                <LargeYellowSvg />
              </div>
            </button>
          </form>
        </FaildComponent>
      )}
    </>
  );
};

export default ResendMailComponent;
