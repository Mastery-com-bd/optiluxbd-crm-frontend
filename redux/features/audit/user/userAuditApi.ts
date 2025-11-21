import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const userAuditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAudit: builder.query({
      query: (params = {}) => ({
        url: `audit/me?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["my activity"],
    }),
  }),
});
export const { useGetMyAuditQuery } = userAuditApi;
