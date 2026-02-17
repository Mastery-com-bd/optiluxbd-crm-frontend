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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentGeneralSettings,
  setAddress,
  setCurrency,
  setEmail,
  setGeneralInfo,
  setPhone,
  setSiteName,
  setTimezone,
} from "@/redux/features/settings/userSettingsSlice";
import { TUserSettings } from "@/types/settings/userSettings.types";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateUserSettings } from "@/service/userSettings";

const GeneralSettings = ({ settings }: { settings: TUserSettings }) => {
  const dispatch = useAppDispatch();
  const generalSettings = useAppSelector(currentGeneralSettings);

  useEffect(() => {
    if (settings) {
      dispatch(
        setGeneralInfo({
          site_name: settings.site_name,
          address: settings.address,
          currency: settings.currency,
          timezone: settings.timezone,
          contact_email: settings.contact_email,
          contact_phone: settings.contact_phone,
        }),
      );
    }
  }, [settings, dispatch]);

  const handleSubmitGeneralSettings = async () => {
    const data = { ...generalSettings };
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
      setGeneralInfo({
        site_name: settings.site_name,
        address: settings.address,
        currency: settings.currency,
        timezone: settings.timezone,
        contact_email: settings.contact_email,
        contact_phone: settings.contact_phone,
      }),
    );
  };

  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>Name and contact info</CardTitle>
      </CardHeader>

      <CardContent className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Site Name</Label>
          <Input
            value={generalSettings?.site_name}
            onChange={(e) => dispatch(setSiteName(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Address</Label>
          <Input
            value={generalSettings?.address}
            onChange={(e) => dispatch(setAddress(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Currency</Label>
          <Input
            value={generalSettings?.currency}
            onChange={(e) => dispatch(setCurrency(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Timezone</Label>
          <Input
            value={generalSettings?.timezone}
            onChange={(e) => dispatch(setTimezone(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Contact Email</Label>
          <Input
            value={generalSettings?.contact_email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label>Contact Phone</Label>
          <Input
            value={generalSettings.contact_phone}
            onChange={(e) => dispatch(setPhone(e.target.value))}
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
            Reset General Settings
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

export default GeneralSettings;
