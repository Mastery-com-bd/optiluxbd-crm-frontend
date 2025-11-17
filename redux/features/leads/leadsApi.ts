import { baseApi } from "@/redux/api/baseApi";

const leadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeads: builder.query({
      query: () => ({
        url: `/allocations/leader/customers`,
        method: "GET",
      }),
      providesTags: ["customers for leaders"],
    }),
    getAllTeamMembers: builder.query({
      query: () => ({
        url: `/allocations/leader/team`,
        method: "GET",
      }),
      providesTags: ["team-members"],
    }),
    getAllInProgressLeads: builder.query({
      query: () => ({
        url: `/allocations/leader/inprogress`,
        method: "GET",
      }),
    }),
    getTeamReport: builder.query({
      query: () => ({
        url: `/allocations/leader/reports`,
        method: "GET",
      }),
      providesTags: ["team-report"],
    }),
    getAllUnAssignedCustomers: builder.query({
      query: () => ({
        url: `/allocations/leader/customers/unassigned`,
        method: "GET",
      }),
      providesTags: ["unassigned customers"],
    }),
    customerDistributionToAgent: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/distribute`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unassigned customers", "team-members"],
    }),
    autoDistributeCustomerToAgent: builder.mutation({
      query: () => ({
        url: `/allocations/leader/auto-distribute`,
        method: "POST",
      }),
      invalidatesTags: ["unassigned customers", "team-members"],
    }),
    acceptBatch: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/accept`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unassigned customers", "team-report"],
    }),
    rejectBatch: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/reject`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unassigned customers", "team-report"],
    }),
    /*  getRoleById: builder.query({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "GET",
            }),
        }),
        addRole: builder.mutation({
            query: (data) => ({
                url: `/roles`,
                method: "POST",
                body: data,
            }),
        }),
        updateRoleInfo: builder.mutation({
            query: (data) => ({
                url: `/roles/${data.id}/permissions`,
                method: "PATCH",
                body: data.permissions,
            }),
        }), */
  }),
});

export const {
  useGetAllLeadsQuery,
  useGetAllTeamMembersQuery,
  useGetAllInProgressLeadsQuery,
  useGetTeamReportQuery,
  useGetAllUnAssignedCustomersQuery,
  useCustomerDistributionToAgentMutation,
  useAutoDistributeCustomerToAgentMutation,
  useAcceptBatchMutation,
  useRejectBatchMutation,
} = leadsApi;
