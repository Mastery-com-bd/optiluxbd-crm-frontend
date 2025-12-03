import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const adminLeedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all teams
    getAllteams: builder.query({
      query: () => ({
        url: `/allocations/admin/teams`,
        method: "GET",
      }),
      providesTags: ["leads"],
    }),
    // get team reports
    getAdminTeamReports: builder.query({
      query: (params = {}) => ({
        url: `/allocations/admin/reports?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["leads"],
    }),
    // assign single agent to team
    assignAGentToLeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned-agents"],
    }),
    // assign multiple agent to team
    assignMultipleAgentToLeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/assign-bulk`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned-agents"],
    }),
    // remove agent from leader
    removeAgentsFromALeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/remove`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned-agents"],
    }),
    // assign custoemr to leader
    assignCustomerToLeaders: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned customers", "customers"],
    }),
    // assign team target
    assignTeamtarget: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/target`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned customers", "customers"],
    }),
  }),
});

export const {
  useGetAllteamsQuery,
  useGetAdminTeamReportsQuery,
  useAssignAGentToLeaderMutation,
  useAssignMultipleAgentToLeaderMutation,
  useRemoveAgentsFromALeaderMutation,
  useAssignCustomerToLeadersMutation,
  useAssignTeamtargetMutation,
} = adminLeedsApi;
