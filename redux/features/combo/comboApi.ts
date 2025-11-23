import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const comboApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllComboPackage: builder.query({
      query: (params = {}) => ({
        url: `/packages?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["combo-package", "products"],
    }),
    getASingleCOmboPackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: ["combo-package", "products"],
    }),
    createCombo: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["combo-package", "products"],
    }),

    updateComboPackage: builder.mutation({
      query: ({ currentComboPackage, id }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: currentComboPackage,
      }),
      invalidatesTags: ["combo-package", "products"],
    }),
    deleteComboPackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["combo-package", "products"],
    }),
  }),
});
export const {
  useGetAllComboPackageQuery,
  useGetASingleCOmboPackageQuery,
  useCreateComboMutation,
  useUpdateComboPackageMutation,
  useDeleteComboPackageMutation,
} = comboApi;
