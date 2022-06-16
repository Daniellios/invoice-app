import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateInvoiceInfo, testInvoice } from "../../store/slices/dataSlice"
import {
  ModalInput,
  ModalInputWrap,
  ModalInputTitle,
  ModalInputMistake,
} from "./InvoiceModalStyles"

const InvoiceInput = ({
  value,
  onChangeHandle,
  area,
  initialState,
  format,
  name,
  itemInput,
  id,
}) => {
  const [mistake, setMistake] = useState(false)
  const invoice = useSelector((state) => state.currData.currInvoice)
  const editedInvoice = useSelector((state) => state.currData.emptyInvoice)
  const dispatch = useDispatch()
  const tempInv = { ...invoice }
  // const [thisInvoice, setThisInvoice] = useState(tempInv)

  const handleChange = (event) => {
    let currInput = event.target.id.split(".")
    if (currInput.length === 3) {
      tempInv[currInput[0]][currInput[2]][currInput[1]] = event.target.value
    } else if (currInput.length === 2) {
      tempInv[currInput[0]][currInput[1]] = event.target.value
    } else if (currInput.length === 1) {
      tempInv[currInput[0]] = event.target.value
    }
    console.log(tempInv)
  }

  return (
    <>
      {itemInput ? (
        <ModalInput
          defaultValue={initialState === "NEW" ? "" : value}
          type={format || ""}
          onChange={handleChange}
          area={area}
          id={id}
        ></ModalInput>
      ) : (
        <ModalInputWrap mistake={mistake} gridArea={area}>
          <ModalInputTitle>{name}</ModalInputTitle>
          <ModalInputMistake>Can't be empty</ModalInputMistake>
          <ModalInput
            defaultValue={initialState === "NEW" ? "" : value}
            type={format || ""}
            onChange={handleChange}
            id={id}
          ></ModalInput>
        </ModalInputWrap>
      )}
    </>
  )
}

export default InvoiceInput
