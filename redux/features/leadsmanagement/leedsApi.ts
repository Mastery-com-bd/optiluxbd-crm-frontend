import { baseApi } from "@/redux/api/baseApi";

const leedsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllteams: builder.query({
      query: () => ({
        url: `/allocations/admin/teams`,
        method: "GET",
      }),
      providesTags: ["leads"],
    }),
    assignAGentToLeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned-agents"],
    }),
    removeAgentsFromALeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/remove`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads", "unassigned-agents"],
    }),

    assignCustomerToLeaders: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads"],
    }),
  }),
});

export const {
  useGetAllteamsQuery,
  useAssignAGentToLeaderMutation,
  useRemoveAgentsFromALeaderMutation,
  useAssignCustomerToLeadersMutation,
} = leedsApi;
