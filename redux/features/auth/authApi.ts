import { TRejectApiType } from "@/components/pages/dashboard/admin/approve-user/ApproveUSerAction";
import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    // login
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    // get auth profile
    getProfile: builder.query({
      query: () => ({
        url: `/auth/profile`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    // forgot password
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),
    // verify email
    verifyEmail: builder.query({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: "GET",
      }),
    }),
    // resend verification email
    resendVerificationEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body: data,
      }),
    }),
    // validate token
    validateresetToken: builder.query({
      query: (token) => ({
        url: `/auth/reset-password/${token}/validate`,
        method: "GET",
      }),
    }),
    // reset password
    resetPassword: builder.mutation({
      query: (args) => ({
        url: `/auth/reset-password/${args.token}`,
        method: "POST",
        body: args.data,
      }),
    }),
    // update password
    updatePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/update-password",
        method: "POST",
        body: data,
      }),
    }),
    // get pending approval suer
    getPendingApproveUser: builder.query({
      query: (params = {}) => ({
        url: `/auth/users/pending-approval?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["pending-user"],
    }),
    // accept user approval
    acceptUserApprooval: builder.mutation({
      query: (id) => ({
        url: `/auth/users/${id}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["pending-user"],
    }),
    // reject user approval
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
  useGetProfileQuery,
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
