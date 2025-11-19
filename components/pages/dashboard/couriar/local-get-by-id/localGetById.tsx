"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const mockDetail = {
  id: "c-1001",
  orderId: "ORD-1001",
  recipientName: "Ariana",
  recipientPhone: "+8801XXXXXXXXX",
  recipientAddress: "Dhaka, Bangladesh",
  status: "PENDING",
  codAmount: 1200,
  deliveryCharge: 80,
  createdAt: "2024-10-02T09:00:00.000Z",
};

export default function LocalGetById() {
  const [id, setId] = useState("");
  const [data, setData] = useState<typeof mockDetail | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(`GET /api/v1/couriers/${id}`);
    setData(mockDetail);
  }

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Get Courier by ID</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Detail</CardTitle>
          <CardDescription>GET /api/v1/couriers/:id</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2 space-y-2">
              <Label>Courier ID</Label>
              <Input value={id} onChange={(e)=>setId(e.target.value)} placeholder="c-1001" />
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button type="submit" className="w-full">Fetch</Button>
            </div>
          </form>
          {data && (
            <div className="rounded-md border p-3 text-sm">
              <div><strong>ID:</strong> {data.id}</div>
              <div><strong>Order:</strong> {data.orderId}</div>
              <div><strong>Recipient:</strong> {data.recipientName} ({data.recipientPhone})</div>
              <div><strong>Address:</strong> {data.recipientAddress}</div>
              <div><strong>Status:</strong> {data.status}</div>
              <div><strong>COD:</strong> BDT {data.codAmount}</div>
              <div><strong>Charge:</strong> BDT {data.deliveryCharge}</div>
              <div><strong>Created:</strong> {new Intl.DateTimeFormat("en-US",{year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(data.createdAt))}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}