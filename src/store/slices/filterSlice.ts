import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface FilterState {
  draft: boolean
  paid: boolean
  pending: boolean
}

const initialState: FilterState = {
  draft: false,
  paid: false,
  pending: false,
}

export const filterReducer = createSlice({
  name: "filterReducer",
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state = action.payload
    },
  },
})

export const selectFilterStatus = (state: RootState) =>
  Object.entries(state.filter)

// Action creators are generated for each case reducer function
export const { setFilterStatus } = filterReducer.actions

export default filterReducer.reducer
