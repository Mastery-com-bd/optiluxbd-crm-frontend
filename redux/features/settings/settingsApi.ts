import { baseApi } from "@/redux/api/baseApi";

const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsdata: builder.query({
      query: () => ({
        url: `/settings`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getContactInfo: builder.query({
      query: () => ({
        url: `/settings/contact-info`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getSocialLinks: builder.query({
      query: () => ({
        url: `/settings/social-links`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    getLogo: builder.query({
      query: () => ({
        url: `/settings/logo-url`,
        method: "GET",
      }),
      providesTags: ["settings"],
    }),
    createSettings: builder.mutation({
      query: (data) => ({
        url: `/settings`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
    updateSettings: builder.mutation({
      query: (data) => ({
        url: `/settings/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["settings"],
    }),
    uploadLogo: builder.mutation({
      query: (data) => ({
        url: `/images/settings/logo`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
    deleteLogo: builder.mutation({
      query: () => ({
        url: `/images/settings/logo`,
        method: "DELETE",
      }),
      invalidatesTags: ["settings"],
    }),
    uploadFavicon: builder.mutation({
      query: (data) => ({
        url: `/images/settings/favicon`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
    deleteFavicon: builder.mutation({
      query: (data) => ({
        url: `/images/settings/favicon`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});
export const {
  useGetSettingsdataQuery,
  useUpdateSettingsMutation,
  useUploadLogoMutation,
  useDeleteLogoMutation,
  useUploadFaviconMutation,
  useDeleteFaviconMutation,
} = settingsApi;
