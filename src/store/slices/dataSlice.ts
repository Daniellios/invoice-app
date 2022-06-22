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

export interface Invoice {
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
}

export interface DataState {
  invoices: Invoice[]
  currInvoice: Invoice
  currID: string
  emptyInvoice: Invoice
}

const initialState: DataState = {
  invoices: data,
  currInvoice: null,
  currID: null,
  emptyInvoice: null,
}

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    getInitialData: (state, action) => {
      return { ...initialState }
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
      console.log("CLEARED")
      state.currID = null
      state.currInvoice = null
    },
    updateInvoiceList: (state, action) => {
      state.invoices = action.payload
    },
    testInvoice: (state, action) => {
      state.currInvoice = action.payload
    },
    updateInvoiceInfo: (state, action) => {
      state.invoices = state.invoices.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload
        }
        return item
      })
      state.currInvoice = action.payload
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((item, index) => {
        return item.id !== action.payload
      })
      console.log(state.invoices)
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  getInitialData,
  setId,
  setCurrInvoice,
  updateInvoiceList,
  updateInvoiceInfo,
  testInvoice,
  deleteInvoice,
  resetCurrInvoice,
} = dataSlice.actions

export default dataSlice.reducer
