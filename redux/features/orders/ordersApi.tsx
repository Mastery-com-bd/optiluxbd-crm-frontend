import { baseApi } from "@/redux/api/baseApi";
import { AgentOrderSummary } from "@/types/orders";
import { buildParams } from "@/utills/paramsBuilder";
interface AgentOrderSummaryResponse {
  data: AgentOrderSummary;
}
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
      query: (params) => ({
        url: `/orders/customer/${params?.customerId}?${buildParams(params)}`,
        method: 'GET',
      }),
    }),
    getAgentOrderSummary: builder.query<AgentOrderSummaryResponse, void>({
      query: () => ({
        url: "/orders/stats/my",
        method: "GET",
      })
    }),
    getAgentOrders: builder.query({
      query: (params) => ({
        url: `/orders/my?${buildParams(params)}`,
        method: "GET"
      })
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags:["customers", "orders"]
    }),
  }),
});
export const {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useGetCustomerSummaryQuery,
  useGetCustomerAllOrdersQuery,
  useGetAgentOrderSummaryQuery,
  useGetAgentOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
