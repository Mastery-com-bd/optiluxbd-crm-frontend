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
    updateSettings: builder.mutation({
      query: ({ currentSetting, id }) => ({
        url: `/settings/${id}`,
        method: "PATCH",
        body: currentSetting,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});
export const { useGetSettingsdataQuery, useUpdateSettingsMutation } =
  settingsApi;
