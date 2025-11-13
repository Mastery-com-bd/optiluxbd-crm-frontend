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
        }),
        getCustomerSummary: builder.query({
            query: (customerId) => ({
                url: `/orders/customer/${customerId}/summary`,
                method: "GET",
            })
        }),
        getCustomerAllOrders: builder.query({
            query: (customerId) => ({
                url: `/orders/customer/${customerId}`,
                method: "GET",
            })
        })
    }),
});
export const {
    useGetAllOrdersQuery,
    useDeleteOrderMutation,
    useGetSingleOrderQuery,
    useGetCustomerSummaryQuery,
    useGetCustomerAllOrdersQuery,

} = ordersApi;
