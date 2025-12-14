"use client";

import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TStatus = "Delivered" | "Processing" | "Cancelled";

type TOrderData = {
  orderId: string;
  date: string;
  amount: number;
  products: string;
  status: TStatus;
};

const OrderHistory = () => {
  const keys = ["Order ID", "Date", "Amount", "Products", "Status"];
  const orderdata: TOrderData[] = [
    {
      orderId: "#ORD-38338",
      date: "Nov 26, 2025",
      amount: 289,
      products: "3",
      status: "Delivered",
    },
    {
      orderId: "#ORD-38339",
      date: "Nov 27, 2025",
      amount: 154,
      products: "1",
      status: "Processing",
    },
    {
      orderId: "#ORD-38340",
      date: "Nov 28, 2025",
      amount: 520,
      products: "5",
      status: "Delivered",
    },
    {
      orderId: "#ORD-38341",
      date: "Nov 29, 2025",
      amount: 89,
      products: "2",
      status: "Cancelled",
    },
    {
      orderId: "#ORD-38342",
      date: "Nov 30, 2025",
      amount: 760,
      products: "6",
      status: "Delivered",
    },
    {
      orderId: "#ORD-38343",
      date: "Dec 01, 2025",
      amount: 245,
      products: "3",
      status: "Processing",
    },
    {
      orderId: "#ORD-38344",
      date: "Dec 02, 2025",
      amount: 410,
      products: "4",
      status: "Delivered",
    },
    {
      orderId: "#ORD-38345",
      date: "Dec 03, 2025",
      amount: 132,
      products: "1",
      status: "Cancelled",
    },
    {
      orderId: "#ORD-38346",
      date: "Dec 04, 2025",
      amount: 980,
      products: "8",
      status: "Delivered",
    },
    {
      orderId: "#ORD-38347",
      date: "Dec 05, 2025",
      amount: 305,
      products: "2",
      status: "Processing",
    },
  ];

  function getStatusClasses(status: TStatus) {
    switch (status) {
      case "Delivered":
        return {
          bg: "bg-[rgba(0,201,80,0.20)]",
          border: "border-[rgba(0,201,80,0.30)]",
          text: "text-[#05DF72]",
        };

      case "Processing":
        return {
          bg: "bg-[rgba(43,127,255,0.20)]",
          border: "border-[rgba(43,127,255,0.30)]",
          text: "text-[#51A2FF]",
        };

      case "Cancelled":
        return {
          bg: "bg-[rgba(255,59,48,0.20)]",
          border: "border-[rgba(255,59,48,0.30)]",
          text: "text-[#FF3B30]",
        };

      default:
        return {
          bg: "",
          border: "",
          text: "",
        };
    }
  }

  return (
    <Card className="bg-white/5 px-6 py-4 w-full rounded-4xl gap-4">
      <h1 className="font-medium text-xl">
        Order History <span className="text-lg">({orderdata.length})</span>
      </h1>
      <div className="overflow-x-auto w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {keys.map((label, ind) => (
                <TableHead
                  first={ind === 0}
                  last={ind === keys.length - 1}
                  key={label}
                  className="text-left text-xs font-semibold uppercase text-muted-foreground"
                >
                  {label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderdata?.map((item: TOrderData, index) => {
              const { bg, border, text } = getStatusClasses(item.status);
              return (
                <TableRow
                  key={index}
                  className="border-muted hover:bg-muted/50 transition-colors"
                >
                  {["orderId", "date", "amount", "products"].map((key) => {
                    const value = item[key as keyof TOrderData];
                    return (
                      <TableCell key={key} className="px-3 py-1 text-center">
                        {value}
                      </TableCell>
                    );
                  })}
                  <TableCell className="px-3 py-2">
                    {" "}
                    <div
                      className={`px-2 py-1 text-sm text-center rounded-3xl border ${bg} ${border} ${text}`}
                    >
                      {item.status}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default OrderHistory;
