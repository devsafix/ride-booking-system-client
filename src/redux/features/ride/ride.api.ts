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
    getRideById: build.query({
      query: (id) => ({
        url: `/rides/${id}`,
        method: "GET",
      }),
      providesTags: (id) => [{ type: "RIDER", id }],
    }),
  }),
});

export const {
  useRequestRideMutation,
  useGetMyRidesQuery,
  useGetRideByIdQuery,
} = rideApi;
