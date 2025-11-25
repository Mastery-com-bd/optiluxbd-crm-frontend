import { baseApi } from "@/redux/api/baseApi";

const addressApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyAddress: builder.query({
      query: () => ({
        url: `/addresses`,
        method: "GET",
      }),
      providesTags: ["address", "user"],
    }),

    getAddressById: builder.query({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "GET",
      }),
      providesTags: ["address", "user"],
    }),

    createAddress: builder.mutation({
      query: (payload) => ({
        url: `/addresses`,
        method: "POST",
        body: payload,
      }),
    }),

    createANewAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["address", "user"],
    }),
    createANewAddressByAdmin: builder.mutation({
      query: (data) => ({
        url: `/addresses/${data.id}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: ["address", "user"],
    }),

    UpdateAddress: builder.mutation({
      query: ({ id, currentAddressInfo }) => ({
        url: `/addresses/${id}`,
        method: "PUT",
        body: currentAddressInfo,
      }),
      invalidatesTags: ["address", "user"],
    }),

    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["address", "user"],
    }),
  }),
});

export const {
  useGetMyAddressQuery,
  useGetAddressByIdQuery,
  useCreateAddressMutation,
  useCreateANewAddressMutation,
  useCreateANewAddressByAdminMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;