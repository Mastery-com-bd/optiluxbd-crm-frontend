/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { config } from "@/config";
import { getAccesstoken } from "../authService";
import { getValidToken } from "../authService/validToken";
import { revalidatePath, revalidateTag } from "next/cache";

export type TCreateUserData = {
  name: string;
  email: string;
  roleId: number;
  phone: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "DISABLED" | "REJECTED";
  is_approved?: boolean | undefined;
  is_active?: boolean | undefined;
  isActive?: boolean | undefined;
  email_verified?: boolean | undefined;
  password?: string;
};

type TInviteUserForm = {
  name: string;
  email: string;
  roleId: number;
  phone: string;
};

export const getAllUser = async () => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/users`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      next: {
        tags: ["Users"],
        revalidate: 30,
      },
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const createNewUser = async (data: TCreateUserData) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/users`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["OrganizationUsers"],
        revalidate: 30,
      },
      body: JSON.stringify(data),
    });
    revalidatePath("/dashboard/admin/users");
    revalidateTag("OrganizationUsers", "default");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

import { buildParams } from "@/utills/paramsBuilder";

export const getAllOrganizationUser = async (query: Record<string, any> = {}) => {
  const token = (await getAccesstoken()) as string;
  try {
    const queryString = buildParams(query);
    const res = await fetch(`${config.next_public_base_api}/users?${queryString}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["OrganizationUsers"],
        revalidate: 30,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const getOrganizationUserById = async (id: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/users/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["OrganizationUsers"],
        revalidate: 30,
      },
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const updateOrganizationUserById = async (id: string, data: TCreateUserData) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(`${config.next_public_base_api}/users/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["OrganizationUsers"],
        revalidate: 30,
      },
      body: JSON.stringify(data),
    });
    revalidatePath("/dashboard/admin/users");
    revalidateTag("OrganizationUsers", "default");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};


export const RejectOrganizationUser = async (userId: string, reason: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${userId}/reject`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["OrganizationUsers"],
          revalidate: 30,
        },
        body: JSON.stringify({ reason }),
      },
    );
    revalidatePath("/dashboard/admin/users");
    revalidateTag("OrganizationUsers", "default");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const UpdateOrganizationUserStatus = async (userId: string, status: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${userId}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        next: {
          tags: ["OrganizationUsers"],
          revalidate: 30,
        },
        body: JSON.stringify({ status }),
      },
    );
    revalidatePath("/dashboard/admin/users");
    revalidateTag("OrganizationUsers", "default");
    const result = await res.json();
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const getUserById = async (id: string) => {
  const token = (await getAccesstoken()) as string;
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: {
          tags: ["Users"],
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

export const createUser = async (data: TCreateUserData) => {
  const token = await getValidToken();
  try {
    const res = await fetch(`${config.next_public_base_api}/admin/users`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const inviteUser = async (data: TInviteUserForm) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/invite`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (
  data: Partial<TCreateUserData>,
  id: number,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/status`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const approveUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/approve`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const suspendUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/auth/users/${id}/suspend`,
      {
        method: "POST",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

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

export const updateUser = async (
  data: Partial<TCreateUserData>,
  id: number,
) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteUser = async (id: number) => {
  const token = await getValidToken();
  try {
    const res = await fetch(
      `${config.next_public_base_api}/admin/users/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      },
    );
    const result = await res.json();
    revalidatePath("/dashboard/user");
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
