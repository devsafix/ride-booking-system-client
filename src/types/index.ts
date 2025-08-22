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
