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

export default function SteadfastCreateOrder() {
  const [form, setForm] = useState({
    invoice: "",
    recipient_name: "",
    recipient_phone: "",
    recipient_address: "",
    cod_amount: "",
    note: "",
  });
  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("POST /api/v1/couriers/steadfast/create-order payload:", form);
  }
  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Create Steadfast Order</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Steadfast Order</CardTitle>
          <CardDescription>
            POST /api/v1/couriers/steadfast/create-order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-2 space-y-2">
              <Label>Recipient Name</Label>
              <Input
                value={form.recipient_name}
                onChange={(e) => handleChange("recipient_name", e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label>Invoice</Label>
              <Input
                value={form.invoice}
                onChange={(e) => handleChange("invoice", e.target.value)}
                placeholder="INV-1001"
              />
            </div>
            <div className="space-y-2">
              <Label>Recipient Phone</Label>
              <Input
                value={form.recipient_phone}
                onChange={(e) =>
                  handleChange("recipient_phone", e.target.value)
                }
                placeholder="+8801XXXXXXXXX"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Recipient Address</Label>
              <Textarea
                value={form.recipient_address}
                onChange={(e) =>
                  handleChange("recipient_address", e.target.value)
                }
                placeholder="Address..."
              />
            </div>
            <div className="space-y-2">
              <Label>COD Amount</Label>
              <Input
                type="number"
                value={form.cod_amount}
                onChange={(e) => handleChange("cod_amount", e.target.value)}
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
