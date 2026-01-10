"use client"

import { Card } from "@/components/ui/card";
import { InputType } from "@/components/ui/InputType";
import { Clock } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import LargeYellowSvg from "@/components/svgIcon/LargeYellowSvg";
import SubmitButton from "@/components/ui/SubmitButton";

type TBackupSchedule = {
  frequency: string;
  backupTime: string;
  retentionPeriod: string;
  autoBackup: false;
  cloudSync: false;
  emailNotification: false;
};

const BackupAndSchedule = () => {
     const {
       register,
       handleSubmit,
       control,
       formState: { errors, isSubmitting },
     } = useForm<TBackupSchedule>({
       defaultValues: {
         frequency: "",
         backupTime: "",
         retentionPeriod: "",
         autoBackup: false,
         cloudSync: false,
         emailNotification: false,
       },
     });
    
         const onSubmit = (data: TBackupSchedule) => {
           console.log(data);
         };


    return (
      <Card className="bg-[rgba(255,255,255,0.10)] rounded-2xl relative py-4 px-6">
        {/* top and bottom border */}
        <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

        <div className="space-y-6">
          {/* header */}
          <div className="flex items-center gap-4">
            <div
              className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}>
              {/* top and borrom border */}
              <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
              <Clock className="text-[#FF6B00]" />
            </div>

            <div>
              <h1 className="text-[#FDFDFD] text-lg">Backup Schedule</h1>
              <p className="text-[#B1B1B1] text-sm">
                Automated backup settings
              </p>
            </div>
          </div>

          {/* content table */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Frequency */}
            <InputType
              name="frequency"
              label="Frequency"
              placeholder="Set frequency"
              register={register}
              errors={errors}
              required
            />

            {/* Backup Time */}
            <InputType
              name="backupTime"
              label="Backup Time"
              type="datetime-local"
              register={register}
              errors={errors}
              required
            />

            {/* Retention Period */}
            <InputType
              name="retentionPeriod"
              label="Retention Period"
              placeholder="Enter retention period"
              register={register}
              errors={errors}
              required
            />

            {/* Switches */}
            <div className="space-y-4 bg-[rgba(64,64,64,0.30)] rounded-2xl p-4">
              <Controller
                name="autoBackup"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Auto Backup</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[rgba(0,166,86,0.20)] h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
                    />
                  </div>
                )}
              />

              <Controller
                name="cloudSync"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">Cloud Sync</span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[rgba(0,166,86,0.20)] h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
                    />
                  </div>
                )}
              />

              <Controller
                name="emailNotification"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <span className="text-text-secondary">
                      Email Notification
                    </span>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-[rgba(0,166,86,0.20)] h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
                    />
                  </div>
                )}
              />
            </div>

            {/* Submit */}
            <SubmitButton title="Update Schedule" isSubmitting={isSubmitting}/>
          </form>
        </div>
      </Card>
    );
};

export default BackupAndSchedule;