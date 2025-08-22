/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

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
    getMyRides: build.query<
      IResponse<null>,
      {
        page?: number;
        limit?: number;
        status?: string;
        minFare?: number;
        maxFare?: number;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params: any) => ({
        url: "/rides/my",
        method: "GET",
        params,
      }),
      providesTags: ["RIDER"],
    }),
  }),
});

export const { useRequestRideMutation, useGetMyRidesQuery } = rideApi;
