import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const reportAndAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAgentReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/agent?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getTeamReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/team?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getCurrierReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/courier?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getProductsReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/product?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getPackagesReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/package?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getGeographicReport: builder.query({
      query: (params = {}) => ({
        url: `/reports/geographic?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getDailyReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/daily?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    getOverviewReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/overview?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
  }),
});
export const {
  useGetAgentReportsQuery,
  useGetTeamReportsQuery,
  useGetCurrierReportsQuery,
  useGetProductsReportsQuery,
  useGetPackagesReportsQuery,
  useGetGeographicReportQuery,
  useGetDailyReportsQuery,
  useGetOverviewReportsQuery,
} = reportAndAnalyticsApi;
