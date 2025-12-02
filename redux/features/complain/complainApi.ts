import { baseApi } from "@/redux/api/baseApi";

const complainApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllComplain: builder.query({
            query: () => ({
                url: "/complains",
                method: "GET",
            }),
            providesTags: ["complain"],
        }),
        updateComplain: builder.mutation({
            query: ({ id, body }) => ({
                url: `/complains/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["complain"]
        }),
        deleteComplain: builder.mutation({
            query: (id) => ({
                url: `/complains/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["complain"]
        }),
        addComplain: builder.mutation({
            query: (body) => ({
                url: "/complains",
                method: "POST",
                body,
            }),
            invalidatesTags: ["complain"]
        }),
        updateComplainStatus: builder.mutation({
            query: ({ id, body }) => ({
                url: `/complains/${id}/status`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["complain"],
        })
    }),
});
export const {
    useGetAllComplainQuery,
    useUpdateComplainMutation,
    useDeleteComplainMutation,
    useAddComplainMutation,
    useUpdateComplainStatusMutation,
} = complainApi;
