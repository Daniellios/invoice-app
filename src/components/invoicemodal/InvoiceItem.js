import React, { useState } from "react"
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

const InvoiceItem = ({ itemInfo, onRemove, number }) => {
  // console.log(itemInfo.quantity, itemInfo.price)

  const [total, setTotal] = useState(0)

  const handleTotal = (newValues) => {
    const { quantity, price } = newValues[number]
    const newTotal = quantity * price
    setTotal(formatMoney(newTotal))
  }

  // console.log(total)
  return (
    <ModalRow number={number}>
      <ModalInputWrap itemWrap gridArea={"ItmN"}>
        <ModalInputTitle itemTitle>Item Name</ModalInputTitle>
        <InvoiceInput
          value={itemInfo?.name}
          name={`items[${number}].name`}
          itemInput
        />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"QTY"}>
        <ModalInputTitle itemTitle>Quantity</ModalInputTitle>
        <InvoiceInput
          big={true}
          value={itemInfo?.quantity}
          name={`items[${number}].quantity`}
          itemInput
          handleTotal={handleTotal}
          title={"qty"}
        />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"Price"}>
        <ModalInputTitle itemTitle>Price</ModalInputTitle>
        <InvoiceInput
          value={itemInfo?.price}
          name={`items[${number}].price`}
          itemInput
          title={"price"}
          handleTotal={handleTotal}
        />
      </ModalInputWrap>
      <ModalInputWrap itemWrap gridArea={"Total"}>
        <ModalInputTitle itemTitle>Total</ModalInputTitle>
        <TotalSumCell>
          {total || itemInfo?.total}
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
