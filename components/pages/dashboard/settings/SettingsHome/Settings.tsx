import ButtonComponent from "@/components/ui/ButtonComponent";
import SettingsOverview from "./SettingsOverview";
import SettingsCards from "./SettingsCards";
import RecentChanges from "./RecentChanges";
import SystemStatus from "./SystemStatus";

const Settings = () => {
  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="text-3xl font-semibold leading-8">Settings</h1>
          <p className="text-[#A1A1A1] leading-5">
            Configure system settings and preferences
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <ButtonComponent buttonName="Reset All Settings" varient="purple" />
          <ButtonComponent buttonName="Save Changes" varient="yellow" />
        </div>
      </div>

      {/* overview section */}
      <SettingsOverview />

      {/* settings card */}
      <SettingsCards />

      {/* recent changes */}
      <RecentChanges />

      {/* system status section */}
      <SystemStatus />
    </div>
  );
};

export default Settings;
