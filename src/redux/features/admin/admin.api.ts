import { baseApi } from "@/redux/baseApi";
import type { IRideReport, IUser } from "@/types";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/users/all-users",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    blockUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["USER"],
    }),
    unblockUser: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/unblock/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["USER"],
    }),
    approveDriver: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/approve/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["USER"],
    }),
    suspendDriver: builder.mutation<IUser, string>({
      query: (id) => ({
        url: `/users/suspend/${id}`,
        method: "PATCH",
        body: {},
      }),
      invalidatesTags: ["USER"],
    }),
    getRideReport: builder.query<IRideReport, void>({
      query: () => ({
        url: "/admin/reports/rides",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useApproveDriverMutation,
  useSuspendDriverMutation,
  useGetRideReportQuery,
} = adminApi;
