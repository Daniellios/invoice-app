import { store } from "../store/store"
import { Provider } from "react-redux"
import Theme from "../styles/theme"
import React from "react"
import Layout from "../layout/Layout"

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Theme>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Theme>
    </Provider>
  )
}
