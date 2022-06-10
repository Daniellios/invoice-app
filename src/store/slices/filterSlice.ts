import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface FilterState {
  value: object[]
}

const initialState: FilterState = {
  value: [{ draft: false }, { pending: false }, { paid: false }],
}

export const statusSlice = createSlice({
  name: "InvoiceFilter",
  initialState,
  reducers: {
    setFilterStatus: (state, action) => {
      return { ...state }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setFilterStatus } = statusSlice.actions

export default statusSlice.reducer
