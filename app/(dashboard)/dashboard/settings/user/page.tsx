import CreateSettings from "@/components/pages/dashboard/userSettings/CreateSettings";
import UpdateSettings from "@/components/pages/dashboard/userSettings/UpdateSettings";
import { getSettings } from "@/service/userSettings";

const UserSettings = async () => {
  const result = await getSettings();
  const settings = result?.data;

  return (
    <section>
      {settings ? <UpdateSettings settings={settings} /> : <CreateSettings />}
    </section>
  );
};

export default UserSettings;
