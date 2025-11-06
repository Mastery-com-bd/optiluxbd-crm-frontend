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
        })
    }),
});
export const {
    useAddProductMutation,
    useAddProductImageMutation,
    useUpdateProductMutation } = productsApi;
