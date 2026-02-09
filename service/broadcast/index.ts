/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Query } from "@/types/shared";
import { createData, readData } from "../apiService/crud";

export async function getAllBroadcast(query?: Query) {
  const res = await readData("/admin/broadcasts", ["Broadcast"], query);
  return res;
}

export const readBroadcast = async (id: string) => {
  try {
    const result = await createData<any>(
      `/admin/broadcasts/${id}/read`,
      "/dashboard/broadcast",
    );
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
