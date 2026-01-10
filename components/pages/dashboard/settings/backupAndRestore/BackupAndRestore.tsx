"use client"

import ButtonComponent from "@/components/ui/ButtonComponent";
import BackupOverview from "./BackupOverview";
import BackupAndSchedule from "./BackupAndSchedule";
import BackupHistory from "./BackupHistory";

const BackupAndRestore = () => {
    return (
      <div className="space-y-6">
        {/* headers */}
        <div className="flex items-center justify-between ">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-8">
              Backup & Restore
            </h1>
            <p className="text-[#A1A1A1] leading-5">
              Manage database backups and restoration
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 ">
            <ButtonComponent buttonName="Add New User" varient="full yellow" />
          </div>
        </div>

        <BackupOverview/>

        <div className="flex items-start justify-between gap-5">
            {/* left side */}
            <BackupAndSchedule/>

            {/* right side */}
            <BackupHistory/>
        </div>
      </div>
    );
};

export default BackupAndRestore;