"use client"

import ButtonComponent from "@/components/ui/ButtonComponent";
import Overview from "./Overview";
import NotificationTrigger from "./NotificationTrigger";

const Notification = () => {
    return (
      <div className="space-y-6">
        {/* header */}
        <div className="flex items-center justify-between ">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-8">
              Notification Settings
            </h1>
            <p className="text-[#A1A1A1] leading-5">
              Configure notification triggers and channels
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 ">
            <ButtonComponent buttonName="Add New User" varient="full yellow" />
          </div>
        </div>

        {/* overview card */}
        <Overview/>

        {/* main content */}
        <NotificationTrigger/>
      </div>
    );
};

export default Notification;