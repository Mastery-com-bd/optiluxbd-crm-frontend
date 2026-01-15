/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Product } from "@/types/product";
import { getValidToken } from "../authService/validToken";
import { config } from "@/config";
import { cookies } from "next/headers";
import { buildParams } from "@/utills/paramsBuilder";
import { revalidateTag } from "next/cache";

export const createProduct = async (data: Product) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/products`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidateTag("Products", "default");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllProduct = async (query?: {
  [key: string]: string | string[] | undefined;
}) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")!.value;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/products?${buildParams(query)}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
        next: {
          tags: ["Products"],
        },
      }
    );
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
