import { baseApi } from "@/redux/api/baseApi";

const leadsAgentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAssignCustomers: builder.query({
      query: () => ({
        url: `/allocations/agent/customers`,
        method: "GET",
      }),
      providesTags: ["customers"],
    }),
    getPendingCustomers: builder.query({
      query: () => ({
        url: `/allocations/agent/pending`,
        method: "GET",
      }),
    }),
    acceptPendingLeads: builder.mutation({
      query: (data) => ({
        url: `/allocations/agent/accept`,
        method: "POST",
        body: data,
      }),
    }),
    rejectPendingLeads: builder.mutation({
      query: (data) => ({
        url: `/allocations/agent/reject`,
        method: "POST",
        body: data,
      }),
    }),
    updateLeadStatus: builder.mutation({
      query: (data) => ({
        url: `/contacts/log`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAssignCustomersQuery,
  useGetPendingCustomersQuery,
  useAcceptPendingLeadsMutation,
  useRejectPendingLeadsMutation,
  useUpdateLeadStatusMutation,
} = leadsAgentsApi;
