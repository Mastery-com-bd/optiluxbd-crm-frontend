/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { SettingsFormValues } from "@/components/pages/dashboard/userSettings/CreateSettings";
import { createData, patchData, readData } from "../apiService/crud";

export const getSettings = async () => {
  const res = await readData("/settings", ["Settings"]);
  return res;
};

export const getLogoUrl = async () => {
  const res = await readData("/settings/logo-url", ["Settings"]);
  return res;
};

export const getSocialLinks = async () => {
  const res = await readData("/settings/social-links", ["Settings"]);
  return res;
};

export const getContactInfo = async () => {
  const res = await readData("/settings/contact-info", ["Settings"]);
  return res;
};

export const createSettings = async (data: SettingsFormValues) => {
  const res = await createData("/settings", "dashboard/settings/user", data);
  return res;
};

export const updateUserSettings = async (
  id: number,
  data: Partial<SettingsFormValues>,
) => {
  const res = await patchData(
    `/settings/${id}`,
    "dashboard/settings/user",
    data,
  );
  return res;
};

export const manualBackup = async () => {
  try {
    const result = await createData(
      `/settings/backup/manual`,
      "dashboard/settings/user",
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
