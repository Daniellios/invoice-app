import { store } from "../store/store"
import { Provider } from "react-redux"
import Theme from "../styles/theme"
import React from "react"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Theme>
        <Component {...pageProps} />
      </Theme>
    </Provider>
  )
}
