import { configureStore } from "@reduxjs/toolkit"

import counterReducer from "./slices/counterSlice"

import themeSlice from "./slices/themeSwitch"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    themeToggle: themeSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
