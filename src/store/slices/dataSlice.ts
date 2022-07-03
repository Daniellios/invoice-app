import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import data from "../../data/data.json"
import { randomIdGenerator } from "../../helpers/idGenerator"
import { store } from "../store"

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
  item: Item
  modalType: string
  test: Invoice
}

const initialState: DataState = {
  invoices: data,
  currInvoice: null,
  modalType: "NEW",
  test: null,
  currID: null,
  item: {
    name: null,
    quantity: null,
    price: null,
    total: null,
  },
  emptyInvoice: {
    id: "",
    createdAt: null,
    paymentDue: null,
    description: null,
    paymentTerms: null,
    clientName: null,
    clientEmail: null,
    status: null,
    senderAddress: {
      street: null,
      city: null,
      postCode: null,
      country: null,
    },
    clientAddress: {
      street: null,
      city: null,
      postCode: null,
      country: null,
    },
    items: [],
    total: null,
  },
}

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    changeModalType: (state, action) => {
      state.modalType = action.payload
    },
    setId: (state, action) => {
      state.currID = action.payload
    },
    updateWorkingObject: (state, action) => {
      if (action.payload.TYPE === "NEW") {
        console.log("HERE IN NEW OBJ")
        state.currInvoice = state.emptyInvoice
        state.currInvoice.id = action.payload.id
      } else if (action.payload.TYPE === "EDIT") {
        console.log("HERE IN EDIT OBJ")

        state.currInvoice = state.invoices.filter((item) => {
          if (item.id === state.currID) return item
        })[0]
      }
    },
    updateInvoiceList: (state, action) => {
      state.invoices = action.payload
    },

    inputInvoiceUpdate: (state, action) => {
      // console.log("Input Value Update")
      state.currInvoice = action.payload
    },
    addItem: (state, action) => {
      state.currInvoice.items.push(state.item)
    },
    deleteItem: (state, action) => {
      state.currInvoice.items.splice(action.payload.itemNumber, 1)
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
    addInvoice: (state, action) => {
      state.invoices = state.invoices.map((item, index, arr) => {
        if (item.id === action.payload.id) {
          console.log(item.id)
          console.log(action.payload.id)
          console.log("YSE HERE")

          arr.splice(index, 1, action.payload)
          return item
        } else {
          state.invoices.push(action.payload)
        }
      })
    },
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((item, index) => {
        return item.id !== action.payload
      })
      // console.log(state.invoices)
    },
    getEditedObject: (state, action) => {
      state.test = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setId,
  updateInvoiceList,
  updateInvoiceInfo,
  inputInvoiceUpdate,
  addInvoice,
  deleteInvoice,
  updateWorkingObject,
  changeModalType,
  getEditedObject,
  deleteItem,
  addItem,
} = dataSlice.actions

export default dataSlice.reducer
