import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const customersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomer: builder.query({
      query: (params = {}) => ({
        url: `/customers?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["customers"]
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
      invalidatesTags: ["customers"]
    }),
    updateCustomerInfo: builder.mutation({
      query: (data) => ({
        url: `/customers/${data.id}`,
        method: "PUT",
        body: data.currentCustomer,
      }),
    }),
    createCustomerAddress: builder.mutation({
      query: ({ data, customerId }) => {
        console.log(customerId);
        return {
          url: `/addresses/customer/${customerId}`,
          method: "POST",
          body: data,
        }
      },
      invalidatesTags: ["customers"]
    })
  }),
});

export const {
  useGetAllCustomerQuery,
  useGetCustomerByIdQuery,
  useAddCustomerMutation,
  useUpdateCustomerInfoMutation, useCreateCustomerAddressMutation,
  useGetUnassignedCustomersByAdminQuery,
} = customersApi;
