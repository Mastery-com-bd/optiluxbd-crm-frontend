"use server";
import { readPublicData } from "@/service/apiService/crud";
import { Query } from "@/types/shared";

export async function getAllPlan(query?: Query) {
  const res = await readPublicData("/subscriptions/plans", ["Plan"], query);
  return res;
}
