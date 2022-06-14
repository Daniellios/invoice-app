import React from "react"
import { BiTrash } from "react-icons/bi"
import { formatMoney } from "../../helpers/moneyFormatter"

import { ModalRow, ModalInput, TotalSumCell } from "./InvoiceModalStyles"

const InvoiceItem = ({ itemInfo, onRemove, number }) => {
  return (
    <ModalRow number={number}>
      <ModalInput defaultValue={itemInfo?.name} area={"1/1/1/4"}></ModalInput>
      <ModalInput
        defaultValue={itemInfo?.quantity}
        area={"1/4/1/5"}
      ></ModalInput>
      <ModalInput defaultValue={itemInfo?.price} area={"1/5/1/6"}></ModalInput>
      <TotalSumCell area={"1/6/1/7"}>
        {formatMoney(itemInfo?.total)
          ? formatMoney(itemInfo?.total)
          : formatMoney(0)}
        <BiTrash
          onClick={() => onRemove(number)}
          style={{ width: "16px", height: "16px", cursor: "pointer" }}
        />
      </TotalSumCell>
    </ModalRow>
  )
}

export default InvoiceItem
