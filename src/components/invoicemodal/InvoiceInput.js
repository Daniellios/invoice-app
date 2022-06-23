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
  propName,
  format,
  name,
  itemInput,
  id,
}) => {
  const [mistake, setMistake] = useState(false)
  const invoice = useSelector((state) => state.currData.currInvoice)
  const newInvItem = useSelector((state) => state.currData.emptyInvoice)
  const dispatch = useDispatch()
  // const [thisInvoice, setThisInvoice] = useState(tempInv)

  const handleChange = (event) => {
    let currInput = event.target.id.split(".")
    console.log(newInvItem)
    if (typeof event.target.value !== "number") {
      setMistake(true)
      setTimeout(() => {
        setMistake(false)
      }, 1500)
    }
    console.log(event.target.getAttribute("id"))
  }

  return (
    <>
      {itemInput ? (
        <ModalInput
          defaultValue={initialState === "NEW" ? propName : value}
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
            defaultValue={initialState === "NEW" ? propName : value}
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
