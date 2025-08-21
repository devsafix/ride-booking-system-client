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
        url: "/auth/me",
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useGetMeQuery,
} = authApi;
