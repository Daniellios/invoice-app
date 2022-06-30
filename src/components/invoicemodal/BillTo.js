import React, { useState } from "react"
import { ModalBlock, ModalBlockTitle } from "./InvoiceModalStyles"
import InvoiceInput from "./InvoiceInput"
import { useSelector } from "react-redux"

const BillTo = ({ modalState, addressInfo }) => {
  const invoice = useSelector((state) => state.currData.currInvoice)

  return (
    <ModalBlock billTo key={"bt"}>
      <ModalBlockTitle>Bill To</ModalBlockTitle>
      <InvoiceInput
        area={"clN"}
        value={invoice?.clientName}
        initialState={modalState}
        name={"clientName"}
        title={"Client's Name"}
      />
      <InvoiceInput
        area={"clE"}
        value={invoice?.clientEmail}
        initialState={modalState}
        name={"clientEmail"}
        title={"Client's Email"}
      />
      <InvoiceInput
        area={"adrs"}
        value={addressInfo?.street}
        initialState={modalState}
        name={"clientAddress.street"}
        title={"Street"}
      />
      <InvoiceInput
        area={"city"}
        value={addressInfo?.city}
        initialState={modalState}
        name={"clientAddress.city"}
        title={"City"}
      />
      <InvoiceInput
        area={"ps"}
        value={addressInfo?.postCode}
        initialState={modalState}
        name={"clientAddress.postCode"}
        title={"Post Code"}
      />
      <InvoiceInput
        area={"ctry"}
        value={addressInfo?.country}
        initialState={modalState}
        name={"clientAddress.country"}
        title={"Country"}
      />
    </ModalBlock>
  )
}
export default BillTo
