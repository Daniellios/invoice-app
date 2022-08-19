import React, { useState } from "react"
import { BiTrash } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { formatMoney } from "../../helpers/moneyFormatter"
import { deleteItem } from "../../store/slices/dataSlice"
import { IconWrap } from "../../styles/repeatables"
import { InvoiceItemProps } from "../../types/componentProps"
import InvoiceInput from "./InvoiceInput"

import {
  ModalRow,
  TotalSumCell,
  ModalInputWrap,
  ModalInputTitle,
} from "./InvoiceModalStyles"

const InvoiceItem = ({ itemInfo, number }: InvoiceItemProps) => {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const handleTotal = (newValues: number): void => {
    const { quantity, price } = newValues[number]
    const newTotal = quantity * price
    setTotal(formatMoney(newTotal))
  }

  // console.log(total)
  return (
    <ModalRow>
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
              onClick={() => dispatch(deleteItem(itemInfo.id))}
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
          </IconWrap>
        </TotalSumCell>
      </ModalInputWrap>
    </ModalRow>
  )
}

export default InvoiceItem
