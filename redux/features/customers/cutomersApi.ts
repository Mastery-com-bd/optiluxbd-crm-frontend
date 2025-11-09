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

export const { useGetAllCustomerQuery, useAddCustomerMutation, useUpdateCustomerInfoMutation } = customersApi;