/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IResponse } from "@/types";
import { baseApi } from "../../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        data,
      }),
    }),

    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
    }),

    getMe: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    logoutUser: build.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    updateUserProfile: build.mutation<
      IResponse<null>,
      { id: string; data: any }
    >({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["USER"],
    }),
    changePassword: build.mutation<
      IResponse<null>,
      { oldPassword: string; newPassword: string }
    >({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        data,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetMeQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = authApi;
