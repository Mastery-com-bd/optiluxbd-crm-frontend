import { baseApi } from "@/redux/api/baseApi";

const complainApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllComplain: builder.query({
            query: () => ({
                url: "/complains",
                method: "GET",
            })
        }),
        updateComplain: builder.mutation({
            query: ({ id, body }) => ({
                url: `/complains/${id}`,
                method: "PATCH",
                body,
            })
        }),
        deleteComplain: builder.mutation({
            query: (id) => ({
                url: `/complains/${id}`,
                method: "DELETE",
            })
        })
    }),
});
export const {
    useGetAllComplainQuery,
    useUpdateComplainMutation,
    useDeleteComplainMutation,
} = complainApi;
