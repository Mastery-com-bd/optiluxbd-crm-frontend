/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";

export const getAllPlans = async () => {
  try {
    const res = await fetch(
      `${config.next_public_base_api}/subscriptions/plans`,
      {
        method: "GET",
        next: {
          tags: ["Plans"],
          revalidate: 30,
        },
      },
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
