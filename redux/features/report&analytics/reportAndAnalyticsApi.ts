import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const reportAndAnalyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // agents report
    getAgentReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/agent?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // teams report
    getTeamReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/team?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // get team hourly target
    getTeamHourlyTarget: builder.query({
      query: (params = {}) => ({
        url: `/reports/team/hourly-target?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // couriar report
    getCurrierReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/courier?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // products report
    getProductsReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/product?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // package report
    getPackagesReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/package?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // geographic report
    getGeographicReport: builder.query({
      query: (params = {}) => ({
        url: `/reports/geographic?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // daily report
    getDailyReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/daily?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // overview report
    getOverviewReports: builder.query({
      query: (params = {}) => ({
        url: `/reports/overview?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // hourly team report hourly
    getHourlyTeamReport: builder.query({
      query: (params = {}) => ({
        url: `/reports/hourly-team?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // hourly team target report
    getHourlyTeamTarget: builder.query({
      query: (params = {}) => ({
        url: `/reports/team/hourly-target?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // get agent report by leader
    getAgentReport: builder.query({
      query: () => ({
        url: `/reports/team/leader`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
    // get top products and top agents report
    getTopProductWithAgent: builder.query({
      query: () => ({
        url: `/reports/top-products/top-agents-month`,
        method: "GET",
      }),
      providesTags: ["reports"],
    }),
  }),
});
export const {
  useGetAgentReportsQuery,
  useGetTeamReportsQuery,
  useGetTeamHourlyTargetQuery,
  useGetCurrierReportsQuery,
  useGetProductsReportsQuery,
  useGetPackagesReportsQuery,
  useGetGeographicReportQuery,
  useGetDailyReportsQuery,
  useGetOverviewReportsQuery,
  useGetHourlyTeamReportQuery,
  useGetHourlyTeamTargetQuery,
  useGetAgentReportQuery,
  useGetTopProductWithAgentQuery,
} = reportAndAnalyticsApi;
