import { baseApi } from "@/redux/api/baseApi";

const leadsAgentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAssignCustomers: builder.query({
            query: () => ({
                url: `/allocations/agent/customers`,
                method: "GET",
            }),
        }),
        updateOrderStatus: builder.mutation({
            query: (data) => ({
                url: `/contacts/log`,
                method: "POST",
                body: data.status,
            }),
        }),
    }),
});

export const { useGetAssignCustomersQuery } = leadsAgentsApi;
