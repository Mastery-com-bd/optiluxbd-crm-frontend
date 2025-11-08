/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { TLoginData } from "@/components/auth/Login";
import { config } from "@/config";

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
      return result;
    }
  } catch (error: any) {
    return Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/profile`, {
      method: "GET",
    });
    const result = await res.json();
    if (result?.success) {
      return result;
    }
  } catch (error: any) {
    return Error(error);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${config.next_public_base_api}/auth/logout`, {
      method: "POST",
    });
    const result = await res.json();
    if (result?.success) {
      return { success: true };
    } else {
      return {
        success: false,
        message: "logout faild",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An unexpected error occurred",
    };
  }
};
