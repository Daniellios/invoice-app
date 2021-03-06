import { store } from "../store/store"

import { openModal, openPopup, toggleFilter } from "../store/slices/modalSlice"
import { updateInvoiceInfo } from "../store/slices/dataSlice"

// MODAL OPEN - CLOSE
export const modalOpener = () => {
  store.dispatch(openModal(true))
}
export const modalCoser = () => {
  store.dispatch(openModal(false))
}

// DELETE POUPUP OPEN - CLOSE
export const deletePopupOpener = () => {
  store.dispatch(openPopup(true))
}

export const deletePopupCloser = () => {
  store.dispatch(openPopup(false))
}

// FILTER TOGGLE
export const filterToggle = () => {
  const filterVisibility = store.getState().modalInvoice.isFilterOpen
  store.dispatch(toggleFilter(!filterVisibility))
}

// // SAVE AS DRAFT
// export const saveDraft = () => {
//   store.dispatch(updateInvoiceInfo)
// }
