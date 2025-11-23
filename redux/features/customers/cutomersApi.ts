import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const customersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* getProfile: builder.query({
          query: () => ({
            url: `/auth/profile`,
            method: "GET",
          }),
          providesTags: ["user"],
        }), */
        getAllCustomer: builder.query({
            query: (params = {}) => ({
                url: `/customers?${buildParams(params)}`,
                method: "GET",
            }),
            providesTags:["customers"]
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
            invalidatesTags:["customers"]
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
            }
        })
    }),
});

export const { useGetAllCustomerQuery, useGetCustomerByIdQuery, useAddCustomerMutation, useUpdateCustomerInfoMutation, useCreateCustomerAddressMutation } = customersApi;