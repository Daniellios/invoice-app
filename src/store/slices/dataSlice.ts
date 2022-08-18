import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import initialData from "../initialState/initialData"
import { Invoice, Item } from "../../types/interfaces"

export interface DataState {
  invoices: Invoice[]
  currInvoice: Invoice
  modalType: string
}

const initialState: DataState = {
  invoices: initialData,
  currInvoice: null,
  modalType: "NEW",
}

//PREPARE PAYLODA FOR EMPTY ITEM AND INVOICE MAYBE

export const dataReducer = createSlice({
  name: "dataReducer",
  initialState,
  reducers: {
    // ++++
    changeModalType: (state, action) => {
      state.modalType = action.payload
    },
    createNewModal: {
      reducer(state, action: PayloadAction<Invoice>) {
        state.currInvoice = action.payload
      },
      prepare() {
        return {
          payload: {
            id: nanoid(6).toLocaleUpperCase(),
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
            items: [
              {
                id: "I-" + nanoid(4),
                name: null,
                quantity: null,
                price: null,
                total: null,
              },
            ],
            total: null,
          },
        }
      },
    },
    setCurrentInvoice: (state, action) => {
      state.currInvoice = state.invoices.filter(
        (invoice: Invoice) => invoice.id === action.payload
      )[0]
    },
    updateInvoiceList: (state, action) => {
      state.invoices = action.payload
    },
    inputInvoiceUpdate: (state, action) => {
      state.currInvoice = action.payload
    },
    // ++++
    addItem: {
      reducer(state, action: PayloadAction<Item>) {
        state.currInvoice.items.push(action.payload)
      },
      prepare() {
        return {
          payload: {
            id: "I-" + nanoid(4),
            name: "",
            quantity: null,
            price: null,
            total: null,
          },
        }
      },
    },
    // ++++
    deleteItem: (state, action) => {
      state.currInvoice.items.filter((item) => item.id !== action.payload)
    },
    // ????
    updateInvoiceInfo: (state, action) => {
      state.invoices = state.invoices.map((item) => {
        if (item.id === action.payload.id) {
          item = action.payload
        }
        return item
      })
      state.currInvoice = action.payload
    },
    // ????
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
    // ++++
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter(
        (invoice) => invoice.id !== action.payload
      )
    },
  },
})

export const invoices = (state: RootState) => state.data.invoices

export const selectModalType = (state: RootState) => state.data.modalType

export const selectItems = (state: RootState) => state.data.currInvoice?.items

export const selectCurrentInvoice = (state: RootState) => state.data.currInvoice

// Action creators are generated for each case reducer function
export const {
  updateInvoiceList,
  createNewModal,
  updateInvoiceInfo,
  inputInvoiceUpdate,
  setCurrentInvoice,
  addInvoice,
  deleteInvoice,
  changeModalType,
  deleteItem,
  addItem,
} = dataReducer.actions

export default dataReducer.reducer
