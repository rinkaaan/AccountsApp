import { AppLayout, Flashbar } from "@cloudscape-design/components"
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom"
import { Fragment, useEffect } from "react"
import { useSelector } from "react-redux"
import { appDispatch } from "../common/store"
import { mainActions, mainSelector } from "./mainSlice"

import { prepareNotifications } from "../common/storeUtils"

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { notifications, startingPath } = useSelector(mainSelector)

  useEffect(() => {
    if (startingPath) {
      navigate(startingPath)
    }
  }, [navigate, startingPath])

  useEffect(() => {
    appDispatch(mainActions.resetSlice())
  }, [location.pathname])

  useEffect(() => {
    appDispatch(mainActions.updateSlice({ navigationOpen: false }))
  }, [])

  return (
    <Fragment>
      <ScrollRestoration />
      <AppLayout
        navigationHide
        content={<Outlet />}
        notifications={
          <Flashbar items={prepareNotifications(notifications)} />
        }
        toolsHide
      />
    </Fragment>
  )
}
