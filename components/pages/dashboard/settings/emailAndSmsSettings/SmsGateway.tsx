"use client";

import { Card } from "@/components/ui/card";
import { InputType } from "@/components/ui/InputType";
import { MessageSquare, TestTube } from "lucide-react";
import { useForm } from "react-hook-form";

type TSMSGatewayFormType = {
  smsProvider: string;
  accountSid: string;
  apiKey: string;
  phoneNumber: string;
};

const SmsGateway = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSMSGatewayFormType>();

  const onSubmit = (data: TSMSGatewayFormType) => {
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
          <div
            className={`p-3 rounded-2xl relative bg-[rgba(42,133,255,0.10)]`}>
            {/* top and borrom border */}
            <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
            <MessageSquare className="text-[#2A85FF]" />
          </div>
          <div>
            <h1 className="text-[#FDFDFD] text-lg">
              SMS Gateway Configuration
            </h1>
            <p className="text-[#B1B1B1] text-sm">SMS provider settings</p>
          </div>
        </div>

        {/* content table */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputType
            name="smsProvider"
            label="SMS Provider"
            placeholder="Enter SMS Provider"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="accountSid"
            label="Account SID/ Username"
            placeholder="Enter account SID"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="apiKey"
            label="Auth Token / API Key"
            placeholder="**********"
            register={register}
            errors={errors}
            required
          />

          <InputType
            name="phoneNumber"
            label="Sender Id /Phone Number"
            placeholder="+8801XXXXXXXXX"
            register={register}
            errors={errors}
            required
          />

          <div className="w-full p-4 bg-[rgba(64,64,64,0.30)] space-y-4 rounded-xl">
            <h1 className="text-lg text-[#FDFDFD] ">SMS Credits</h1>

            <div className="flex justify-between">
              <div className="space-y-1">
                <h1 className="text-4xl font-medium ">2,450</h1>
                <p className="text-sm text-text-secondary ">
                  Credits remaining
                </p>
              </div>
              <div>
                <button className="bg-[rgba(255,107,0,0.20)] py-2 px-4 rounded-full">
                    Buy Credit
                </button>
              </div>
            </div>

          </div>

          <button
            type="submit"
            className="py-2 w-full rounded-xl bg-white/10 flex items-center justify-center gap-2 border border-[#404040]">
            <TestTube size={18} />
            <span>Send Test SMS</span>
          </button>
        </form>
      </div>
    </Card>
  );
};

export default SmsGateway;
