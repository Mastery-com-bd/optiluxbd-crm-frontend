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

type Props = {
  open: boolean;
  onClose: () => void;
  scope: "admin" | "manager" | "team_leader";
  assignerId: string;
  assigneeIds: string[];
  available: number;
};

export default function AssignModal({ open, onClose, assigneeIds }: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Assign Leads</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Input type="number" placeholder="Count" className="w-28" />
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Quick select…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="demo1">demo 1</SelectItem>
                <SelectItem value="demo2">demo 2</SelectItem>
                <SelectItem value="demo3">demo 3</SelectItem>
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
              <ul className="text-sm">
                {assigneeIds.map((id, i) => (
                  <li key={i}>Assignee 99</li>
                ))}
              </ul>
              <div className="text-xs text-muted-foreground mt-2">
                Total to assign: 99 (available 99)
              </div>
            </CardContent>
          </Card>
          Start Message
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
