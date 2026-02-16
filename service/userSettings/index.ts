"use server";
import { SettingsFormValues } from "@/components/pages/dashboard/userSettings/CreateSettings";
import { createData, patchData, readData } from "../apiService/crud";

export const getSettings = async () => {
  const res = await readData("/settings", ["Settings"]);
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
