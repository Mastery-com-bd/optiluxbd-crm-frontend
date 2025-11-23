/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  currentSettings,
  deleteFacebook,
  deleteInstagram,
  deleteLinkedIn,
  deleteTwitter,
  resetSettings,
  setFacebook,
  setInstagram,
  setLinkedIn,
  setSocialLinks,
  setTwitter,
} from "@/redux/features/settings/settingsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Facebook,
  Instagram,
  Linkedin,
  Pencil,
  Plus,
  Trash2,
  Twitter,
  X,
} from "lucide-react";
import { Dispatch, JSX, SetStateAction, useEffect, useState } from "react";
import { TSettings } from "./settings.types";
import Link from "next/link";
import { useUpdateSettingsMutation } from "@/redux/features/settings/settingsApi";
import { toast } from "sonner";

type TSocialSettingsprops = {
  editing: "" | "brand" | "contact" | "social";
  setEditing: Dispatch<SetStateAction<"" | "brand" | "contact" | "social">>;
  formData: Partial<TSettings> | null;
  setFormData: Dispatch<SetStateAction<Partial<TSettings> | null>>;
  settings: TSettings;
};

const socialIcons: Record<string, JSX.Element> = {
  facebook_url: <Facebook className="w-5 h-5 text-blue-600" />,
  twitter_url: <Twitter className="w-5 h-5 text-sky-500" />,
  instagram_url: <Instagram className="w-5 h-5 text-pink-500" />,
  linkedin_url: <Linkedin className="w-5 h-5 text-blue-700" />,
};

const SocialSettings = ({
  editing,
  setEditing,
  formData,
  setFormData,
  settings,
}: TSocialSettingsprops) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [updateSettings] = useUpdateSettingsMutation();
  const currentSetting = useAppSelector(currentSettings);
  const id = settings?.id;

  useEffect(() => {
    if (settings) {
      const socialData = {
        facebook_url: settings?.facebook_url ?? [],
        twitter_url: settings?.twitter_url ?? [],
        instagram_url: settings?.instagram_url ?? [],
        linkedin_url: settings?.linkedin_url ?? [],
      };
      dispatch(setSocialLinks(socialData));
    }
  }, [settings, dispatch]);

  const handleSubmit = async () => {
    setLoading(true);

    if (!currentSetting || Object.keys(currentSetting).length === 0) {
      toast.error("Nothing to update!", { duration: 3000 });
      setLoading(false);
      return;
    }
    const toastId = toast.loading("updateing social information", {
      duration: 3000,
    });
    try {
      const res = await updateSettings({ id, currentSetting }).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId, duration: 3000 });
        dispatch(resetSettings());
        setEditing("");
        setLoading(false);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Social Links</CardTitle>
        {editing !== "social" && (
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={() => setEditing("social")}
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
        )}
        {editing === "social" && (
          <Button
            size="sm"
            variant="destructive"
            className="flex items-center gap-1"
            onClick={() => {
              setFormData(settings);
              setEditing("");
              dispatch(resetSettings());
            }}
          >
            <X className="w-4 h-4" /> Close
          </Button>
        )}
      </CardHeader>
      {editing === "social" ? (
        <CardContent className="space-y-4">
          {/* facebook */}
          <div className="space-y-2 p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">FACEBOOK URLs</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev!,
                    facebook_url: [...(prev?.facebook_url ?? []), ""],
                  }))
                }
              >
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {(formData?.facebook_url ?? []).length > 0 ? (
              formData?.facebook_url?.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => {
                        const updated = [...(prev?.facebook_url ?? [])];
                        updated[idx] = value;
                        return { ...prev!, facebook_url: updated };
                      });
                    }}
                    onBlur={(e) => {
                      const finalValue = e.target.value;
                      dispatch(setFacebook(finalValue));
                    }}
                    placeholder="Enter Facebook URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = [...(prev?.facebook_url ?? [])].filter(
                          (_, i) => i !== idx
                        );
                        return { ...prev!, facebook_url: updated };
                      });
                      dispatch(deleteFacebook());
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No links added yet.
              </p>
            )}
          </div>
          {/* twitter */}
          <div className="space-y-2 p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Twitter URLs</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev!,
                    twitter_url: [...(prev?.twitter_url ?? []), ""],
                  }))
                }
              >
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {(formData?.twitter_url ?? []).length > 0 ? (
              formData?.twitter_url?.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => {
                        const updated = [...(prev?.twitter_url ?? [])];
                        updated[idx] = value;
                        return { ...prev!, twitter_url: updated };
                      });
                    }}
                    onBlur={(e) => {
                      const finalValue = e.target.value;
                      dispatch(setTwitter(finalValue));
                    }}
                    placeholder="Enter twitter URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = [...(prev?.twitter_url ?? [])].filter(
                          (_, i) => i !== idx
                        );
                        return { ...prev!, twitter_url: updated };
                      });
                      dispatch(deleteTwitter());
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No links added yet.
              </p>
            )}
          </div>
          {/* instagram */}
          <div className="space-y-2 p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">Instagram URLs</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev!,
                    instagram_url: [...(prev?.instagram_url ?? []), ""],
                  }))
                }
              >
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {(formData?.instagram_url ?? []).length > 0 ? (
              formData?.instagram_url?.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => {
                        const updated = [...(prev?.instagram_url ?? [])];
                        updated[idx] = value;
                        return { ...prev!, instagram_url: updated };
                      });
                    }}
                    onBlur={(e) => {
                      const finalValue = e.target.value;
                      dispatch(setInstagram(finalValue));
                    }}
                    placeholder="Enter instagram URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = [...(prev?.instagram_url ?? [])].filter(
                          (_, i) => i !== idx
                        );
                        return { ...prev!, instagram_url: updated };
                      });
                      dispatch(deleteInstagram());
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No links added yet.
              </p>
            )}
          </div>
          {/* linkedIn */}
          <div className="space-y-2 p-4 border rounded-xl">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold">LinkedIn URLs</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev!,
                    linkedin_url: [...(prev?.linkedin_url ?? []), ""],
                  }))
                }
              >
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>

            {(formData?.linkedin_url ?? []).length > 0 ? (
              formData?.linkedin_url?.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input
                    value={url}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => {
                        const updated = [...(prev?.linkedin_url ?? [])];
                        updated[idx] = value;
                        return { ...prev!, linkedin_url: updated };
                      });
                    }}
                    onBlur={(e) => {
                      const finalValue = e.target.value;
                      dispatch(setLinkedIn(finalValue));
                    }}
                    placeholder="Enter LinkedIn URL"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      setFormData((prev) => {
                        const updated = [...(prev?.linkedin_url ?? [])].filter(
                          (_, i) => i !== idx
                        );
                        return { ...prev!, linkedin_url: updated };
                      });
                      dispatch(deleteLinkedIn());
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No links added yet.
              </p>
            )}
          </div>
        </CardContent>
      ) : (
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-col gap-2">
              {settings?.facebook_url.length > 0 ? (
                settings?.facebook_url.map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent transition-colors"
                  >
                    {socialIcons.facebook_url}
                    <span className="text-sm text-gray-700 dark:text-gray-200 break-all">
                      {url}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No links added yet.
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="flex flex-col gap-2">
              {settings?.twitter_url.length > 0 ? (
                settings?.twitter_url.map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent transition-colors"
                  >
                    {socialIcons.twitter_url}
                    <span className="text-sm text-gray-700 dark:text-gray-200 break-all">
                      {url}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No links added yet.
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="flex flex-col gap-2">
              {settings?.instagram_url.length > 0 ? (
                settings?.instagram_url.map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent transition-colors"
                  >
                    {socialIcons.instagram_url}
                    <span className="text-sm text-gray-700 dark:text-gray-200 break-all">
                      {url}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No links added yet.
                </p>
              )}
            </div>
          </div>
          <div className="space-y-2 ">
            <div className="flex flex-col gap-2">
              {settings?.linkedin_url.length > 0 ? (
                settings?.linkedin_url.map((url, idx) => (
                  <Link
                    key={idx}
                    href={url}
                    target="_blank"
                    className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent transition-colors"
                  >
                    {socialIcons.linkedin_url}
                    <span className="text-sm text-gray-700 dark:text-gray-200 break-all">
                      {url}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No links added yet.
                </p>
              )}
            </div>
          </div>
        </CardContent>
      )}
      {editing === "social" && (
        <CardFooter className="flex items-center justify-end gap-2">
          <Button
            onClick={() => {
              dispatch(resetSettings());
            }}
          >
            Reset
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-yellow-500 dark:bg-yellow-600 hover:bg-[#ffc500] dark:hover:bg-yellow-500 text-white cursor-pointer"
          >
            Update Social
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default SocialSettings;
