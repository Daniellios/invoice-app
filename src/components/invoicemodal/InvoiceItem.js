import React from "react"
import { BiTrash } from "react-icons/bi"
import { formatMoney } from "../../helpers/moneyFormatter"
import { IconWrap } from "../../styles/repeatables"
import InvoiceInput from "./InvoiceInput"

import {
  ModalRow,
  TotalSumCell,
  ModalInputWrap,
  ModalInputTitle,
} from "./InvoiceModalStyles"

const InvoiceItem = ({ itemInfo, onRemove, number, propName }) => {
  return (
    <ModalRow number={number}>
      <ModalInputWrap itemWrap gridArea={"ItmN"}>
        <ModalInputTitle itemTitle>Item Name</ModalInputTitle>
        <InvoiceInput value={itemInfo?.name} itemInput />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"QTY"}>
        <ModalInputTitle itemTitle>Quantity</ModalInputTitle>
        <InvoiceInput value={itemInfo?.quantity} itemInput />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"Price"}>
        <ModalInputTitle itemTitle>Price</ModalInputTitle>
        <InvoiceInput value={itemInfo?.price} itemInput />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"Total"}>
        <ModalInputTitle itemTitle>Total</ModalInputTitle>
        <TotalSumCell>
          {formatMoney(itemInfo?.total)
            ? formatMoney(itemInfo?.total)
            : formatMoney(0)}
          <IconWrap trash>
            <BiTrash
              onClick={() => onRemove(number)}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
          </IconWrap>
        </TotalSumCell>
      </ModalInputWrap>
    </ModalRow>
  )
}

export default InvoiceItem
