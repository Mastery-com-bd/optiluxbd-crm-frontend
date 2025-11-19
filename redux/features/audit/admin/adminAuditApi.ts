import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const adminAuditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentAudit: builder.query({
      query: (params = {}) => ({
        url: `audit/recent?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: [
        "customers",
        "products",
        "user",
        "orders",
        "combo-package",
        "roles",
        "permissions",
      ],
    }),
  }),
});
export const { useGetRecentAuditQuery } = adminAuditApi;
