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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addSocialLink,
  currentSocialLinks,
  removeSocialLink,
  setSocialLinks,
  updateSocialLink,
} from "@/redux/features/settings/userSettingsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateUserSettings } from "@/service/userSettings";
import { TUserSettings } from "@/types/settings/userSettings.types";
import Image from "next/image";
import { useEffect } from "react";
import { toast } from "sonner";

const platforms = [
  { key: "facebook_url", label: "Facebook Links" },
  { key: "twitter_url", label: "Twitter Links" },
  { key: "instagram_url", label: "Instagram Links" },
  { key: "linkedin_url", label: "LinkedIn Links" },
] as const;

const SocialLinksSettings = ({ settings }: { settings: TUserSettings }) => {
  const dispatch = useAppDispatch();
  const socialLinks = useAppSelector(currentSocialLinks);

  useEffect(() => {
    if (settings) {
      dispatch(
        setSocialLinks({
          facebook_url: settings?.facebook_url || [],
          twitter_url: settings?.twitter_url || [],
          instagram_url: settings?.instagram_url || [],
          linkedin_url: settings?.linkedin_url || [],
        }),
      );
    }
  }, [settings, dispatch]);

  const handleSubmitGeneralSettings = async () => {
    const data = { ...socialLinks };
    const toastId = toast.loading("updating Social settings settings...", {
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
      setSocialLinks({
        facebook_url: settings?.facebook_url || [],
        twitter_url: settings?.twitter_url || [],
        instagram_url: settings?.instagram_url || [],
        linkedin_url: settings?.linkedin_url || [],
      }),
    );
  };

  const handleOpenLink = (url: string) => {
    if (!url.startsWith("http")) url = "https://" + url;
    window.open(url, "_blank");
  };

  return (
    <Card className="effect">
      <CardHeader>
        <CardTitle>Social Links Settings</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-4">
        {platforms.map(({ key, label }) => {
          const links = socialLinks?.[key] ?? [];
          return (
            <div key={key} className="space-y-3">
              <Label className="text-base font-semibold">{label}</Label>

              {links.map((link, index) => (
                <div key={index} className="flex gap-2">
                  <button
                    onClick={() => handleOpenLink(link)}
                    className="w-7 h-7 rounded-full"
                  >
                    <Image
                      height={200}
                      width={200}
                      src={`https://www.google.com/s2/favicons?domain=${link}`}
                      alt={link}
                      className="w-full h-full cursor-pointer "
                    />
                  </button>
                  <Input
                    value={link}
                    placeholder={`Enter ${label}`}
                    onChange={(e) =>
                      dispatch(
                        updateSocialLink({
                          platform: key,
                          index,
                          url: e.target.value,
                        }),
                      )
                    }
                  />

                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() =>
                      dispatch(
                        removeSocialLink({
                          platform: key,
                          index,
                        }),
                      )
                    }
                  >
                    Delete
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                disabled={links.length >= 5}
                onClick={() =>
                  dispatch(
                    addSocialLink({
                      platform: key,
                      url: "",
                    }),
                  )
                }
              >
                Add Link
              </Button>
            </div>
          );
        })}
      </CardContent>

      <CardFooter>
        <div className="flex justify-end w-full gap-6">
          <Button
            variant="outline"
            type="button"
            className="cursor-pointer text-sm"
            onClick={handleResetGeneralSettings}
          >
            Reset Social Links
          </Button>

          <ButtonComponent
            buttonName="Save Changes"
            varient="yellow"
            type="button"
            className="h-10 px-6 rounded-2xl"
            handleSubmit={handleSubmitGeneralSettings}
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default SocialLinksSettings;
