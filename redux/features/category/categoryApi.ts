import { baseApi } from "@/redux/api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        //Category Endpoints
        getAllCategory: builder.query({
            query: () => ({
                url: "/categories",
                method: "GET",
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
        }),

        //Subcategory Endpoints
        getSubcategory: builder.query({
            query: () => ({
                url: "/subcategories",
                method: "GET",
            }),
            providesTags: ["subcategories"],
        }),

        deleteSubCategory: builder.mutation({
            query: (id) => ({
                url: `/subcategories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["subcategories"],
        }),

        updateSubCategory: builder.mutation({
            query: ({ id, body }) => ({
                url: `/subcategories/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["subcategories"],
        }),

        addSubCategory: builder.mutation({
            query: (body) => ({
                url: "/subcategories",
                method: "POST",
                body,
            }),
            invalidatesTags: ["subcategories"],
        }),

        getCategoryAndSubcategory: builder.query({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
            })
        })
    }),
});

export const {
    //Category Hooks
    useGetAllCategoryQuery,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useAddCategoryMutation,

    //Subcategory Hooks
    useGetSubcategoryQuery,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useAddSubCategoryMutation,

    useGetCategoryAndSubcategoryQuery,
} = categoryApi;