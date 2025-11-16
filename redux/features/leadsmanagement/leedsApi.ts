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
      invalidatesTags: ["leads"],
    }),
    removeAgentsFromALeader: builder.mutation({
      query: (data) => ({
        url: `/allocations/admin/team/remove`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads"],
    }),
    assignCustomerToLeaders: builder.mutation({
      query: (data) => ({
        url: `/allocations/leader`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["leads"],
    }),
    autoDistributionCustomerToLeader: builder.mutation({
      query: () => ({
        url: `/allocations/leader/auto-distribute`,
        method: "POST",
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
  useAutoDistributionCustomerToLeaderMutation,
} = leedsApi;
