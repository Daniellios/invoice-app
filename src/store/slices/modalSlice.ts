import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

export interface ModalState {
  isModalOpen: boolean
  isDeletePopupOpen: boolean
  isFilterOpen: boolean
}

const initialState: ModalState = {
  isModalOpen: false,
  isDeletePopupOpen: false,
  isFilterOpen: false,
}

export const modalsReducer = createSlice({
  name: "modalsReducer",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = action.payload
    },
    openDeletePopup: (state, action) => {
      state.isDeletePopupOpen = action.payload
    },
    toggleFilter: (state, action) => {
      state.isFilterOpen = action.payload
    },
  },
})

export const filterModalStatus = (state: RootState) => state.modals.isFilterOpen
export const modalStatus = (state: RootState) => state.modals.isModalOpen
export const deleteModalStatus = (state: RootState) =>
  state.modals.isDeletePopupOpen

// Action creators are generated for each case reducer function
export const { openModal, openDeletePopup, toggleFilter } =
  modalsReducer.actions

export default modalsReducer.reducer
