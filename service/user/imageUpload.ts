/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { cookies } from "next/headers";

export const userImageUpload = async (id: number, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("avatar", imageFile);
    const accessToken = (await cookies()).get("accessToken")?.value;
    if (!accessToken) {
      throw new Error("No access token found. Please login again.");
    }
    const res = await fetch(
      `${config.next_public_base_api}/users/${id}/avatar`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
        credentials: "include",
      }
    );
    const result = await res.json();

    return result;
  } catch (error: any) {
    return error.message;
  }
};
