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
import { useState } from "react";

type Address = {
  id: number;
  name: string;
  city: string;
  created_at: string;
  customer_id: number;
  geo_lat: number | null;
  geo_lng: number | null;
  line1: string;
  line2: string | null;
  postcode: string;
  updated_at: string;
  user_id: number | null;
  zone_id: number | null;
};
type Customer = {
  id: string;
  phone: string;
  email: string;
  customerId: string;
  addresses: Address[];
  assignedAt: string;
  cancelCount: number;
  lastContactAt: string;
  status: "ASSIGNED" | "DRAFT";
};

type Props = {
  open: boolean;
  onClose: () => void;
  scope: "admin" | "manager" | "team_leader";
  assigneeIds: number;
  customers: Customer[];
};

export default function AssignModal({
  open,
  onClose,
  assigneeIds,
  customers,
}: Props) {
  const [count, setCount] = useState(0);
  console.log(customers);

  const handleAssign = () => {
    const customerIds = customers.map((customer) => customer.id);
    const payload = {
      agentId: assigneeIds,
      customerIds,
    };
    console.log("Final Submit Data:", payload);
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
              className="w-28"
              value={count}
              max={customers.length}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <Select onValueChange={(v) => setCount(Number(v))}>
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
              <Checkbox />
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
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => handleAssign()}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
