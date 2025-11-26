"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function SteadfastBulkOrder() {
  const [jsonText, setJsonText] = useState(`{
  "data": [
    { "invoice": "INV-1001", "recipient_name": "A", "recipient_phone": "+8801...", "recipient_address": "Dhaka", "cod_amount": "500" },
    { "invoice": "INV-1002", "recipient_name": "B", "recipient_phone": "+8801...", "recipient_address": "Chattogram", "cod_amount": "800" }
  ]
}`);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const parsed = JSON.parse(jsonText);
      console.log(
        "POST /api/v1/couriers/steadfast/bulk-order payload:",
        parsed
      );
    } catch {
      alert("Invalid JSON.");
    }
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Bulk Create Steadfast Orders</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Bulk Orders</CardTitle>
          <CardDescription>
            POST /api/v1/couriers/steadfast/bulk-order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <Label>JSON Payload</Label>
              <Textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={10}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
