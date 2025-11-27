import { baseApi } from "@/redux/api/baseApi";

const rolesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => ({
        url: `/roles`,
        method: "GET",
      }),
      providesTags: ["roles", "user"],
    }),
    getAllPermissions: builder.query({
      query: () => ({
        url: `/roles/permissions`,
        method: "GET",
      }),
      providesTags: ["permissions", "user"],
    }),
    getRoleById: builder.query({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "GET",
      }),
      providesTags: ["roles", "user"],
    }),
    addRole: builder.mutation({
      query: (data) => ({
        url: `/roles`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["roles", "user", "permissions"],
    }),
    updateRoleInfo: builder.mutation({
      query: (data) => ({
        url: `/roles/${data.id}/permissions`,
        method: "PATCH",
        body: data.permissions,
      }),
      invalidatesTags: ["roles", "user", "permissions"],
    }),
    assignRoleToUser: builder.mutation({
      query: ({ roleId, data }) => ({
        url: `/roles/${roleId}/assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["roles", "user", "permissions"],
    }),
    removeRoleFromUser: builder.mutation({
      query: ({ roleId, data }) => ({
        url: `/roles/${roleId}/remove`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["roles", "user", "permissions"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetAllPermissionsQuery,
  useGetRoleByIdQuery,
  useAddRoleMutation,
  useUpdateRoleInfoMutation,
  useAssignRoleToUserMutation,
  useRemoveRoleFromUserMutation,
} = rolesApi;
