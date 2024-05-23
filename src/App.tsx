import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import MainLayout from "./routes/MainLayout"
import MainLayoutError from "./routes/MainLayoutError"
import "@cloudscape-design/global-styles/index.css"
import "./app.css"
import { Fragment } from "react"

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <MainLayoutError />,
    children: [
      {
        path: "settings",
        lazy: () => import("./routes/register/RegisterRoute.tsx"),
        handle: createCrumb("Settings", "/settings"),
      },
      {
        path: "*",
        Component: () => <Navigate to="/settings" />,
      },
    ],
  },
])

export interface CrumbHandle {
  crumbs: () => { crumb: string, path: string }
}

function createCrumb(crumb: string, path: string): CrumbHandle {
  return {
    crumbs: () => {
      return {
        crumb,
        path,
      }
    },
  }
}

export default function App() {
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}
