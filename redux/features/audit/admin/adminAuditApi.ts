import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const adminAuditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecentAudit: builder.query({
      query: (params = {}) => ({
        url: `/audit/recent?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
    getUserAudit: builder.query({
      query: (data) => ({
        url: `/audit/user/${data.id}?${buildParams(data.filters)}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
    getCustomerHistory: builder.query({
      query: (data) => ({
        url: `/audit/entity/Customer/${data.id}?${buildParams(data.filters)}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
    getOrderHistory: builder.query({
      query: (id) => ({
        url: `/audit/entity/Order/${id}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
    getProductHistory: builder.query({
      query: (data) => ({
        url: `/audit/entity/Product/${data.id}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
    getUserHistory: builder.query({
      query: (id) => ({
        url: `/audit/entity/User/${id}`,
        method: "GET",
      }),
      providesTags: ["activity"],
    }),
  }),
});
export const {
  useGetRecentAuditQuery,
  useGetUserAuditQuery,
  useGetCustomerHistoryQuery,
  useGetOrderHistoryQuery,
  useGetProductHistoryQuery,
  useGetUserHistoryQuery,
} = adminAuditApi;
