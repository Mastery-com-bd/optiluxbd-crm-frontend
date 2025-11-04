import { baseApi } from "@/redux/api/baseApi";

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
    validateresetToken: builder.query({
      query: (token) => ({
        url: `auth/reset-password/${token}/validate`,
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
  }),
});
export const { useRegisterMutation } = authApi;
export const { useLoginMutation } = authApi;
export const { useLogoutMutation } = authApi;
export const { useForgetPasswordMutation } = authApi;
export const { useValidateresetTokenQuery } = authApi;
export const { useResetPasswordMutation } = authApi;
export const { useUpdatePasswordMutation } = authApi;
