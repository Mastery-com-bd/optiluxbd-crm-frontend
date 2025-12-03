import { baseApi } from "@/redux/api/baseApi";
import { buildParams } from "@/utills/paramsBuilder";

const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all reminder
    getAllReminders: builder.query({
      query: (params = {}) => ({
        url: `/reminders?${buildParams(params)}`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // get a single reminder
    getASingleReminder: builder.query({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // get reminder statistic
    getReminderStatistics: builder.query({
      query: () => ({
        url: `/reminders/stats`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // get upcoming reminder
    getUpcomingReminder: builder.query({
      query: (params = {}) => ({
        url: `/reminders/upcoming?${params}`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // getr overdue reminder
    getOverdueReminder: builder.query({
      query: () => ({
        url: `/reminders/overdue`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // get customer reminder
    getCustomerReminder: builder.query({
      query: ({ filters, id }) => ({
        url: `/reminders/customer/${id}?${buildParams(filters)}`,
        method: "GET",
      }),
      providesTags: ["reminders"],
    }),
    // create reminder
    createReminder: builder.mutation({
      query: (data) => ({
        url: `/reminders`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["reminders"],
    }),
  }),
});
export const {
  useGetAllRemindersQuery,
  useGetASingleReminderQuery,
  useGetReminderStatisticsQuery,
  useGetUpcomingReminderQuery,
  useGetOverdueReminderQuery,
  useGetCustomerReminderQuery,
  useCreateReminderMutation,
} = reminderApi;
