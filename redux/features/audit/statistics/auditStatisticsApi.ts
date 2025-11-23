import { baseApi } from "@/redux/api/baseApi";

const auditStatisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditStatistics: builder.query({
      query: () => ({
        url: `/audit/statistics`,
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
