import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (productInfo) => ({
        url: "/products",
        method: "POST",
        body: productInfo,
      }),
      invalidatesTags: ["products"],
    }),
    addProductImage: builder.mutation({
      query: ({ id, image }) => {
        const formData = new FormData();
        formData.append("product_image", image);
        return {
          url: `/images/products/${id}/image`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),
    getAllProduct: builder.query({
      query: (params) => ({
        url: `/products?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});
export const {
  useAddProductMutation,
  useAddProductImageMutation,
  useUpdateProductMutation,
  useGetAllProductQuery,
  useDeleteProductMutation,
} = productsApi;
