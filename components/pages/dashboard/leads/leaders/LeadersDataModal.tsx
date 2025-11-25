/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAutoDistributeCustomerToAgentMutation,
  useCustomerDistributionToAgentMutation,
} from "@/redux/features/leads/teamLeaderLeadsApi";
import { useState } from "react";
import { toast } from "sonner";

type Customer = {
  id: string;
  email: string;
  customerId: string;
  status: "ASSIGNED" | "DRAFT";
};

type Props = {
  open: boolean;
  onClose: () => void;
  assigneeIds: number;
  customers: Customer[];
};

const LeadersDataModal = ({ open, onClose, assigneeIds, customers }: Props) => {
  const [count, setCount] = useState(0);
  const [autoDistribute, setAutoDistribute] = useState(false);
  const totalCustomers = customers.length;
  const [distributeCustomer] = useCustomerDistributionToAgentMutation();
  const [autoDistributeCustomer] = useAutoDistributeCustomerToAgentMutation();

  const handleAssign = async () => {
    let payload: any = {};
    let loadingMessage = "";

    if (autoDistribute) {
      payload = undefined;
      loadingMessage = "Auto distributing customers to all agents...";
    } else {
      if (count > totalCustomers) {
        toast.error(
          `You cannot assign ${count} leads. Only ${totalCustomers} leads are available.`,
          { duration: 3000 }
        );
        return;
      }
      payload = {
        agentId: assigneeIds,
        customerIds: customers.slice(0, count).map((c) => c.id),
      };
      loadingMessage = "Distributing customers to agent...";
    }

    const toastId = toast.loading(loadingMessage);
    try {
      const res = autoDistribute
        ? await autoDistributeCustomer(payload).unwrap()
        : await distributeCustomer(payload).unwrap();

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
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            Assign Leads
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Input
              type="number"
              placeholder="Count"
              disabled={autoDistribute}
              className="w-28"
              value={count}
              max={customers.length}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <Select
              onValueChange={(v) => setCount(Number(v))}
              disabled={autoDistribute}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Quick select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={`${Math.floor(customers.length / 3)}`}>
                  30%
                </SelectItem>
                <SelectItem value={`${Math.floor(customers.length / 2)}`}>
                  50%
                </SelectItem>
                <SelectItem value={`${Math.floor(customers.length / 4)}`}>
                  80%
                </SelectItem>
                <SelectItem value={`${customers.length}`}>100%</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-auto flex items-center gap-2">
              <Checkbox
                checked={autoDistribute}
                onCheckedChange={(checked) => setAutoDistribute(!!checked)}
              />
              <span className="text-sm text-muted-foreground">
                Auto Distribute Evenly
              </span>
            </div>
          </div>
          <Card>
            <CardContent className="pt-4">
              <div className="text-sm font-medium mb-2">Preview</div>

              <div className="text-xs text-muted-foreground mt-2">
                Total to assign: {customers?.length} (available{" "}
                {customers?.length})
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="cursor-pointer"
          >
            Cancel
          </Button>
          <Button onClick={() => handleAssign()} className="cursor-pointer">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadersDataModal;
