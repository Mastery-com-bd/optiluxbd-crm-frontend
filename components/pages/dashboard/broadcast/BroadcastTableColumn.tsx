/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ActionDropdown from "@/components/ui/ActionDropdown";
import { Badge } from "@/components/ui/badge";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { readBroadcast } from "@/service/broadcast";
import { TBroadcast } from "@/types/broadcast.types";
import { convertDate } from "@/utills/dateConverter";
import { ColumnDef } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const broadcastTableColumn = (): ColumnDef<TBroadcast>[] => [
  {
    id: "title",
    header: "Title",
    cell: ({ row }) => {
      const name = row.original?.title;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />
        </div>
      );
    },
  },
  {
    id: "message",
    header: "Message",
    cell: ({ row }) => {
      const name = row.original?.message;
      const trimedName = name.length > 25 ? name.slice(0, 25) + "..." : name;
      return <TooltipComponent name={name} trimedName={trimedName} />;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original?.type;
      return (
        <p>{type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase()}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.isActive;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => {
      const createdBy = row.original?.createdBy;
      return <p>{createdBy}</p>;
    },
  },
  {
    accessorKey: "isRead",
    header: "Is Read",
    cell: ({ row }) => {
      const isRead = row.original?.isRead;
      return (
        <Badge variant={isRead ? "default" : "secondary"}>
          {isRead ? "Yes" : "No"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "readAt",
    header: "Read At",
    cell: ({ row }) => {
      const readAt = row.original?.readAt;
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.createdAt),
      );
      return (
        <>
          {readAt && (
            <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
              <span className="font-medium">{creationDate}</span>
              <span className="text-muted-foreground">{creationTime}</span>
            </div>
          )}
        </>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.createdAt),
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
    accessorKey: "expiresAt",
    header: "Expires At",
    cell: ({ row }) => {
      const expiresAt = row.original?.expiresAt;
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.expiresAt as string),
      );
      return (
        <>
          {expiresAt && (
            <div className="flex flex-col text-xs leading-tight whitespace-nowrap">
              <span className="font-medium">{creationDate}</span>
              <span className="text-muted-foreground">{creationTime}</span>
            </div>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original.id;
      const isRead = row.original?.isRead;
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
          isConfirmed={isRead}
        />
      );
    },
  },
];
