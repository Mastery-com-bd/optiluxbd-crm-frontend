import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    userImageUpload: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/users/${id}/avatar`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        body: data.currentUser,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetProfileQuery } = authApi;
export const { useUserImageUploadMutation } = authApi;
export const { useUpdateUserInfoMutation } = authApi;
