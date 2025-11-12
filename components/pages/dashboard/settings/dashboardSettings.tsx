/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSettingsdataQuery,
  useUpdateSettingsMutation,
} from "@/redux/features/settings/settingsApi";
import { Pencil, Save, X } from "lucide-react";
import React, { useEffect, useState } from "react";

import { TSettings } from "./settings.types";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  currentSettings,
  resetSettings,
  setAddress,
  setEmail,
  setFavIcon,
  setLogoId,
  setLogoUrl,
  setPhone,
  setSiteName,
} from "@/redux/features/settings/settingsSlice";
import SettingsSkeleton from "./SettingsSkeleton";
import { toast } from "sonner";

export default function DashboardSettings() {
  const { data, isLoading } = useGetSettingsdataQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });
  const settings = data?.data as TSettings;
  const [editing, setEditing] = useState<"brand" | "contact" | "">("");
  const [formData, setFormData] = useState<Partial<TSettings> | null>(null);
  const dispatch = useAppDispatch();
  const currentSetting = useAppSelector(currentSettings);
  const [updateSettings] = useUpdateSettingsMutation();

  useEffect(() => {
    if (settings) {
      Promise.resolve().then(() => {
        setFormData(settings as TSettings);
      });
    }
  }, [settings]);

  const handleSubmit = async () => {
    const id = settings?.id;
    try {
      const res = await updateSettings({ id, currentSetting }).unwrap();
      if (res?.success) {
        toast.success(res?.message, {
          duration: 3000,
        });
        dispatch(resetSettings());
        setEditing("");
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { duration: 3000 });
    }
  };

  if (isLoading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Settings</h1>
        {settings?.updated_at && (
          <Badge variant="secondary" className="hidden sm:inline-flex">
            Last updated: {new Date(settings?.updated_at).toLocaleString()}
          </Badge>
        )}
      </div>

      <Separator />

      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Branding</CardTitle>
          {editing !== "brand" && (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setEditing("brand")}
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          )}
          {editing === "brand" && (
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
        {editing === "brand" ? (
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-sm">Site Name</label>
              <Input
                value={formData?.site_name}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, site_name: value });
                  dispatch(setSiteName(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Logo URL</label>
              <Input
                value={formData?.site_logo_url}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, site_logo_url: value });
                  dispatch(setLogoUrl(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Logo Public ID</label>
              <Input
                value={formData?.site_logo_public_id}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, site_logo_public_id: value });
                  dispatch(setLogoId(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Favicon URL</label>
              <Input
                value={formData?.site_favicon_url}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, site_favicon_url: value });
                  dispatch(setFavIcon(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
          </CardContent>
        ) : (
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-sm mb-1 block">
                Site Name
              </label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {settings?.site_name || "—"}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">
                Logo URL
              </label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {settings?.site_logo_url || "—"}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">
                Logo Public ID
              </label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {settings?.site_logo_public_id || "—"}
              </div>
            </div>

            {/* Favicon URL */}
            <div>
              <label className="font-semibold text-sm mb-1 block">
                Favicon URL
              </label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-800 
                       border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200"
              >
                {settings?.site_favicon_url || "—"}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Contact</CardTitle>
          {editing !== "contact" && (
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setEditing("contact")}
            >
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          )}
          {editing === "contact" && (
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
        {editing === "contact" ? (
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-sm">Site Name</label>
              <Input
                value={formData?.contact_email}
                readOnly={!editing}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, contact_email: value });
                  dispatch(setEmail(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div>
              <label className="font-semibold text-sm">Logo URL</label>
              <Input
                value={formData?.contact_phone}
                readOnly={!editing}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, contact_phone: value });
                  dispatch(setPhone(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-semibold text-sm">Address</label>
              <Textarea
                value={formData?.address}
                readOnly={!editing}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormData({ ...formData, address: value });
                  dispatch(setAddress(value));
                }}
                className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
              />
            </div>
          </CardContent>
        ) : (
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="font-semibold text-sm mb-1 block">Email</label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm 
      bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
      text-gray-800 dark:text-gray-200"
              >
                {settings?.contact_email || "—"}
              </div>
            </div>

            <div>
              <label className="font-semibold text-sm mb-1 block">Phone</label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm 
      bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
      text-gray-800 dark:text-gray-200"
              >
                {settings?.contact_phone || "—"}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-sm mb-1 block">
                Address
              </label>
              <div
                className="w-full rounded-md border px-3 py-2 text-sm 
      bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 
      text-gray-800 dark:text-gray-200 min-h-20 whitespace-pre-wrap"
              >
                {settings?.address || "—"}
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Social Links */}
      {/* <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(
            [
              "facebook_url",
              "twitter_url",
              "instagram_url",
              "linkedin_url",
            ] as const
          ).map((social) => (
            <div key={social} className="space-y-2 p-4 border rounded-xl">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">
                  {social.replace("_url", "").toUpperCase()} URLs
                </span>
                <Button type="button" variant="outline" size="sm">
                  <Plus className="mr-1 h-4 w-4" /> Add
                </Button>
              </div>
              {(settings[social] || []).map((url: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <Input value={url} readOnly />
                  <Button type="button" variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card> */}

      {/* System */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>System</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span className="font-semibold text-sm">Maintenance Mode</span>
            <Switch checked={settings?.maintenance_mode || false} />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-end gap-2">
          <Button disabled onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
