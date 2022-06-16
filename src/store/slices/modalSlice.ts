import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ModalState {
  isModalOpen: boolean
  isPopupOpen: boolean
}

const initialState: ModalState = {
  isModalOpen: false,
  isPopupOpen: false,
}

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = action.payload
    },
    openPopup: (state, action) => {
      state.isPopupOpen = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { openModal, openPopup } = modalSlice.actions

export default modalSlice.reducer
