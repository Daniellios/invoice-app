import { store } from "../store/store"

import {
  openModal,
  openDeletePopup,
  toggleFilter,
} from "../store/slices/modalSlice"

// MODAL OPEN - CLOSE
export const modalOpener = () => {
  store.dispatch(openModal(true))
}
export const modalCoser = () => {
  store.dispatch(openModal(false))
}

// DELETE POUPUP OPEN - CLOSE
export const deletePopupOpener = () => {
  store.dispatch(openDeletePopup(true))
}

export const deletePopupCloser = () => {
  store.dispatch(openPopup(false))
}

// FILTER TOGGLE
export const filterToggle = () => {
  const filterVisibility = store.getState().modals.isFilterOpen
  store.dispatch(toggleFilter(!filterVisibility))
}

// // SAVE AS DRAFT
// export const saveDraft = () => {
//   store.dispatch(updateInvoiceInfo)
// }
