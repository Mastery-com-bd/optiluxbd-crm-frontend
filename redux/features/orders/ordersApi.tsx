import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: (params) => ({
                url: `/sales?${buildParams(params)}`,
                method: "GET",
            })
        }),
    }),
});
export const {
    useGetAllOrdersQuery,
} = ordersApi;
