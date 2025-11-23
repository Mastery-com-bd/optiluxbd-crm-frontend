/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/config";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: config.next_public_base_api,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 401) {
    const res = await fetch(
      `${config.next_public_base_api}/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data?.data) {
      // const user = (api.getState() as RootState).auth.user;
      // api.dispatch(
      //   setUser({
      //     // user,
      //     token: data.data,
      //   })
      // );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: [
    "user",
    "products",
    "combo-package",
    "settings",
    "leads",
    "unassigned-agents",
    "customers for leaders",
    "unassigned customers",
    "customers",
    "team-members",
    "team-report",
    "roles",
    "permissions",
    "notifications",
    "orders",
    "my activity",
    "activity",
    "address",
  ],
  endpoints: () => ({}),
});
