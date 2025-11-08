import { baseApi } from "@/redux/api/baseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addProduct: builder.mutation({
            query: (productInfo) => ({
                url: "/products",
                method: "POST",
                body: productInfo,
            }),
        }),
        addProductImage: builder.mutation({
            query: ({ id, image }) => {
                const formData = new FormData()
                formData.append("product_image", image)

                return {
                    url: `/images/products/${id}/image`,
                    method: "POST",
                    body: formData,
                }
            },
        }),
        updateProduct: builder.mutation({
            query: ({ id, data }) => ({
                url: `/products/${id}`,
                method: "PATCH",
                body: data,
            })
        }),
        getAllProduct: builder.query({
            query: ({ page, limit }) => ({
                url: `/products?page=${page}&limit=${limit}`,
                method: "GET",
            })
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
            })
        })
    }),
});
export const {
    useAddProductMutation,
    useAddProductImageMutation,
    useUpdateProductMutation,
    useGetAllProductQuery,
    useDeleteProductMutation,
} = productsApi;
