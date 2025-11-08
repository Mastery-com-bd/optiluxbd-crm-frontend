/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TLoginData } from "@/components/auth/Login";
import { config } from "@/config";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const userLogin = async (data: TLoginData) => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (result?.success) {
      (await cookies()).set("refreshToken", result?.data?.token);
      return result;
    }
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  const refreshToken = (await cookies()).get("accessToken")?.value;
  let decodedData = null;
  if (refreshToken) {
    decodedData = await jwtDecode(refreshToken);
    return decodedData;
  } else {
    return null;
  }
};

export const logout = async () => {
  try {
    // const res = await fetch(`${config.next_public_base_api}/auth/logout`, {
    //   method: "POST",
    // });
    // const result = await res.json();
    // if (result?.success) {
    //   (await cookies()).set("accessToken", result?.data?.token);
    //   return result;
    // }
    (await cookies()).delete("accessToken");
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    const token = cookieStore.get("accessToken");
    if (!token || !token.value) {
      return {
        success: true,
        message: "Logged out successfully",
      };
    } else {
      return {
        success: false,
        message: "logout faild",
      };
    }
  } catch (error: any) {
    // return Error(error);
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
    };
  }
};
