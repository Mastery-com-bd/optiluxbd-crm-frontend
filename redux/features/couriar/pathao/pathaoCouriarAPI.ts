import { baseApi } from "@/redux/api/baseApi";

const pathaoCouriarApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        /* Create Couriar to Local Database ✅ */
        createPathaoCouriar: builder.mutation({
            query: (data) => ({
                url: `/pathao`,
                method: "POST",
                body: data,
            }),
        }),

        /* All Pathao Couriar Parcel List */
        getAllPathaoCouriar: builder.query({
            query: (payload) => ({
                url: `/pathao?${payload.status ? `status=${payload.status}` : null}&${payload.search ? `search=${payload.search}` : null}&${payload.page ? `page=${payload.page}` : null}&${payload.limit ? `limit=${payload.limit}` : null}`,
                method: "GET",
            }),
        }),

        /* Get Pathao Couriar Details By ID */
        getPathaoCouriarDetailsById: builder.query({
            query: (consignmentId) => ({
                url: `/pathao/order/${consignmentId}/info`,
                method: "GET",
            }),
        }),

    }),
})


export const {
    useCreatePathaoCouriarMutation,
    useGetAllPathaoCouriarQuery,
    useGetPathaoCouriarDetailsByIdQuery,
    
} = pathaoCouriarApi;
