import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET"
            }),
            providesTags: ["category"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["category"],
        }),
        updateCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/categories/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["category"],
        }),
        addCategory: builder.mutation({
            query: (body) => ({
                url: "/categories",
                method: "POST",
                body,
            }),
            invalidatesTags: ["category"],
        })
    })
})
export const {
    useGetAllCategoryQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useAddCategoryMutation,
}
    = categoryApi;