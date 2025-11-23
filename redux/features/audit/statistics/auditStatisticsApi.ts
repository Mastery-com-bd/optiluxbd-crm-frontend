import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const auditStatisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditStatistics: builder.query({
      query: (params = {}) => ({
        url: `/audit/statistics?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: [
        "user",
        "orders",
        "products",
        "combo-package",
        "customers",
        "leads",
      ],
    }),
  }),
});
export const { useGetAuditStatisticsQuery } = auditStatisticsApi;
