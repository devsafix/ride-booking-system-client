import App from "@/App";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
]);
