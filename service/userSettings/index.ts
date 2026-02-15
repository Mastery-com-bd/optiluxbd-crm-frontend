/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { readData } from "../apiService/crud";

export const getSettings = async () => {
  const res = await readData("/settings", ["Settings"]);
  return res;
};
