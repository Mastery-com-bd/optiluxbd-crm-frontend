import { baseApi } from "@/redux/api/baseApi";

const customerAddress = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCustomerAddress: builder.query({
            query: (id) => ({
                url: `/addresses/customer/${id}`,
                method: "GET",
            }),
            providesTags: ["address"]
        })
    }),
});

export const {
    useGetCustomerAddressQuery,
} = customerAddress;
