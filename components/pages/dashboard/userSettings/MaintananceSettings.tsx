/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  currentSystemMaintainance,
  setBackupEnebled,
  setMaintainceMode,
  setSystemMaintainance,
} from "@/redux/features/settings/userSettingsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserSettings } from "@/service/userSettings";
import { TUserSettings } from "@/types/settings/userSettings.types";
import { useEffect } from "react";
import { toast } from "sonner";

const MaintananceSettings = ({ settings }: { settings: TUserSettings }) => {
  const dispatch = useAppDispatch();
  const systemMaintanance = useAppSelector(currentSystemMaintainance);

  useEffect(() => {
    if (settings) {
      dispatch(
        setSystemMaintainance({
          maintenance_mode: settings?.maintenance_mode ?? false,
          backup_enabled: settings?.backup_enabled ?? false,
        }),
      );
    }
  }, [settings, dispatch]);

  const handleSubmitGeneralSettings = async () => {
    const data = { ...systemMaintanance };
    const toastId = toast.loading("updating maintainance settings...", {
      duration: 3000,
    });
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
      setSystemMaintainance({
        maintenance_mode: settings?.maintenance_mode,
        backup_enabled: settings?.backup_enabled,
      }),
    );
  };

  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>Backup and system Maintainance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Enable Backup */}
        <div className="flex items-start justify-between rounded-xl border p-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Enable Backup</h4>
            <p className="text-sm text-muted-foreground">
              Automatically create backups based on your selected frequency.
            </p>
          </div>

          <Switch
            checked={systemMaintanance?.backup_enabled ?? false}
            onCheckedChange={(value) => dispatch(setBackupEnebled(value))}
            className="h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[rgba(0,166,86,0.20)] [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
          />
        </div>

        {/* Maintenance Mode */}
        <div className="flex items-start justify-between rounded-xl border p-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Maintenance Mode</h4>
            <p className="text-sm text-muted-foreground">
              When enabled, users will see a maintenance page instead of the
              website.
            </p>
          </div>

          <Switch
            checked={systemMaintanance?.maintenance_mode ?? false}
            onCheckedChange={(value) => dispatch(setMaintainceMode(value))}
            className="h-7 w-12 p-1 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[rgba(0,166,86,0.20)] [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-6"
          />
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
            Reset Maintanance Settings
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

export default MaintananceSettings;
