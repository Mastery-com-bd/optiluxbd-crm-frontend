/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCreateReminderMutation } from "@/redux/features/reminders/reminderApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  title: string;
  note?: string;
  remindAt: string;
}

const CreateReminder = ({ customerId }: { customerId: number }) => {
  const [open, setOpen] = useState(false);
  const [createReminder] = useCreateReminderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const trimmedTitle = data.title.trim();
    const trimmedNote = data.note?.trim() ?? "";

    if (!trimmedTitle) {
      toast.error("Title is required");
      return;
    }
    const remindAtISO = new Date(data.remindAt).toISOString();
    if (new Date(remindAtISO) <= new Date()) {
      toast.error("Reminder time must be in the future");
      return;
    }

    const payload = {
      title: trimmedTitle,
      note: trimmedNote || undefined,
      remindAt: remindAtISO,
      customerId,
    };
    try {
      const res = await createReminder(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Reminder created!");
        reset();
        setOpen(false);
      }
    } catch (error: any) {
      const msg =
        error?.data?.errors?.[0]?.message ||
        error?.data?.message ||
        error?.error ||
        "Failed to create reminder";
      toast.error(msg);
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
        <Button
          variant="ghost"
          className="text-left hover:bg-transparent cursor-pointer"
        >
          Create Reminder
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] w-[90vw] rounded-xl">
        <DialogHeader>
          <DialogTitle>Create Reminder</DialogTitle>
          <DialogDescription>
            Fill out the details below to set a new reminder.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Reminder Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Follow up with Sarah"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          {/* Note */}
          <div className="space-y-2">
            <Label htmlFor="note">Note (optional)</Label>
            <Textarea
              id="note"
              placeholder="Any extra details..."
              rows={3}
              {...register("note")}
            />
          </div>

          {/* Remind At */}
          <div className="space-y-2">
            <Label htmlFor="remindAt">Remind Me At *</Label>
            <Input
              id="remindAt"
              type="datetime-local"
              {...register("remindAt", {
                required: "Please select a date and time",
              })}
              className={errors.remindAt ? "border-red-500" : ""}
            />
            {errors.remindAt && (
              <p className="text-sm text-red-500">{errors.remindAt.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
          >
            {isSubmitting ? "Creating..." : "Create Reminder"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateReminder;
