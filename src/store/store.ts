import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "./slices/counterSlice"
import dataSlice from "./slices/dataSlice"
import filterSlice from "./slices/filterSlice"
import modalSlice from "./slices/modalSlice"

import themeSlice from "./slices/themeSwitch"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeToggle: themeSlice,
    statusToggle: filterSlice,
    createInvoice: modalSlice,
    currData: dataSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
