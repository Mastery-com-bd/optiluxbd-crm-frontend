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
import { useState } from "react";

export default function SteadfastStatusByInvoice({
  title,
  description,
  endpoint,
}: {
  title: string;
  description: string;
  endpoint: string;
}) {
  const [invoice, setInvoice] = useState("");
  const [resp, setResp] = useState<{
    invoice: string;
    status: string;
    lastUpdate: string;
  } | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(`GET /api/v1/couriers/steadfast/status/invoice/${invoice}`);
    const mock = {
      invoice,
      status: "IN_TRANSIT",
      lastUpdate: "2024-10-05T12:00:00.000Z",
    };
    setResp(mock);
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{description}</CardTitle>
          <CardDescription>
            {endpoint}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <div className="md:col-span-2">
              <Label>Invoice</Label>
              <Input
                value={invoice}
                onChange={(e) => setInvoice(e.target.value)}
                placeholder="INV-1001"
              />
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button type="submit" className="w-full">
                Check
              </Button>
            </div>
          </form>
          {resp && (
            <div className="rounded-md border p-3 text-sm">
              <div>
                <strong>Invoice:</strong> {resp.invoice}
              </div>
              <div>
                <strong>Status:</strong> {resp.status}
              </div>
              <div>
                <strong>Last Update:</strong>{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(resp.lastUpdate))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
