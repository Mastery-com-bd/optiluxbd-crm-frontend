"use client";

import { Card } from "@/components/ui/card";
import {
  getPercentage,
  storageData,
  systemStatus,
  TSystemStatus,
} from "./const/settings.const";

const SystemStatus = () => {
  const handleClick = async (value: string) => {
    console.log(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-5">
      {/* system status */}
      <Card className=" bg-[rgba(44,44,44,0.60)] rounded-2xl border border-white/15">
        <h1 className="text-2xl font-semibold">System Status</h1>
        <div className="space-y-4">
          {systemStatus.map((item: TSystemStatus, index) => {
            return (
              <div
                key={index}
                className="bg-[rgba(44,44,44,0.20)] px-6 py-3 rounded-3xl relative"
              >
                {/* top and bottom border */}
                <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

                {/* main content */}
                <div className="flex items-center justify-between">
                  <h1 className="text-[#FDFDFD] text-lg">{item.name}</h1>
                  <div
                    className={`relative px-3 py-2 rounded-3xl text-sm ${
                      item.status === "Active" ||
                      item.status === "Connected" ||
                      item.status === "Online"
                        ? " bg-[rgba(0,166,86,0.13)] text-success"
                        : "bg-red-300 text-red-600"
                    }`}
                  >
                    <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
                    <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />
                    {item.status}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* storage usage */}
      <Card className=" bg-[rgba(44,44,44,0.60)] rounded-2xl border border-white/15">
        <h1 className="text-xl text-[#FDFDFD]">Storage Usage</h1>
        <div className="space-y-5">
          {storageData.map((item) => {
            const percent = getPercentage(item.usage, item.total);
            return (
              <div key={item.memory} className="space-y-2">
                {/* Header */}
                <div className="flex items-center justify-between ">
                  <span className="font-medium text-lg">{item.memory}</span>
                  <span className="text-muted-foreground text-sm">
                    {item.usage}GB
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* quick action */}
      <Card className=" bg-[rgba(44,44,44,0.60)] rounded-2xl border border-white/15">
        <h1 className="text-xl text-[#FDFDFD]">Quick Actions</h1>
        <div className="flex flex-col gap-4">
          {[
            "Clear Cache",
            "Optimize Database",
            "Test Email",
            "Export Settings",
          ].map((item: string, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  if (item === "Clear Cache") handleClick("cash");
                  if (item === "Optimize Database") handleClick("database");
                  if (item === "Test Email") handleClick("email");
                  if (item === "Export Settings") handleClick("settings");
                }}
                className="bg-[rgba(44,44,44,0.20)] border border-[#404040] px-6 py-3 rounded-2xl relative cursor-pointer w-full text-start"
              >
                {/* top and bottom border */}
                <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

                {/* main content */}
                <h1 className="text-[#FDFDFD] text-lg">{item}</h1>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SystemStatus;
