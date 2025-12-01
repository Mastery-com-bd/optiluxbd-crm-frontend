import { baseApi } from "@/redux/api/baseApi";

const teamLeaderLeadsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all leadds assigned to the leader
    getAllLeads: builder.query({
      query: () => ({
        url: `/allocations/leader/customers`,
        method: "GET",
      }),
      providesTags: ["customers for leaders"],
    }),
    // get all team members to a team
    getAllTeamMembers: builder.query({
      query: () => ({
        url: `/allocations/leader/team`,
        method: "GET",
      }),
      providesTags: ["team-members"],
    }),
    // get in progress leads
    getAllInProgressLeads: builder.query({
      query: () => ({
        url: `/allocations/leader/inprogress`,
        method: "GET",
      }),
      providesTags: ["pending-leads"],
    }),
    // get team report
    getTeamReport: builder.query({
      query: () => ({
        url: `/allocations/leader/reports`,
        method: "GET",
      }),
      providesTags: ["team-report"],
    }),
    // get unassigned customer
    getAllUnAssignedCustomers: builder.query({
      query: () => ({
        url: `/allocations/leader/customers/unassigned`,
        method: "GET",
      }),
      providesTags: ["unassigned customers"],
    }),
    // customer distribute to agent
    customerDistributionToAgent: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/distribute`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["unassigned customers"],
    }),

    autoDistributeCustomerToAgent: builder.mutation({
      query: () => ({
        url: `/allocations/leader/auto-distribute`,
        method: "POST",
      }),
      invalidatesTags: ["unassigned customers"],
    }),
    acceptBatch: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/accept`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "unassigned customers",
        "team-report",
        "customers for leaders",
      ],
    }),
    rejectBatch: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader/reject`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [
        "unassigned customers",
        "team-report",
        "customers for leaders",
      ],
    }),
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
} = teamLeaderLeadsApi;
