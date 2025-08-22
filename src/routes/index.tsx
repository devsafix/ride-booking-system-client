import App from "@/App";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "@/components/modules/auth/PrivateRoute";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AccountStatus from "@/pages/AccountStatus";
import Profile from "@/pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "account-status",
        Component: AccountStatus,
      },
      {
        path: "profile",
        Component: Profile,
      },

      // Rider-specific routes
      {
        path: "rider",
        // Use `element` to pass props to the PrivateRoute component
        element: <PrivateRoute allowedRoles={["rider"]} />,
        children: [
          {
            path: "",
            Component: DashboardLayout,
            children: [
              {
                index: true,
                Component: Home,
              },
              // Add other rider pages here
            ],
          },
        ],
      },

      // Driver-specific routes
      {
        path: "driver",

        element: <PrivateRoute allowedRoles={["driver"]} />,
        children: [
          {
            path: "",
            Component: DashboardLayout,
            children: [
              {
                index: true,
                Component: Home,
              },
              // Add other driver pages here
            ],
          },
        ],
      },

      // Admin-specific routes
      {
        path: "admin",

        element: <PrivateRoute allowedRoles={["admin"]} />,
        children: [
          {
            path: "",
            Component: DashboardLayout,
            children: [
              {
                index: true,
                Component: Home,
              },
              // Add other admin pages here
            ],
          },
        ],
      },
    ],
  },
]);
