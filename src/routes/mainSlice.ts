import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FlashbarProps } from "@cloudscape-design/components"
import { addCommonMatchers, AsyncStatus, uuid } from "../common/typedUtils"
import type { RootState } from "../common/reducers"
import { ReactNode } from "react"
import { CreateUserRequest, UserControllerService } from "../../openapi-client"

export interface MainState {
  navigationOpen: boolean;
  notifications: Array<FlashbarProps.MessageDefinition>;
  lockScroll?: boolean;
  startingPath?: string;
  toolsHidden: boolean;
  toolsOpen: boolean;
  tools: ReactNode;
  email: string;
  username: string;
  password: string;
  verificationCode: string;
  errorMessages: Record<string, string>;
  asyncStatus: Record<string, AsyncStatus>;
}

const initialState: MainState = {
  navigationOpen: false,
  notifications: [],
  lockScroll: false,
  startingPath: undefined,
  toolsHidden: true,
  toolsOpen: false,
  tools: null,
  username: "",
  email: "",
  password: "",
  verificationCode: "",
  errorMessages: {},
  asyncStatus: {},
}

type Notification = Pick<FlashbarProps.MessageDefinition, "type" | "content">

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateSlice: (state, action: PayloadAction<Partial<MainState>>) => {
      return { ...state, ...action.payload }
    },
    addNotification(state, action: PayloadAction<Notification>) {
      // if there is already a notification with the same content, don't add it
      if (state.notifications.find(n => n.content === action.payload.content)) return
      const notification: FlashbarProps.MessageDefinition = {
        ...action.payload,
        dismissible: true,
        id: uuid(),
      }
      state.notifications.push(notification)
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter(n => n.id !== action.payload)
    },
    resetSlice: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    addCommonMatchers(builder)
  },
})

export const createUser = createAsyncThunk(
  "main/createUser",
  async (payload: CreateUserRequest, { rejectWithValue }) => {
    try {
      await UserControllerService.create(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  },
)

export const mainReducer = mainSlice.reducer
export const mainActions = mainSlice.actions
export const mainSelector = (state: RootState) => state.main
