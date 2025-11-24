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

    createANewAddress: builder.mutation({
      query: (data) => ({
        url: `/addresses`,
        method: "POST",
        body: data,
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
  useCreateANewAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
