import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllUsers: builder.query({
      query: (params = {}) => ({
        url: `/users?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    userImageUpload: builder.mutation({
      query: (data) => ({
        url: `/images/users/${data.id}/avatar`,
        method: "POST",
        body: data.formData,
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
    createUserByAdmin: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetProfileQuery } = authApi;
export const { useGetAllUsersQuery } = authApi;
export const { useUserImageUploadMutation } = authApi;
export const { useUpdateUserInfoMutation } = authApi;
export const { useCreateUserByAdminMutation } = authApi;
export const { useDeleteUserMutation } = authApi;
