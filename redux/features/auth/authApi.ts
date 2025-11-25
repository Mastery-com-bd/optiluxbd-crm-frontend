import { TRejectApiType } from "@/components/pages/dashboard/admin/approve-user/ApproveUSerAction";
import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: "GET",
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),
    validateresetToken: builder.query({
      query: (token) => ({
        url: `/auth/reset-password/${token}/validate`,
        method: "GET",
      }),
    }),
    resetPassword: builder.mutation({
      query: (args) => ({
        url: `/auth/reset-password/${args.token}`,
        method: "POST",
        body: args.data,
      }),
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "POST",
        body: data,
      }),
    }),
    getPendingApproveUser: builder.query({
      query: (params = {}) => ({
        url: `/auth/users/pending-approval?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["pending-user"],
    }),
    acceptUserApprooval: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["pending-user"],
    }),
    rejectUserApprooval: builder.mutation({
      query: ({ data, id }: TRejectApiType) => ({
        url: `/auth/users/${id}/reject`,
        method: "POST",
        body: data && data,
      }),
      invalidatesTags: ["pending-user"],
    }),
  }),
});
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useValidateresetTokenQuery,
  useVerifyEmailQuery,
  useResendVerificationEmailMutation,
  useResetPasswordMutation,
  useUpdatePasswordMutation,
  useGetPendingApproveUserQuery,
  useAcceptUserApproovalMutation,
  useRejectUserApproovalMutation,
} = authApi;
