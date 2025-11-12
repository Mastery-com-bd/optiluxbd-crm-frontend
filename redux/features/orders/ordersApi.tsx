import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => ({
                url: `/orders?${buildParams(params)}`,
                method: "GET",
            })
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders?${id}`,
                method: "DELETE",
            })
        }),
        getSingleOrder: builder.query({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET",
            })
        })
    }),
});
export const {
    useGetAllOrdersQuery,
    useDeleteOrderMutation,
    useGetSingleOrderQuery,
} = ordersApi;
