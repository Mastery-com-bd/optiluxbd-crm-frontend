/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  TBackupFrequency,
  TBackupStorageType,
  TUserSettings,
} from "@/types/settings/userSettings.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentSystemSettings,
  setAppCluster,
  setBackupFrequency,
  setBackupPath,
  setBackupStorage,
  setPusherAppId,
  setPusherAppKey,
  setPusherAppSecret,
  setSystemInfo,
} from "@/redux/features/settings/userSettingsSlice";
import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateUserSettings } from "@/service/userSettings";
import { Button } from "@/components/ui/button";

export const backupFrequencies: TBackupFrequency[] = [
  "MANUAL",
  "DAILY",
  "WEEKLY",
  "MONTHLY",
];

export const backupStorage: TBackupStorageType[] = [
  "LOCAL",
  "CLOUD",
  "S3",
  "FTP",
];

const SystemInfoSettings = ({ settings }: { settings: TUserSettings }) => {
  const dispatch = useAppDispatch();
  const systemInfoSettings = useAppSelector(currentSystemSettings);

  useEffect(() => {
    if (settings) {
      dispatch(
        setSystemInfo({
          backup_storage_type: settings?.backup_storage_type,
          backup_frequency: settings?.backup_frequency,
          local_backup_path: settings?.local_backup_path || "",
          pusher_app_id: settings?.pusher_app_id || "",
          pusher_app_key: settings?.pusher_app_key || "",
          pusher_app_secret: settings?.pusher_app_secret || "",
          pusher_app_cluster: settings?.pusher_app_cluster || "",
        }),
      );
    }
  }, [settings, dispatch]);

  const handleSubmitGeneralSettings = async () => {
    const data = { ...systemInfoSettings };
    const toastId = toast.loading("updating settings...", { duration: 3000 });
    try {
      const result = await updateUserSettings(settings?.id, data);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  const handleResetGeneralSettings = () => {
    dispatch(
      setSystemInfo({
        backup_storage_type: settings?.backup_storage_type,
        backup_frequency: settings?.backup_frequency,
        local_backup_path: settings?.local_backup_path || "",
        pusher_app_id: settings?.pusher_app_id || "",
        pusher_app_key: settings?.pusher_app_key || "",
        pusher_app_secret: settings?.pusher_app_secret || "",
        pusher_app_cluster: settings?.pusher_app_cluster || "",
      }),
    );
  };

  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>system configuration</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Pusher App Id</Label>
          <Input
            placeholder="App ID"
            value={systemInfoSettings?.pusher_app_id ?? ""}
            onChange={(e) => dispatch(setPusherAppId(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Pusher App Key</Label>
          <Input
            placeholder="App Key"
            value={systemInfoSettings?.pusher_app_key ?? ""}
            onChange={(e) => dispatch(setPusherAppKey(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Pusher App Secret</Label>
          <Input
            placeholder="App Secret"
            value={systemInfoSettings?.pusher_app_secret ?? ""}
            onChange={(e) => dispatch(setPusherAppSecret(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Pusher App Cluster</Label>
          <Input
            placeholder="Cluster"
            value={systemInfoSettings?.pusher_app_cluster ?? ""}
            onChange={(e) => dispatch(setAppCluster(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Local Backup Path</Label>
          <Input
            value={systemInfoSettings?.local_backup_path ?? ""}
            onChange={(e) => dispatch(setBackupPath(e.target.value))}
            placeholder="backup path"
          />
        </div>

        <div className="space-y-2">
          <Label>Backup Storage Type</Label>

          <Select
            value={systemInfoSettings?.backup_storage_type}
            onValueChange={(value) =>
              dispatch(setBackupStorage(value as TBackupStorageType))
            }
          >
            <SelectTrigger className="w-full effect">
              <SelectValue placeholder="Select storage type" />
            </SelectTrigger>

            <SelectContent>
              {backupStorage.map((freq) => (
                <SelectItem key={freq} value={freq}>
                  {freq.charAt(0) + freq.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Backup Frequency</Label>

          <Select
            value={systemInfoSettings?.backup_frequency}
            onValueChange={(value) =>
              dispatch(setBackupFrequency(value as TBackupFrequency))
            }
          >
            <SelectTrigger className="w-full effect">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>

            <SelectContent>
              {backupFrequencies.map((freq) => (
                <SelectItem key={freq} value={freq}>
                  {freq.charAt(0) + freq.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full gap-6">
          <Button
            onClick={handleResetGeneralSettings}
            variant="outline"
            type="button"
            className="cursor-pointer text-sm"
          >
            Reset System Settings
          </Button>
          <ButtonComponent
            handleSubmit={handleSubmitGeneralSettings}
            buttonName="Save Changes"
            varient="yellow"
            type="button"
            className="h-10 px-6 rounded-2xl"
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SystemInfoSettings;
