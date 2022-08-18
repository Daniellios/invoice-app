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
      if (action.payload === "draft") {
        state.draft = !state.draft
      } else if (action.payload === "paid") {
        state.paid = !state.paid
      } else if (action.payload === "pending") {
        state.pending = !state.pending
      }
    },
  },
})

export const selectFilterStatus = (state: RootState) => state.filter

// Action creators are generated for each case reducer function
export const { setFilterStatus } = filterReducer.actions

export default filterReducer.reducer
