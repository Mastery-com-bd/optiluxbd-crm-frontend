"use client";

import { TUserSettings } from "@/types/settings/userSettings.types";
import PageHeader from "../shared/pageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ui/ButtonComponent";

const UpdateSettings = ({ settings }: { settings: TUserSettings }) => {
  const handleChange = (
    key: keyof TUserSettings,
    value: string | boolean | string[],
  ) => {
    console.log(key);
    console.log(value);
  };
  return (
    <div className="bg-white/5 rounded-2xl p-6 space-y-6 min-h-screen">
      <PageHeader
        title="System Settings"
        description="Here the settings of the system is available with the custom branding"
      />

      <div className="space-y-8">
        {/* General Info */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Site Name</Label>
              <Input
                value={settings.site_name ?? ""}
                onChange={(e) => handleChange("site_name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                value={settings.address ?? ""}
                onChange={(e) => handleChange("address", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Currency</Label>
              <Input
                value={settings.currency ?? ""}
                onChange={(e) => handleChange("currency", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Timezone</Label>
              <Input
                value={settings.timezone ?? ""}
                onChange={(e) => handleChange("timezone", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Contact Info</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Contact Email"
              value={settings.contact_email ?? ""}
              onChange={(e) => handleChange("contact_email", e.target.value)}
            />

            <Input
              placeholder="Contact Phone"
              value={settings.contact_phone ?? ""}
              onChange={(e) => handleChange("contact_phone", e.target.value)}
            />
          </CardContent>
        </Card>

        {/* System */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            {/* Maintenance Mode */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.maintenance_mode}
                onChange={(e) =>
                  handleChange("maintenance_mode", e.target.checked)
                }
              />
              <Label>Maintenance Mode</Label>
            </div>

            {/* Backup Enabled */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={settings.backup_enabled}
                onChange={(e) =>
                  handleChange("backup_enabled", e.target.checked)
                }
              />
              <Label>Backup Enabled</Label>
            </div>

            {/* Backup Frequency */}
            <div className="space-y-2">
              <Label>Backup Frequency</Label>
              <select
                value={settings.backup_frequency}
                onChange={(e) =>
                  handleChange("backup_frequency", e.target.value)
                }
                className="border p-2 rounded-lg w-full"
              >
                <option value="manual">Manual</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Backup Storage */}
            <div className="space-y-2">
              <Label>Backup Storage Type</Label>
              <select
                value={settings.backup_storage_type}
                onChange={(e) =>
                  handleChange("backup_storage_type", e.target.value)
                }
                className="border p-2 rounded-lg w-full"
              >
                <option value="local">Local</option>
                <option value="cloud">Cloud</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Pusher */}
        <Card className="effect">
          <CardHeader>
            <CardTitle>Pusher Configuration</CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="App ID"
              value={settings.pusher_app_id ?? ""}
              onChange={(e) => handleChange("pusher_app_id", e.target.value)}
            />

            <Input
              placeholder="App Key"
              value={settings.pusher_app_key ?? ""}
              onChange={(e) => handleChange("pusher_app_key", e.target.value)}
            />

            <Input
              placeholder="App Secret"
              value={settings.pusher_app_secret ?? ""}
              onChange={(e) =>
                handleChange("pusher_app_secret", e.target.value)
              }
            />

            <Input
              placeholder="Cluster"
              value={settings.pusher_app_cluster ?? ""}
              onChange={(e) =>
                handleChange("pusher_app_cluster", e.target.value)
              }
            />
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <ButtonComponent
            buttonName="Save Change"
            varient="yellow"
            type="button"
            // handleSubmit={handleSubmit}
            className="h-10 px-6 rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateSettings;
