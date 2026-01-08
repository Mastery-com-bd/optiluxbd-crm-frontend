"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import Switcher from "./Switcher";

type TNotificationPreference = {
    title:string
    notification: boolean
}

const NotificationPreference = () => {
const preferencedata: TNotificationPreference[] = [
  { title: "Group Similar Notifications", notification: true },
  { title: "Show Desktop Notifications", notification: true },
  { title: "Play Sound for Notifications", notification: false },
  { title: "Vibrate on Push Notifications", notification: true },
];
    const handleChange = async (checked: boolean) => {
      console.log(checked);
    };
    const handleChangeQuickHours = async (checked: boolean) => {
      console.log(checked);
    };


  return (
    <div className="grid grid-cols-2 gap-4">
      {/* left side card */}
      <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
        {/* top and bottom border */}
        <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

        <div className="space-y-6">
          {/* header */}
          <div className="space-y-3">
            <h1 className="text-[#FDFDFD] text-xl">Quiet Hours</h1>
            <p className="text-text-secondary ">
              Disable notifications during specific hours
            </p>
          </div>

          {/* main section */}
          <div className="bg-[rgba(44,44,44,0.20)] w-full rounded-2xl relative py-4 px-6">
            <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
            <div className="flex items-center justify-between">
              <h1>Enable Quiet Hours</h1>
              <Switcher
                title="email"
                data={true}
                onChange={handleChangeQuickHours}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2 w-full">
              <Label className="text-text-secondary">Start Time</Label>
              <input
                type="text"
                className="bg-[rgba(44,44,44,0.20)] py-2 px-4 rounded-2xl border border-white/10 outline-none"
              />
            </div>
            <div className="space-y-2 w-full">
              <Label className="text-text-secondary">End Time</Label>
              <input
                type="text"
                className="bg-[rgba(44,44,44,0.20)] py-2 px-4 rounded-2xl border border-white/10 outline-none"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* right side card */}
      <Card className="bg-[rgba(255,255,255,0.10)] w-full rounded-2xl relative py-4 px-6">
        {/* top and bottom border */}
        <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />

        <div className="space-y-6">
          {/* header */}
          <div className="space-y-3">
            <h1 className="text-[#FDFDFD] text-xl">Notification Preferences</h1>
            <p className="text-text-secondary ">
              Additional notification options
            </p>
          </div>

          {/* table section */}
          {preferencedata.map((preference: TNotificationPreference, i) => {
            return (
              <div
                key={i}
                className="bg-[rgba(44,44,44,0.20)] w-full rounded-2xl relative py-4 px-6">
                <div className="absolute top-0 left-0 inset-5 border-l border-t border-white/20 rounded-tl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 inset-5 border-r border-b border-white/20 rounded-br-2xl pointer-events-none" />
                <div className="flex items-center justify-between">
                  <h1>{preference.title}</h1>
                  <Switcher
                    title="email"
                    data={preference.notification}
                    onChange={handleChange}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default NotificationPreference;
