"use server";

import { Query } from "@/types/shared";
import { readData } from "../apiService/crud";

export async function getAllCustomer(query?: Query) {
  const res = await readData("/customers", ["Customers"], query);
  return res;
}

export async function getCustomerById(id: number) {
  const res = await readData(`/customers/${id}`, ["Customer"]);
  return res;
}

export async function getCustomerByCustomId(id: number) {
  const res = await readData(`/customers/custom/${id}`, ["Customers"]);
  return res;
}

export async function getUnAssignedCustomer(query?: Query) {
  const res = await readData("/customers/unassigned", ["Customers"], query);
  return res;
}

export async function getCustomerPurchaseHistiory(id: number) {
  const res = await readData(`/customers/${id}/purchases`, [
    "Purchase-history",
  ]);
  return res;
}
