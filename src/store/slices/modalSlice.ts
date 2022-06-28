import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface ModalState {
  isModalOpen: boolean
  isPopupOpen: boolean
  isFilterOpen: boolean
  modalType: string
}

const initialState: ModalState = {
  isModalOpen: false,
  isPopupOpen: false,
  isFilterOpen: false,
  modalType: "NEW",
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
    toggleFilter: (state, action) => {
      state.isFilterOpen = action.payload
    },
    setModalType: (state, action) => {
      state.modalType = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { openModal, openPopup, toggleFilter, setModalType } =
  modalSlice.actions

export default modalSlice.reducer
