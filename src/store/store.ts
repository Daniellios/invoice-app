import { configureStore } from "@reduxjs/toolkit"

import dataReducer from "./slices/dataSlice"
import filterReducer from "./slices/filterSlice"
import modalsReducer from "./slices/modalSlice"
import themeReducer from "./slices/themeSwitch"

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    filter: filterReducer,
    modals: modalsReducer,
    data: dataReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
