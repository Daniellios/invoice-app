import { createSlice } from "@reduxjs/toolkit"

export interface FilterState {
  value: object
}

const initialState: FilterState = {
  value: {
    draft: false,
    paid: false,
    pending: false,
  },
}

export const statusSlice = createSlice({
  name: "InvoiceFilter",
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilterStatus } = statusSlice.actions

export default statusSlice.reducer
