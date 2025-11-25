import { baseApi } from "@/redux/api/baseApi";

const couriarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getCustomerById: builder.query({
            query: (id) => ({
                url: `/customers/${id}`,
                method: "GET",
            }),
        }),
        createCouriar: builder.mutation({
            query: (data) => ({
                url: `/couriers`,
                method: "POST",
                body: data,
            }),
        }),
        createCouriarWithSteadFast: builder.mutation({
            query: (data) => ({
                url: `/couriers/with-steadfast`,
                method: "POST",
                body: data,
            }),
        }),
        updateCouriarStatus: builder.mutation({
            query: (payload) => ({
                url: `/couriers/${payload.id}/status`,
                method: "POST",
                body: payload.data,
            }),
        }),
        createSteadFastOrder: builder.mutation({
            query: (payload) => ({
                url: `/couriers/steadfast/create-order`,
                method: "POST",
                body: payload,
            }),
        }),
        checkStatusByInvoice: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/invoice/${id}`,
                method: "GET",
            }),
        }),
        checkStatusByConsignmentId: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/consignment/${id}`,
                method: "GET",
            }),
        }),
        checkStatusByTrackingCode: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/tracking/${id}`,
                method: "GET",
            }),
        }),
        getAllCouriar: builder.query({
            query: (payload) => ({
                url: `/couriers/?status=${payload.status}&search=${payload.search}&page=${payload.page}&limit=${payload.limit}`,
                method: "GET",
            }),
        }),
        getCouriarDetailsById: builder.query({
            query: (id) => ({
                url: `/couriers/${id}`,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useGetCustomerByIdQuery,
    useCreateCouriarMutation,
    useCreateCouriarWithSteadFastMutation,
    useUpdateCouriarStatusMutation,
    useCreateSteadFastOrderMutation,
    useLazyCheckStatusByInvoiceQuery,
    useLazyCheckStatusByConsignmentIdQuery,
    useLazyCheckStatusByTrackingCodeQuery,
    useLazyGetAllCouriarQuery,
    useLazyGetCouriarDetailsByIdQuery
} = couriarApi;
