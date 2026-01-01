"use client";

import { useState } from "react";
import { TPermissionData } from "./UserAndRole";
import { Switch } from "@/components/ui/switch";

const PermissionSystem = ({ item }: { item: TPermissionData }) => {
  const [enabledPermissions, setEnabledPermissions] = useState<
    Record<string, boolean>
  >({});

  const togglePermission = (key: string) => {
    setEnabledPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div key={item.name} className="space-y-2">
      {/* Module Name */}
      <h3 className="text-xs text-text-secondary">{item.name}</h3>

      {/* Permission Box */}
      <div className=" overflow-hidden space-y-3">
        {item.permissions.map((permission) => {
          const key = `${item.name}-${permission}`;
          const isOn = enabledPermissions[key];

          return (
            <div
              key={permission}
              className={` px-4 py-3 bg-white/5 rounded-3xl relative`}
            >
              <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-3xl pointer-events-none" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-[#FDFDFD]">{permission}</span>

                <Switch
                  checked={isOn}
                  onCheckedChange={() => togglePermission(key)}
                  className=" h-7 w-14 p-1 data-[state=checked]:bg-brand data-[state=unchecked]:bg-white/20 [&>span]:bg-white! [&>span]:data-[state=checked]:translate-x-7 cursor-pointer"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PermissionSystem;
