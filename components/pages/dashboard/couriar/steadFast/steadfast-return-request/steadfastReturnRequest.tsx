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

export default function SteadfastReturnRequest() {
  const [form, setForm] = useState({ consignment_id: "", reason: "" });
  function handleChange<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(
      "POST /api/v1/couriers/steadfast/return-request payload:",
      form
    );
  }
  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Return Request</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Return Request</CardTitle>
          <CardDescription>
            POST /api/v1/couriers/steadfast/return-request
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="space-y-2">
              <Label>Consignment ID</Label>
              <Input
                value={form.consignment_id}
                onChange={(e) => handleChange("consignment_id", e.target.value)}
                placeholder="STF-12345"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Reason</Label>
              <Textarea
                value={form.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                placeholder="Reason..."
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
