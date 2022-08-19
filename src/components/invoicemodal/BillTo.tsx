import React, { useState } from "react"
import { ModalBlock, ModalBlockTitle } from "./InvoiceModalStyles"
import InvoiceInput from "./InvoiceInput"
import { useSelector } from "react-redux"
import { selectCurrentInvoice } from "../../store/slices/dataSlice"

const BillTo = ({ addressInfo }) => {
  const invoice = useSelector(selectCurrentInvoice)
  return (
    <ModalBlock billTo key={"bt"}>
      <ModalBlockTitle>Bill To</ModalBlockTitle>
      <InvoiceInput
        area={"clN"}
        value={invoice?.clientName}
        name={"clientName"}
        title={"Client's Name"}
      />
      <InvoiceInput
        area={"clE"}
        value={invoice?.clientEmail}
        name={"clientEmail"}
        title={"Client's Email"}
      />
      <InvoiceInput
        area={"adrs"}
        value={addressInfo?.street}
        name={"clientAddress.street"}
        title={"Street"}
      />
      <InvoiceInput
        area={"city"}
        value={addressInfo?.city}
        name={"clientAddress.city"}
        title={"City"}
      />
      <InvoiceInput
        area={"ps"}
        value={addressInfo?.postCode}
        name={"clientAddress.postCode"}
        title={"Post Code"}
      />
      <InvoiceInput
        area={"ctry"}
        value={addressInfo?.country}
        name={"clientAddress.country"}
        title={"Country"}
      />
    </ModalBlock>
  )
}
export default BillTo
