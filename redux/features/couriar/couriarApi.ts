import { baseApi } from "@/redux/api/baseApi";

const couriarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* Create Couriar to Local Database ✅ */
        createCouriar: builder.mutation({
            query: (data) => ({
                url: `/couriers`,
                method: "POST",
                body: data,
            }),
        }),

        /* fetches customer details from customer record. with couriar details ✅ */
        getAllCouriar: builder.query({
            query: (payload) => ({
                url: `/couriers/?${payload.status ? `status=${payload.status}` : null}&${payload.search ? `search=${payload.search}` : null}&page=${payload.page}&limit=${payload.limit}`,
                method: "GET",
            }),
        }),

        /* Create Courier with Steadfast Integration (Manual Input) ✅ */
        createCouriarWithSteadFast: builder.mutation({
            query: (data) => ({
                url: `/couriers/with-steadfast`,
                method: "POST",
                body: data,
            }),
        }),

        /* Create Courier from Order (Auto-fetch Customer Details) ✅ */
        createCouriarFromOrder: builder.mutation({
            query: (payload) => ({
                url: `/couriers/from-order`,
                method: "POST",
                body: payload,
            }),
        }),

        /* Get Courier Details by ID ✅ */
        getCouriarDetailsById: builder.query({
            query: (id) => ({
                url: `/couriers/${id}`,
                method: "GET",
            }),
        }),

        /* Update Courier Status by ID ✅ */
        updateCouriarStatus: builder.mutation({
            query: (payload) => ({
                url: `/couriers/${payload.id}/status`,
                method: "PATCH",
                body: payload.data,
            }),
        }),

        /* Create Bulk Steadfast Order from Order ✅ */
        createBulkSteadFastFromOrder: builder.mutation({
            query: (payload) => ({
                url: `/couriers/steadfast/bulk-from-orders`,
                method: "POST",
                body: payload,
            }),
        }),

        /* Check Steadfast Order Status by Invoice ID ✅ */
        checkStatusByInvoice: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/invoice/${id}`,
                method: "GET",
            }),
        }),

        /* Check Steadfast Order Status by Tracking Code ✅ */
        checkStatusByTrackingCode: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/tracking/${id}`,
                method: "GET",
            }),
        }),

        /* Check Steadfast Order Status by Consignment ID ✅ */
        checkStatusByConsignmentId: builder.query({
            query: (id) => ({
                url: `couriers/steadfast/status/consignment/${id}`,
                method: "GET",
            }),
        }),


        /* Check Current Couriar Balance ✅ */
        checkSteadfastBalance: builder.query({
            query: () => ({
                url: `/couriers/steadfast/balance`,
                method: "GET",
            }),
        }),

        /* Return request in steadfast ✅ */
        createSteadfastReturnRequest: builder.mutation({
            query: (payload) => ({
                url: `/couriers/steadfast/return-request`,
                method: "POST",
                body: payload,
            }),
        }),

        /* Get All Steadfast Return Request ✅ */
        getAllSteadfastReturnRequest: builder.query({
            query: () => ({
                url: `/couriers/steadfast/return-requests`,
                method: "GET",
            }),
        }),

        /* Get Steadfast Return Request by ID ✅ */
        getSteadfastReturnRequestById: builder.query({
            query: (id) => ({
                url: `/couriers/steadfast/return-request/${id}`,
                method: "GET",
            }),
        }),





        /* Create Steadfast Order */
        /* createSteadFastOrder: builder.mutation({
            query: (payload) => ({
                url: `/couriers/steadfast/create-order`,
                method: "POST",
                body: payload,
            }),
        }), */

        /* Create Bulk Steadfast Order */
        /* createBulkSteadFastOrder: builder.mutation({
            query: (payload) => ({
                url: `/couriers/steadfast/bulk-order`,
                method: "POST",
                body: payload,
            }),
        }), */

    }),
})


export const {
    useCreateCouriarMutation,
    useGetAllCouriarQuery,
    useCreateCouriarWithSteadFastMutation,
    useCreateCouriarFromOrderMutation,
    useGetCouriarDetailsByIdQuery,
    useUpdateCouriarStatusMutation,
    useLazyCheckStatusByInvoiceQuery,
    useLazyCheckStatusByConsignmentIdQuery,
    useLazyCheckStatusByTrackingCodeQuery,
    useCheckSteadfastBalanceQuery,
    useCreateSteadfastReturnRequestMutation,
    useGetAllSteadfastReturnRequestQuery,
    useLazyGetSteadfastReturnRequestByIdQuery,
    useCreateBulkSteadFastFromOrderMutation,

} = couriarApi;
