"use client";
import { TUserSettings } from "@/types/settings/userSettings.types";
import PageHeader from "../shared/pageHeader";
import GeneralSettings from "./GeneralSettings";
import SystemInfoSettings from "./SystemInfoSettings";
import MaintananceSettings from "./MaintananceSettings";
import SocialLinksSettings from "./SocialLinksSettings";
import SystemImage from "./SystemImage";

const UpdateSettings = ({ settings }: { settings: TUserSettings }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <PageHeader
        title="Settings"
        description="Here the settings of the system is available with the custom branding"
      />

      <div className="space-y-8">
        <SystemImage settings={settings} />
        <GeneralSettings settings={settings} />
        <SystemInfoSettings settings={settings} />
        <SocialLinksSettings settings={settings} />
        <MaintananceSettings settings={settings} />
      </div>
    </div>
  );
};

export default UpdateSettings;
