"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function LocalUpdateCourierStatus() {
  const [id, setId] = useState("");
  const [status, setStatus] = useState<string>("PENDING");
  const [consignmentId, setConsignmentId] = useState("");
  const [trackingCode, setTrackingCode] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      status,
      consignmentId: consignmentId || undefined,
      trackingCode: trackingCode || undefined,
    };
    console.log(`PATCH /api/v1/couriers/${id}/status payload:`, payload);
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Update Courier Status</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Status Update</CardTitle>
          <CardDescription>PATCH /api/v1/couriers/:id/status</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label>Courier ID</Label>
              <Input
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="UUID or numeric ID"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="IN_TRANSIT">IN_TRANSIT</SelectItem>
                  <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                  <SelectItem value="RETURNED">RETURNED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Consignment ID (optional)</Label>
              <Input
                value={consignmentId}
                onChange={(e) => setConsignmentId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Tracking Code (optional)</Label>
              <Input
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
              />
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
