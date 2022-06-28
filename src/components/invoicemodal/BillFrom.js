import React, { useEffect } from "react"

import { ModalBlock, ModalBlockTitle } from "./InvoiceModalStyles"

import InvoiceInput from "./InvoiceInput"
import { useSelector } from "react-redux"

const BillFrom = ({ modalState, addressInfo }) => {
  return (
    <ModalBlock billFrom key={"bf"}>
      <ModalBlockTitle>Bill From</ModalBlockTitle>
      <InvoiceInput
        area={"sa"}
        value={addressInfo?.street || ""}
        name={"senderAddress.street"}
        initialState={modalState}
        title={"Street"}
      />
      <InvoiceInput
        area={"city"}
        value={addressInfo?.city}
        name={"senderAddress.city"}
        initialState={modalState}
        title={"City"}
      />
      <InvoiceInput
        area={"ps"}
        value={addressInfo?.postCode}
        initialState={modalState}
        name={"senderAddress.postCode"}
        title={"Post Code"}
      />
      <InvoiceInput
        area={"ctry"}
        value={addressInfo?.country}
        name={"senderAddress.country"}
        initialState={modalState}
        title={"Country"}
      />
    </ModalBlock>
  )
}

export default BillFrom
