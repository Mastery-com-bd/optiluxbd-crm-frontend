"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function CouriarManagementPage() {
  const endpoints = [
    {
      group: "A. Local Manual Courier Management",
      items: [
        {
          title: "Create Courier (Local Only)",
          path: "/dashboard/couriar/local-create",
          desc: "POST /api/v1/couriers",
          status: "done",
        },
        {
          title: "Create Courier with Steadfast (Manual Input)",
          path: "/dashboard/couriar/local-with-steadfast",
          desc: "POST /api/v1/couriers/with-steadfast",
          status: "done",
        },
        {
          title: "Update Courier Status",
          path: "/dashboard/couriar/local-update-status",
          desc: "PATCH /api/v1/couriers/:id/status",
          status: "404",
        },
        {
          title: "Get All Couriers",
          path: "/dashboard/couriar/local-list",
          desc: "GET /api/v1/couriers?status=&search=&page=&limit=",
          status: "500",
        },
        {
          title: "Get Courier by ID",
          path: "/dashboard/couriar/local-get-by-id",
          desc: "GET /api/v1/couriers/:id",
          status: "done",
        },
      ],
    },
    {
      group: "B. Steadfast API (Manual Submission)",
      items: [
        {
          title: "Create Steadfast Order",
          path: "/dashboard/couriar/steadfast-create-order",
          desc: "POST /api/v1/couriers/steadfast/create-order",
          status: "500",
        },
        {
          title: "Bulk Create Steadfast Orders",
          path: "/dashboard/couriar/steadfast-bulk-order",
          desc: "POST /api/v1/couriers/steadfast/bulk-order",
          isComplete: false,
        },
        {
          title: "Check Status",
          path: "/dashboard/couriar/steadfast-status-invoice",
          desc: "GET /api/v1/couriers/steadfast/status/invoice/:invoice",
          status: "401",
        },
        {
          title: "Get Steadfast Current Balance",
          path: "/dashboard/couriar/steadfast-balance",
          desc: "GET /api/v1/couriers/steadfast/balance",
          isComplete: false,
        },
        {
          title: "Create Return Request",
          path: "/dashboard/couriar/steadfast-return-request",
          desc: "POST /api/v1/couriers/steadfast/return-request",
          isComplete: false,
        },
      ],
    },
  ];

  return (
    <div className="mx-auto md:max-w-5xl p-4 space-y-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Courier Management</h1>
      </div>

      {endpoints.map((group) => (
        <Card key={group.group}>
          <CardHeader>
            <CardTitle>{group.group}</CardTitle>
            <CardDescription>Navigate to the endpoint tools</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {group.items.map((it) => (
              <Link href={it.path} key={it.path} className="block">
                <div className="border rounded-md p-3 hover:bg-muted transition overflow-hidden relative">
                  <div className="font-medium truncate">{it.title}</div>
                  <div className="text-sm text-muted-foreground text-wrap break-all">{it.desc}</div>
                  {it.status && (
                    <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      {it.status}  
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
