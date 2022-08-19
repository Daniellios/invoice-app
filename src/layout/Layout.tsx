import React from "react"
import Header from "../components/header/Header"
import { Container } from "./LayoutStyles"
import Invoicecreator from "../components/invoicemodal/Invoicecreator"

const Layout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Invoicecreator />
      {children}
    </Container>
  )
}

export default Layout
