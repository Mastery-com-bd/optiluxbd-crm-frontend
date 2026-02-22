"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Switcher from "./Switcher";
import { Input } from "@/components/ui/input";

type TNotificationPreference = {
  title: string;
  notification: boolean;
};

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
    <div className="flex items-start justify-between gap-4">
      {/* left side card */}
      <Card className="effect rounded-2xl h-[440px] w-full">
        <div className="space-y-6 w-full ">
          {/* header */}
          <div className="space-y-3">
            <h1 className="text-[#FDFDFD] text-xl">Quiet Hours</h1>
            <p className="text-text-secondary ">
              Disable notifications during specific hours
            </p>
          </div>

          {/* main section */}
          <div className=" w-full rounded-2xl effect-no-bg py-4 px-6">
            <div className="flex items-center justify-between">
              <h1>Enable Quiet Hours</h1>
              <Switcher
                title="email"
                data={true}
                onChange={handleChangeQuickHours}
              />
            </div>
          </div>

          <div className="flex items-center gap-6 w-full">
            <div className="space-y-2 ">
              <Label className="text-text-secondary">Start Time</Label>
              <Input type="text" className="rounded-2xl effect-no-bg" />
            </div>

            <div className="space-y-2 ">
              <Label className="text-text-secondary">End Time</Label>
              <Input type="text" className="rounded-2xl effect-no-bg" />
            </div>
          </div>
        </div>
      </Card>

      {/* right side card */}
      <Card className=" effect rounded-2xl h-[440px] w-full">
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
                className=" w-full rounded-2xl py-4 px-6 effect-no-bg"
              >
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
