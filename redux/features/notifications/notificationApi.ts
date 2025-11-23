import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotifications: builder.query({
      query: (params = {}) => ({
        url: `/notifications?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),
    getUnreadCount: builder.query({
      query: () => ({
        url: `/notifications/unread-count`,
        method: "GET",
      }),
      providesTags: ["notifications"],
    }),

    markAsReadNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),
    MarkAsAllReadNotification: builder.mutation({
      query: () => ({
        url: `/notifications/read-all`,
        method: "PATCH",
      }),
      invalidatesTags: ["notifications"],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notifications"],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadNotificationMutation,
  useMarkAsAllReadNotificationMutation,
  useDeleteNotificationMutation,
} = notificationApi;
