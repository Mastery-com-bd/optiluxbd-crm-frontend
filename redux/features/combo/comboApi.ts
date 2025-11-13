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
    createCombo: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["combo-package", "products"],
    }),
  }),
});
export const { useGetAllComboPackageQuery, useCreateComboMutation } = comboApi;
