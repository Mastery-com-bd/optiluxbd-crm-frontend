import DashboardSettings from "@/components/pages/dashboard/settings/dashboardSettings";
import NotificationSettings from "@/components/pages/dashboard/settings/NotificationSettings";

export default function Page() {
  return <div>
    <h3 className="text-2xl font-bold mb-6">Settings</h3>
    {/* <DashboardSettings /> */}
    <NotificationSettings />
  </div>;
}