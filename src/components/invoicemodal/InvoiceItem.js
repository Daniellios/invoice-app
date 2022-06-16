import React from "react"
import { BiTrash } from "react-icons/bi"
import { formatMoney } from "../../helpers/moneyFormatter"
import InvoiceInput from "./InvoiceInput"

import { ModalRow, TotalSumCell } from "./InvoiceModalStyles"

const InvoiceItem = ({ itemInfo, onRemove, number }) => {
  return (
    <ModalRow number={number}>
      <InvoiceInput
        value={itemInfo?.name}
        area={"1/1/1/4"}
        itemInput
        id={`items.name.${number}`}
      />
      <InvoiceInput
        value={itemInfo?.quantity}
        area={"1/4/1/5"}
        itemInput
        id={`items.quantity.${number}`}
      />
      <InvoiceInput
        value={itemInfo?.price}
        area={"1/5/1/6"}
        itemInput
        id={`items.price.${number}`}
      />
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
