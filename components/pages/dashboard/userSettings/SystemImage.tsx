/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploader from "@/components/ui/ImageUploader";
import { Label } from "@/components/ui/label";
import { uploadFavicon, uploadLogo } from "@/service/userSettings";
import { TUserSettings } from "@/types/settings/userSettings.types";
import { toast } from "sonner";

const SystemImage = ({ settings }: { settings: TUserSettings }) => {
  const handleLogoChnage = async (image: File) => {
    const formData = new FormData();
    const toastId = toast.loading("logo uploading", { duration: 3000 });
    if (!image) {
      toast.error("logo is required", { id: toastId, duration: 3000 });
      return;
    }

    formData.append("logo", image);
    try {
      const result = await uploadLogo(formData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleFaviconChnage = async (image: File) => {
    const formData = new FormData();
    const toastId = toast.loading("favicon uploading", { duration: 3000 });
    if (!image) {
      toast.error("favicon is required", { id: toastId, duration: 3000 });
      return;
    }
    formData.append("favicon", image);
    try {
      const result = await uploadFavicon(formData);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>System Logo and Favicon Update</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="space-y-2">
          <Label>Site Logo</Label>
          <ImageUploader
            image={settings?.site_logo_url as string}
            handleChange={handleLogoChnage}
          />
        </div>
        <div className="space-y-2">
          <Label>Site Favicon</Label>
          <ImageUploader
            image={settings?.site_favicon_url as string}
            handleChange={handleFaviconChnage}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemImage;
