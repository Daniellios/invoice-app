import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import data from "../../data/data.json"

export interface SenderAddress {
  street: string
  city: string
  postCode: string
  country: string
}

export interface ClientAddress {
  street: string
  city: string
  postCode: string
  country: string
}

export interface Item {
  name: string
  quantity: number
  price: number
  total: number
}

export interface DataState {
  invoices: Array<{
    id: string
    createdAt?: string
    paymentDue?: string
    description?: string
    paymentTerms?: number
    clientName?: string
    clientEmail?: string
    status?: string
    senderAddress?: SenderAddress
    clientAddress?: ClientAddress
    items?: Item[]
    total?: number
  }>
  currInvoice: Object
  currID: string
}

const initialState: DataState = {
  invoices: data,
  currInvoice: null,
  currID: null,
}

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.invoices
    },
    setId: (state, action) => {
      state.currID = action.payload
    },
    setCurrInvoice: (state, action) => {
      state.currInvoice = state.invoices.filter((item) => {
        if (item.id === state.currID) return item
      })[0]
    },
    resetCurrInvoice: (state) => {
      state.currID = null
      state.currInvoice = null
    },
    updateData: (state, action) => {
      state.invoices = action.payload
    },
    deleteInvoice: (state, action) => {},
  },
})

// Action creators are generated for each case reducer function
export const {
  getData,
  setId,
  setCurrInvoice,
  updateData,
  deleteInvoice,
  resetCurrInvoice,
} = dataSlice.actions

export default dataSlice.reducer
