import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    requestRide: build.mutation({
      query: (data) => ({
        url: "/rides/request",
        method: "POST",
        data,
      }),
      invalidatesTags: ["RIDER"],
    }),
    getMyRides: build.query({
      query: (params) => ({
        url: "/rides/my",
        method: "GET",
        params,
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const { useRequestRideMutation, useGetMyRidesQuery } = rideApi;
