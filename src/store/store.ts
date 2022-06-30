import { configureStore } from "@reduxjs/toolkit"

import dataSlice from "./slices/dataSlice"
import statusSlice from "./slices/filterSlice"
import modalSlice from "./slices/modalSlice"
import themeSlice from "./slices/themeSwitch"

export const store = configureStore({
  reducer: {
    themeToggle: themeSlice,
    statusToggle: statusSlice,
    modalInvoice: modalSlice,
    currData: dataSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
