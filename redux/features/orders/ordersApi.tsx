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
      }),
      providesTags: ["orders"],
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders?${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["orders"],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getCustomerSummary: builder.query({
      query: (customerId) => ({
        url: `/orders/customer/${customerId}/summary`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getCustomerAllOrders: builder.query({
      query: (params) => ({
        url: `/orders/customer/${params?.customerId}?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getAgentOrderSummary: builder.query<AgentOrderSummaryResponse, void>({
      query: () => ({
        url: "/orders/stats/my",
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
    getAgentOrders: builder.query({
      query: (params) => ({
        url: `/orders/my?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["orders"],
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
} = ordersApi;
