/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAutoDistributeCustomerToAgentMutation } from "@/redux/features/leads/teamLeaderLeadsApi";
import { SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AutoDistributeModal = ({
  selectedWorkers,
}: {
  selectedWorkers: number | null;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [autoDistributeCustomer] = useAutoDistributeCustomerToAgentMutation();

  const handleConfirmAutoDistribute = async () => {
    setModalOpen(false);
    const toastId = toast.loading("customers auto distributing to agents");
    try {
      const res = await autoDistributeCustomer(undefined).unwrap();
      toast.dismiss(toastId);
      if (res?.success) {
        toast.success(res?.message, { duration: 3000 });
      }
    } catch (error: any) {
      toast.dismiss(toastId);
      const errorInfo =
        error?.data?.message ||
        error?.data?.error ||
        error?.error ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Agents</CardTitle>

          {/* Modal Trigger */}
          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button disabled={!!selectedWorkers}>
                <SendIcon className="mr-2 h-4 w-4" /> Auto Distribute Customers
              </Button>
            </DialogTrigger>

            {/* Modal Content */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
              </DialogHeader>

              <p className="text-sm text-gray-600">
                Auto distributing customers will assign them evenly to all
                selected agents. Do you want to continue?
              </p>

              <DialogFooter>
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleConfirmAutoDistribute}
                >
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
    </Card>
  );
};

export default AutoDistributeModal;
