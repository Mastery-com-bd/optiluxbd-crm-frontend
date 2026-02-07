/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getValidToken } from "../authService/validToken";

export const getUserPermisssion = async () => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/permissions`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Users"],
        revalidate: 120,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
