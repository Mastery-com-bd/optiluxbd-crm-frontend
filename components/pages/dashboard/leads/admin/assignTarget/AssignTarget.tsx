/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TTeam } from "@/types/teamleader.types";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { useAssignTeamtargetMutation } from "@/redux/features/leads/adminLeedsApi";
import { toast } from "sonner";

const targetFormSchema = z.object({
  targetDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((val) => new Date(val).toISOString().split("T")[0]),
  totalTarget: z
    .number({ message: "Total Target must be a number" })
    .min(1, "Total Target must be at least 1"),
});

type TargetFormValues = z.infer<typeof targetFormSchema>;
const AssignTarget = ({
  setSelectedTeam,
  selectedTeam,
}: {
  setSelectedTeam: Dispatch<SetStateAction<TTeam | null>>;
  selectedTeam: TTeam | null;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TargetFormValues>({
    resolver: zodResolver(targetFormSchema),
  });
  const [assignTarget] = useAssignTeamtargetMutation();

  const onSubmit = async (data: TargetFormValues) => {
    const paylaod = {
      ...data,
      totalTarget: Number(data.totalTarget),
      leaderId: selectedTeam?.leader?.id,
    };

    const toastId = toast.loading("assigning agent to team", {
      duration: 3000,
    });
    try {
      const res = await assignTarget(paylaod).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        setOpenModal(false);
        setSelectedTeam(null);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.errors[0]?.message ||
        error?.data?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <Dialog
      open={openModal}
      onOpenChange={(isOpen) => {
        setOpenModal(isOpen);

        if (!isOpen) {
          reset();
          setSelectedTeam(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          disabled={!selectedTeam}
          onClick={() => setOpenModal(true)}
          className="cursor-pointer"
        >
          Assign Target
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg space-y-6">
        <DialogHeader>
          <DialogTitle className="mx-auto">
            Set Target for today to {selectedTeam?.leader?.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <Input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                {...register("targetDate")}
              />
              {errors.targetDate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.targetDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Set Number</Label>
              <Input
                type="number"
                {...register("totalTarget", { valueAsNumber: true })}
                placeholder="Enter total target"
              />
              {errors.totalTarget && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.totalTarget.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-2">
            <Button
              onClick={() => {
                setOpenModal(false);
                setSelectedTeam(null);
                reset();
              }}
              variant="outline"
              type="button"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              Assign target
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AssignTarget;
