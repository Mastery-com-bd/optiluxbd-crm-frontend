"use client";

import { Card } from "@/components/ui/card";
import { Mail, TestTube } from "lucide-react";
import { useForm } from "react-hook-form";
import { InputType } from '@/components/ui/InputType';

type SMTPFormValues = {
  host: string;
  port: string;
  encryption: string;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
};

const SmtpConfigura = () => {
     const {
       register,
       handleSubmit,
       formState: { errors },
     } = useForm<SMTPFormValues>();

     const onSubmit = (data: SMTPFormValues) => {
       console.log(data);
     };

  return (
    <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
      {/* top and bottom border */}
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

      <div className="space-y-6">
        {/* header */}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}>
            {/* top and borrom border */}
            <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
            <Mail className="text-[#FF6B00]" />
          </div>
          <div>
            <h1 className="text-[#FDFDFD] text-lg">SMTP Configuration</h1>
            <p className="text-[#B1B1B1] text-sm">Email server settings</p>
          </div>
        </div>

        {/* content table */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputType
            name="host"
            label="SMTP Host"
            placeholder="smtp.gmail.com"
            register={register}
            errors={errors}
            required
          />

          <div className="flex items-center gap-6">
            <InputType
              name="port"
              label="Port"
              placeholder="587"
              register={register}
              errors={errors}
              required
            />

            <InputType
              name="encryption"
              label="Encryption"
              placeholder="TLS / SSL"
              register={register}
              errors={errors}
              required
            />
          </div>

          <InputType
            name="username"
            label="Username"
            placeholder="username"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="password"
            label="Password"
            type="password"
            placeholder="********"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="fromEmail"
            label="From Email"
            type="email"
            placeholder="something@gmail.com"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="fromName"
            label="From Name"
            placeholder="Company Name"
            register={register}
            errors={errors}
            required
          />

          <button
            type="submit"
            className="py-2 w-full rounded-xl bg-white/10 flex items-center justify-center gap-2 border border-[#404040]">
            <TestTube size={18}/>
            <span>Test SMTP Connection</span>
          </button>
        </form>
      </div>
    </Card>
  );
};

export default SmtpConfigura;
