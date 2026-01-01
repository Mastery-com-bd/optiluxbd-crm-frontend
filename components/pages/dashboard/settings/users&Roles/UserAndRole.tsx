"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import { Card } from "@/components/ui/card";
import { Shield, Users } from "lucide-react";
import PermissionSystem from "./PermissionSystem";
import UserTable from "./UserTable";
import { userData } from "../SettingsHome/const/settings.const";

export type TPermissionData = {
  name: string;
  permissions: string[];
};

export const permissionData: TPermissionData[] = [
  {
    name: "Leads",
    permissions: ["View Leads", "Edit Leads", "Delete Leads", "Update Leads"],
  },
  {
    name: "Orders",
    permissions: [
      "View Orders",
      "Edit Orders",
      "Delete Orders",
      "Update Orders",
    ],
  },
  {
    name: "Teams",
    permissions: ["Manage Agents"],
  },
  {
    name: "Reports",
    permissions: ["View Reports", "Export Data"],
  },
  {
    name: "System",
    permissions: ["Manage Settings"],
  },
];

const UserAndRole = () => {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold leading-8">Users & Roles</h1>
          <p className="text-[#A1A1A1] leading-5">
            Manage user accounts and role permissions
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent buttonName="Add New User" varient="full yellow" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
        {/* left side */}
        <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
          {/* top and bottom border */}
          <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          <div className="space-y-6">
            {/* header */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl relative bg-[rgba(255,107,0,0.13)]`}
              >
                {/* top and borrom border */}
                <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                <Users className="text-[#FF6B00]" />
              </div>
              <div>
                <h1 className="text-[#FDFDFD] text-lg">All Users</h1>
                <p className="text-[#B1B1B1] text-sm">
                  {userData.length} total users
                </p>
              </div>
            </div>

            {/* content table */}
            <UserTable userData={userData} />
          </div>
        </Card>

        {/* right side  */}
        <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
          {/* top and bottom border */}
          <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

          <div className="space-y-6">
            {/* header */}
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl relative bg-[rgba(127,95,255,0.20)]`}
              >
                {/* top and borrom border */}
                <div className="absolute top-0 left-0 inset-3 border-l border-t border-white/15 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-3 border-r border-b border-white/15 rounded-br-2xl pointer-events-none" />
                <Shield className="text-[#7F5FFF]" />
              </div>
              <div>
                <h1 className="text-[#FDFDFD] text-lg">Role Permissions</h1>
                <p className="text-[#B1B1B1] text-sm">Configure access</p>
              </div>
            </div>

            {/* main content */}
            <div className="space-y-4">
              {permissionData.map((item, i) => (
                <PermissionSystem key={i} item={item} />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div />
    </div>
  );
};

export default UserAndRole;
