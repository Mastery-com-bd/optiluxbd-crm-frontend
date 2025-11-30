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
                url: `/pathao?status=${payload.status}&search=${payload.search}&page=${payload.page}&limit=${payload.limit}`,
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
