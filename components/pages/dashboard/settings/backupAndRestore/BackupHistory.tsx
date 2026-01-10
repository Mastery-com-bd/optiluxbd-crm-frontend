"use client"

import { Card } from "@/components/ui/card";
import SubmitButton from "@/components/ui/SubmitButton";
import { Download, Upload } from "lucide-react";
import BackupHistoryTable from "./BackupHistoryTable";

const backupHistoryData = [
  {
    title: "Create Backup",
    description: "Create a manual backup of the database",
    icon: Download,
    iconColor: "text-success",
    iconBgColor: "bg-[rgba(0,166,86,0.20)]",
    buttonName: "Backup Now",
    buttonIcon: Download,
  },
  {
    title: "Upload Backup",
    description: "Upload and restore from backup file",
    icon: Upload,
    iconColor: "text-[#2A85FF]",
    iconBgColor: "bg-[rgba(42,133,255,0.20)]",
    buttonName: "Choose File",
    buttonIcon: Upload,
  },
];

const BackupHistory = () => {
    return (
      <div className="bg-[rgba(255,255,255,0.10)] rounded-2xl relative p-6 w-full">
        {/* top and bottom border */}
        <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

        <div className="space-y-6">
          {/* header */}
          <h1 className="text-[#FDFDFD] text-lg">Manual Operations</h1>


        {/* manual operation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {backupHistoryData.map((data, i) => (
              <Card
                key={i}
                className="bg-[rgba(255,255,255,0.10)] rounded-2xl relative py-6 px-8 w-full">
                {/* top and bottom border */}
                <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

                <div className="space-y-3 flex flex-col items-start gap-2">
                  <div
                    className={`p-3 rounded-2xl relative flex items-center ${data.iconBgColor} ${data.iconColor}`}>
                    {/* top and borrom border */}
                    <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                    <data.icon />
                  </div>
                  <h1 className="text-xl">{data?.title}</h1>
                  <p className="text-text-secondary max-w-[250px]">{data?.description}</p>

                  <SubmitButton
                    title={data.buttonName}
                    icon={data.buttonIcon}
                    type="button"
                    varient={data.title === "Create Backup" ? "yellow" : "default"}
                  />
                </div>
              </Card>
            ))}
          </div>

          {/* backup history table */}
          <BackupHistoryTable/>

        </div>
      </div>
    );
};

export default BackupHistory;