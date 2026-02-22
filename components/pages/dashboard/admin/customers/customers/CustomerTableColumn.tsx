/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionDropdown from "@/components/ui/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { readBroadcast } from "@/service/broadcast";
import { TCustomer } from "@/types/customer.types";
import { convertDate } from "@/utills/dateConverter";
import { formatLabel } from "@/utills/formatLabel";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const customerTableColumn = (): ColumnDef<TCustomer>[] => [
  {
    id: "customerId",
    header: "customer Id",
    cell: ({ row }) => {
      const id = row.original?.customerId;
      return <p>{id}</p>;
    },
  },
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />
        </div>
      );
    },
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original?.phone;
      return <p>{phone}</p>;
    },
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original?.gender;
      return <p>{formatLabel(gender)}</p>;
    },
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => {
      const label = row.original?.customerLevel;
      return <Badge variant="default">{label}</Badge>;
    },
  },

  {
    accessorKey: "isMarried",
    header: "Is Married",
    cell: ({ row }) => {
      const married = row.original?.isMarried;
      return (
        <Badge variant={married ? "default" : "secondary"}>
          {married ? "Yes" : "No"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.created_at),
      );

      return (
        <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
          <span className="font-medium">{creationDate}</span>
          <span className="text-muted-foreground">{creationTime}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.id;
      const handleChange = async (
        setLoading: Dispatch<SetStateAction<boolean>>,
      ) => {
        const toastId = toast.loading("updating");
        try {
          const res = await readBroadcast(id.toString());
          if (res?.success) {
            setLoading(false);
            toast.success(res?.message, { id: toastId, duration: 3000 });
          } else {
            setLoading(false);
            toast.error(res?.message, { id: toastId, duration: 3000 });
          }
        } catch (error: any) {
          const errorInfo =
            error?.error ||
            error?.data?.message ||
            error?.data?.errors[0]?.message ||
            "Something went wrong!";
          setLoading(false);
          toast.error(errorInfo, { id: toastId, duration: 3000 });
        }
      };
      return (
        <ActionDropdown
          path={`dashboard/broadcast/${id}`}
          detailsButtonName="View Details"
          buttonName="Mark as Read"
          handleChange={handleChange}
        />
      );
    },
  },
];
