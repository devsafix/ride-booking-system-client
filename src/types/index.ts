import type { ComponentType } from "react";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "admin" | "driver" | "rider";

export interface IRideBook {
  pickupLocation: { latitude: number; longitude: number };
  dropOffLocation: { latitude: number; longitude: number };
}

// Corrected type alias for ride status
export type IRideStatus =
  | "requested"
  | "accepted"
  | "picked_up"
  | "in_transit"
  | "completed"
  | "cancelled"
  | "rejected"
  | "no_driver_found";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: TRole;
  contactNo?: string;
  vehicleType?: string;
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
  averageRating?: number;
  totalRatings?: number;
}
