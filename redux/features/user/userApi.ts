import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login user profile
    getMyProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    // admin can get all users
    getAllUsers: builder.query({
      query: (params = {}) => ({
        url: `/users?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["user"],
      keepUnusedDataFor: 3000,
    }),
    // admin can get all unassign agent
    getAllUnassignedAgents: builder.query({
      query: (params = {}) => ({
        url: `/users/unassigned-agents?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["unassigned-agents"],
    }),
    // admin can get all user who has no role
    getUnassignedUsers: builder.query({
      query: (params = {}) => ({
        url: `/users/without-roles?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["unassigned-user"],
    }),
    // admin can get a single user
    getASingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
      keepUnusedDataFor: 3000,
    }),
    // user image upload system
    userImageUpload: builder.mutation({
      query: (data) => ({
        url: `/images/users/${data.id}/avatar`,
        method: "POST",
        body: data.formData,
      }),
      invalidatesTags: ["user"],
    }),
    // image delete system
    deleteUserImage: builder.mutation({
      query: (id) => ({
        url: `/images/users/${id}/avatar`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    // user can update his information
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: `/users/${data.id}`,
        method: "PUT",
        body: data.currentUser,
      }),
      invalidatesTags: ["user"],
    }),
    // admin can update a users status
    updateUSerStatus: builder.mutation({
      query: ({ data, id }) => ({
        url: `/auth/users/${id}/status`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    // admin can suspoend a user
    suspendUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/suspend`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    // admin can activate a user
    activateUser: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/activate`,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
    // admin can manually create a user
    createUserByAdmin: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    // admin can delete a user
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
