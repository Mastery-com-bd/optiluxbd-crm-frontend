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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function LocalCreateCourier() {
  const [form, setForm] = useState({
    orderId: "",
    recipientName: "",
    recipientPhone: "",
    recipientAddress: "",
    codAmount: "",
    deliveryCharge: "",
    note: "",
  });

  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("POST /api/v1/couriers payload:", form);
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Courier (Local Only)</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Local Courier</CardTitle>
          <CardDescription>POST /api/v1/couriers</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2 col-span-2">
              <Label>Recipient Name</Label>
              <Input
                value={form.recipientName}
                onChange={(e) => handleChange("recipientName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label>Order ID</Label>
              <Input
                value={form.orderId}
                onChange={(e) => handleChange("orderId", e.target.value)}
                placeholder="ORD-1001"
              />
            </div>
            <div className="space-y-2">
              <Label>Recipient Phone</Label>
              <Input
                value={form.recipientPhone}
                onChange={(e) => handleChange("recipientPhone", e.target.value)}
                placeholder="+8801XXXXXXXXX"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Recipient Address</Label>
              <Textarea
                value={form.recipientAddress}
                onChange={(e) =>
                  handleChange("recipientAddress", e.target.value)
                }
                placeholder="Address..."
              />
            </div>
            <div className="space-y-2">
              <Label>COD Amount</Label>
              <Input
                type="number"
                value={form.codAmount}
                onChange={(e) => handleChange("codAmount", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Delivery Charge</Label>
              <Input
                type="number"
                value={form.deliveryCharge}
                onChange={(e) => handleChange("deliveryCharge", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Note (optional)</Label>
              <Textarea
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
                placeholder="Notes..."
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
