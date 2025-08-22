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
  }),
});

export const { useRequestRideMutation } = rideApi;
