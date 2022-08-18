import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface ThemeState {
  value: number
}

const initialState: ThemeState = {
  value: 0,
}

export const themeReducer = createSlice({
  name: "themeReducer",
  initialState,
  reducers: {
    toggle: (state) => {
      state.value === 1 ? (state.value = 0) : (state.value = 1)
    },
  },
})

export const selectThemeValue = (state: RootState) => state.theme.value

// Action creators are generated for each case reducer function
export const { toggle } = themeReducer.actions

export default themeReducer.reducer
