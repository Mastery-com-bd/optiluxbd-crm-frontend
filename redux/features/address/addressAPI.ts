import { baseApi } from "@/redux/api/baseApi";

const addressApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAddress: builder.mutation({
            query: (payload) => ({
                url: `/addresses`,
                method: "POST",
                body: payload,
            }),
        }),
    }),
});

export const {
    useCreateAddressMutation,
} = addressApi;
