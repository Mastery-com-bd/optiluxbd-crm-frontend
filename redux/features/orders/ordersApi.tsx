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
    }),
});
export const {
    useGetAllOrdersQuery,
    useDeleteOrderMutation,
} = ordersApi;
