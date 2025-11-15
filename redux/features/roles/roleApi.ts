import { baseApi } from "@/redux/api/baseApi";

const rolesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        /* getProfile: builder.query({
          query: () => ({
            url: `/auth/profile`,
            method: "GET",
          }),
          providesTags: ["user"],
        }), */
        getAllRoles: builder.query({
            query: () => ({
                url: `/roles`,
                method: "GET",
            }),
        }),
        getRoleById: builder.query({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "GET",
            }),
        }),
        addRole: builder.mutation({
            query: (data) => ({
                url: `/roles`,
                method: "POST",
                body: data,
            }),
        }),
        updateRoleInfo: builder.mutation({
            query: (data) => ({
                url: `/roles/${data.id}/permissions`,
                method: "PATCH",
                body: data.permissions,
            }),
        }),
    }),
});

export const { useGetAllRolesQuery, useGetRoleByIdQuery, useAddRoleMutation, useUpdateRoleInfoMutation } = rolesApi;
