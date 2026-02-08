"use server";
import { Query } from "@/types/shared";
import { readData } from "../apiService/crud";

export async function getAllBroadcast(query?: Query) {
  const res = await readData("/admin/broadcasts", ["Broadcast"], query);
  return res;
}
