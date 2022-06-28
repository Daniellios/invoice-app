import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  updateInvoiceInfo,
  inputInvoiceUpdate,
} from "../../store/slices/dataSlice"
import {
  ModalInput,
  ModalInputWrap,
  ModalInputTitle,
  ModalInputMistake,
} from "./InvoiceModalStyles"

import { set, has } from "lodash"

const InvoiceInput = ({
  value,
  onChangeHandle,
  area,
  initialState,
  propName,
  format,
  name,
  title,
  itemInput,
  onCustomSubmit,
}) => {
  const newInv = useSelector((state) => state.currData.emptyInvoice)

  const [mistake, setMistake] = useState(false)

  const dispatch = useDispatch()
  const copiedObject = JSON.parse(JSON.stringify(newInv))
  const handleChange = (e) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const key = e.target.name
    const value = e.target.value

    set(copiedObject, key, value)
    dispatch(inputInvoiceUpdate({ ...copiedObject }))
    console.log(copiedObject)
  }

  return (
    <>
      {itemInput ? (
        <ModalInput
          defaultValue={initialState === "NEW" ? null : value}
          type={format || ""}
          onChange={handleChange}
          area={area}
          name={name}
        ></ModalInput>
      ) : (
        <ModalInputWrap mistake={mistake} gridArea={area}>
          <ModalInputTitle>{title}</ModalInputTitle>
          <ModalInputMistake>Can't be empty</ModalInputMistake>
          <ModalInput
            defaultValue={initialState === "NEW" ? null : value}
            type={format || ""}
            onChange={handleChange}
            name={name}
            // id={id}
          ></ModalInput>
        </ModalInputWrap>
      )}
    </>
  )
}

export default InvoiceInput
