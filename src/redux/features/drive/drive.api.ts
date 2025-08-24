/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IRideStatus } from "@/types";

export const driverAndRideApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateAvailability: builder.mutation<void, { isAvailable: boolean }>({
      query: (data) => ({
        url: "/drivers/availability",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["DRIVER"],
    }),

    // Fetches the driver's earnings history
    getEarnings: builder.query<any, void>({
      query: () => ({
        url: "/drivers/earnings",
        method: "GET",
      }),
      providesTags: ["DRIVER"],
    }),

    // RIDE ENDPOINTS
    // Gets a list of pending ride requests for the driver
    getPendingRides: builder.query<any, void>({
      query: () => ({
        url: "/rides/pending-rides",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
    // Gets a list of pending ride requests for the driver
    getAcceptedRides: builder.query<any, void>({
      query: () => ({
        url: "/rides/accepted-rides",
        method: "GET",
      }),
      providesTags: ["RIDER"],
    }),
    // Accepts a specific ride request
    acceptRide: builder.mutation<any, string>({
      query: (rideId) => ({
        url: `/rides/accept/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDER"],
    }),
    // Rejects a specific ride request
    rejectRide: builder.mutation<any, string>({
      query: (rideId) => ({
        url: `/rides/reject/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDER"],
    }),
    // Cancel a specific ride request
    cancelRide: builder.mutation<any, string>({
      query: (rideId) => ({
        url: `/rides/cancel/${rideId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["RIDER"],
    }),
    // Updates the status of an ongoing ride
    updateRideStatus: builder.mutation<
      any,
      { id: string; status: IRideStatus }
    >({
      query: ({ id, status }) => ({
        url: `/rides/status/${id}`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["RIDER"],
    }),
    // Fetches the driver's past ride history with filters and pagination
    getMyRides: builder.query<any, { role: string; [key: string]: any }>({
      query: (params) => ({
        url: "/rides/my",
        method: "GET",
        params,
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useUpdateAvailabilityMutation,
  useGetEarningsQuery,
  useGetPendingRidesQuery,
  useAcceptRideMutation,
  useRejectRideMutation,
  useUpdateRideStatusMutation,
  useGetMyRidesQuery,
  useGetAcceptedRidesQuery,
  useCancelRideMutation,
} = driverAndRideApi;
