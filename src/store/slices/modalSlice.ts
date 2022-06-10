import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ModalState {
  isOpen: boolean
}

const initialState: ModalState = {
  isOpen: false,
}

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    newInvoice: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { newInvoice } = modalSlice.actions

export default modalSlice.reducer
