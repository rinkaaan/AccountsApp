import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout"
import MainLayoutError from "./routes/MainLayoutError"
import "@cloudscape-design/global-styles/index.css"
import "./app.css"
import { Fragment } from "react"
import { OpenAPI } from "../openapi-client"

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <MainLayoutError />,
    loader: async () => {
      OpenAPI.BASE = import.meta.env.VITE_API_URL
      return null
    },
    children: [
      {
        path: "/",
        lazy: () => import("./routes/register/RegisterRoute.tsx"),
      },
      {
        path: "/verify",
        lazy: () => import("./routes/verify/VerifyRoute.tsx"),
      },
      {
        path: "/complete",
        lazy: () => import("./routes/complete/CompleteRoute.tsx"),
      },
      {
        path: "*",
        Component: () => <Navigate to="/" />,
      },
    ],
  },
])

export default function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}
