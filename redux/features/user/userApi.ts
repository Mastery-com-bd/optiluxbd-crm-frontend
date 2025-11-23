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
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
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
      keepUnusedDataFor: 3000,
    }),
    getAllUnassignedAgents: builder.query({
      query: (params = {}) => ({
        url: `/users/unassigned-agents?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["unassigned-agents"],
    }),
    getUnassignedUsers: builder.query({
      query: (params = {}) => ({
        url: `/users/without-roles?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["unassigned-agents"],
    }),
    getASingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
      keepUnusedDataFor: 3000,
    }),
    userImageUpload: builder.mutation({
      query: (data) => ({
        url: `/images/users/${data.id}/avatar`,
        method: "POST",
        body: data.formData,
      }),
      invalidatesTags: ["user"],
    }),
    deleteUserImage: builder.mutation({
      query: (id) => ({
        url: `/images/users/${id}/avatar`,
        method: "DELETE",
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
    updateUSerStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/auth/users/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    activateUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/activate`,
        method: "POST",
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

export const {
  useGetProfileQuery,
  useGetMyProfileQuery,
  useGetAllUsersQuery,
  useGetAllUnassignedAgentsQuery,
  useGetUnassignedUsersQuery,
  useGetASingleUserQuery,
  useUserImageUploadMutation,
  useUpdateUserInfoMutation,
  useUpdateUSerStatusMutation,
  useCreateUserByAdminMutation,
  useDeleteUserMutation,
  useSuspendUserMutation,
  useActivateUserMutation,
  useDeleteUserImageMutation,
} = authApi;
