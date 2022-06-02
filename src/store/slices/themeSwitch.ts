import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ThemeState {
  value: number
}

const initialState: ThemeState = {
  value: 1,
}

export const themeSlice = createSlice({
  name: "themeToggle",
  initialState,
  reducers: {
    toggle: (state, action) => {
      state.value === 1 ? (state.value = 0) : (state.value = 1)
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions

export default themeSlice.reducer
