import { baseApi } from "@/redux/api/baseApi";

const attendenceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        checkInAttendence: builder.mutation({
            query: (payload) => ({
                url: `/attendance/check-in`,
                method: "POST",
                body: payload,
            }),
        }),
        startBreak: builder.mutation({
            query: () => ({
                url: `/attendance/break/start`,
                method: "POST",
            }),
        }),
        endBreak: builder.mutation({
            query: () => ({
                url: `/attendance/break/end`,
                method: "POST",
            }),
        }),
        checkOutAttendence: builder.mutation({
            query: () => ({
                url: `/attendance/check-out`,
                method: "POST",
            }),
        }),
        attendenceHistory: builder.query({
            query: () => ({
                url: `/attendance/my`,
                method: "GET",
            }),
        }),
        getAllAttendence: builder.query({
            query: () => ({
                url: `/attendance`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useCheckInAttendenceMutation,
    useStartBreakMutation,
    useEndBreakMutation,
    useCheckOutAttendenceMutation,
    useAttendenceHistoryQuery,
    useGetAllAttendenceQuery,
} = attendenceApi;
