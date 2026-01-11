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
import { CircleAlert, CircleCheckBig } from "lucide-react";

type TRestoreData = {
  dateAndTime: string;
  size: string;
  type: "auto" | "manual";
  status: "Success" | "Failed";
};

const restoreData: TRestoreData[] = [
  {
    dateAndTime: "2024-12-22 02:00 AM",
    size: "342 MB",
    type: "auto",
    status: "Success",
  },
  {
    dateAndTime: "2024-12-21 11:30 PM",
    size: "1.2 GB",
    type: "manual",
    status: "Success",
  },
  {
    dateAndTime: "2024-12-20 09:15 AM",
    size: "780 MB",
    type: "auto",
    status: "Failed",
  },
  {
    dateAndTime: "2024-12-19 06:45 PM",
    size: "512 MB",
    type: "manual",
    status: "Success",
  },
  {
    dateAndTime: "2024-12-18 01:10 AM",
    size: "2.4 GB",
    type: "auto",
    status: "Success",
  },
  {
    dateAndTime: "2024-12-17 04:55 PM",
    size: "950 MB",
    type: "manual",
    status: "Failed",
  },
];

const BackupHistoryTable = () => {
  const headers = ["Date And Time", "Size", "Type", "Status", "Action"];

  return (
    <Card className="bg-[rgba(255,255,255,0.10)] rounded-2xl relative py-6 px-8 w-full">
      {/* top and bottom border */}
      <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

      <div className="space-y-6 w-full">
        {/* header section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[#FDFDFD] text-lg">Backup History</h1>
            <p className="text-[#B1B1B1] text-sm">Recent backup files</p>
          </div>
          <button className="text-text-secondary cursor-pointer">
            View All
          </button>
        </div>

        {/* table section */}
        <Table >
          {/* Header */}
          <TableHeader className="border-none">
            <TableRow className="border-b border-white/5">
              {headers.map((item, i) => (
                <TableHead key={i} secondClass="bg-transparent border-none">
                  <h1 className="flex items-center justify-center text-text-secondary">
                    {" "}
                    {item}
                  </h1>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Body */}

          <TableBody className="border-none">
            {restoreData.map((item, i) => (
              <TableRow key={i} className="border-none hover:bg-transparent ">
                {/* Trigger */}
                <TableCell className="py-4 border-none">
                  <p className="text-sm text-[#FDFDFD] text-center">
                    {item.dateAndTime}
                  </p>
                </TableCell>

                {/* Email */}
                <TableCell className="py-4 px-4 text-text-secondary border-none text-center">
                  <p className="text-sm text-[#FDFDFD]">{item.size}</p>
                </TableCell>
                <TableCell className="py-4 px-4 border-none flex items-center justify-center">
                  <p
                    className={`py-1 px-2 rounded-full text-center w-full ${
                      item.type === "manual"
                        ? "bg-[rgba(42,133,255,0.20)] text-alternative"
                        : "bg-[rgba(255,157,52,0.20)] text-brand"
                    }`}>
                    {item.type}
                  </p>
                </TableCell>
                <TableCell className="py-4 px-4 text-text-secondary border-none">
                  <div className="flex pl-8 w-full">
                    <p className="text-sm flex items-center gap-2 w-full">
                      <span>
                        {item?.status === "Success" ? (
                          <CircleCheckBig className="text-success" size={18} />
                        ) : (
                          <CircleAlert className="text-red-600" size={18} />
                        )}
                      </span>
                      <span>{item.status}</span>
                    </p>
                  </div>
                </TableCell>

                {/* Template */}
                <TableCell className="py-4 text-text-secondary border-none ">
                  <div className="flex items-center justify-center w-full">
                    {item.status === "Success" && (
                      <button className="py-2 px-4 bg-[rgba(255,107,0,0.20)] rounded-full text-white text-sm cursor-pointer">
                        Restore
                      </button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default BackupHistoryTable;
