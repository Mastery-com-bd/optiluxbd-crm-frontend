import { baseApi } from "@/redux/api/baseApi";

const leadsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        
        getAllLeads: builder.query({
            query: () => ({
                url: `/allocations/leader/customers`,
                method: "GET",
            }),
        }),
        getAllTeamMembers: builder.query({
            query: () => ({
                url: `/allocations/leader/team`,
                method: "GET",
            }),
        }),
       getAllInProgressLeads: builder.query({
            query: () => ({
                url: `/allocations/leader/inprogress`,
                method: "GET",
            }),
        }),
        /*  getRoleById: builder.query({
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
        }), */
    }),
});

export const { useGetAllLeadsQuery, useGetAllTeamMembersQuery, useGetAllInProgressLeadsQuery } = leadsApi;
