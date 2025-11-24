import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const reportAndAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/summary/my`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getOrdersSummary: builder.query({
      query: (params = {}) => ({
        url: `/orders/summary?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getTopProductsByOrder: builder.query({
      query: (params = {}) => ({
        url: `/orders/analytics/top-products?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getOrdersByMonth: builder.query({
      query: (params = {}) => ({
        url: `/orders/analytics/by-month?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});
export const {
  useGetMyOrdersQuery,
  useGetOrdersSummaryQuery,
  useGetTopProductsByOrderQuery,
  useGetOrdersByMonthQuery,
} = reportAndAnalyticsApi;
