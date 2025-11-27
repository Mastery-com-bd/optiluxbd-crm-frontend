"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllCouriarQuery } from "@/redux/features/couriar/couriarApi";
import { EllipsisVertical } from "lucide-react";
import { useState } from "react";

/* const mockCouriers = [
  {
    id: "c-1001",
    orderId: "ORD-1001",
    recipientName: "Ariana",
    status: "PENDING",
    createdAt: "2024-10-02T09:00:00.000Z",
  },
  {
    id: "c-1002",
    orderId: "ORD-1002",
    recipientName: "Basit",
    status: "DELIVERED",
    createdAt: "2024-10-03T09:00:00.000Z",
  },
  {
    id: "c-1003",
    orderId: "ORD-1003",
    recipientName: "Chowdhury",
    status: "IN_TRANSIT",
    createdAt: "2024-10-04T09:00:00.000Z",
  },
]; */

interface CourierDetail {
  id: string;
  orderId: string;
  recipientName: string;
  status: string;
  createdAt: string;
}

export default function LocalListCouriers() {
  const [status, setStatus] = useState<string>("PENDING");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("1");
  const [limit, setLimit] = useState("10");
  const query = {
    status: status,
    search: search,
    page,
    limit,
  };

  // const [trigger, { data: detail, isFetching }] = useGetAllCouriarQuery();
  const {data, isLoading} = useGetAllCouriarQuery(query);

  console.log("Courier Detail", data);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // await trigger(query); // manually trigger fetch
  }

  if (isLoading) return <div>Loading...</div>;    

  return (
    <div className="mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Get All Couriers</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>List</CardTitle>
          <CardDescription>GET /api/v1/couriers</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-4 gap-3"
          >
            <div className="md:col-span-1 space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="IN_TRANSIT">IN_TRANSIT</SelectItem>
                  <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                  <SelectItem value="RETURNED">RETURNED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label>Search</Label>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="id, orderId, recipientName..."
              />
            </div>
            <div className="md:col-span-1 space-y-2">
              <Label>Page</Label>
              <Input
                type="number"
                value={page}
                onChange={(e) => setPage(e.target.value)}
              />
            </div>
            <div className="md:col-span-1 space-y-2">
              <Label>Limit</Label>
              <Input
                type="number"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            <div className="md:col-span-4 flex justify-end">
              <Button type="submit">Fetch</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Table className="mt-20 border  border-gray-300">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-center pr-2">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((c: CourierDetail) => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.orderId}</TableCell>
              <TableCell>{c.recipientName}</TableCell>
              <TableCell>{c.status}</TableCell>
              <TableCell>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                }).format(new Date(c.createdAt))}
              </TableCell>
              <TableCell className="flex flex-end">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    className="w-full flex justify-end"
                  >
                    <EllipsisVertical className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Demo 1</DropdownMenuItem>
                    <DropdownMenuItem>Demo 2</DropdownMenuItem>
                    <DropdownMenuItem>Demo 3</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
