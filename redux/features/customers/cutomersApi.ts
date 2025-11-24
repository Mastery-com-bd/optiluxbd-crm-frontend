import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomer: builder.query({
      query: (params = {}) => ({
        url: `/customers?${buildParams(params)}`,
        method: "GET",
      }),
    }),
    getUnassignedCustomersByAdmin: builder.query({
      query: (params = {}) => ({
        url: `/customers/unassigned?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["unassigned customers", "customers"],
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "GET",
      }),
    }),
    addCustomer: builder.mutation({
      query: (data) => ({
        url: `/customers`,
        method: "POST",
        body: data,
      }),
    }),
    updateCustomerInfo: builder.mutation({
      query: (data) => ({
        url: `/customers/${data.id}`,
        method: "PUT",
        body: data.currentCustomer,
      }),
    }),
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  useUpdateCustomerInfoMutation,
  useGetUnassignedCustomersByAdminQuery,
} = customersApi;
