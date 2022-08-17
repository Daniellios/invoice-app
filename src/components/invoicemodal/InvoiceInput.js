import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { inputInvoiceUpdate } from "../../store/slices/dataSlice"
import {
  ModalInput,
  ModalInputWrap,
  ModalInputTitle,
  ModalInputMistake,
} from "./InvoiceModalStyles"

import { set } from "lodash"

const InvoiceInput = ({
  value,
  onChangeHandle,
  area,
  initialState,
  format,
  name,
  title,
  itemInput,
  onCustomSubmit,
  handleTotal,
  big,
}) => {
  const newInv = useSelector((state) => state.data.currInvoice)
  const [mistake, setMistake] = useState(false)
  const dispatch = useDispatch()
  // const copiedObject = JSON.parse(JSON.stringify(newInv))

  const handleChange = (e) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const key = e.target.name
    const value = e.target.value
    const title = e.target.title
    // milliseconds = days * 1000*60*60*24
    // console.log(new Date(1656028800000).toISOString().split("T")[0])

    // INSTEAD OF UPDATING IT IN STORE EACH TIME,
    //  Make it the same as above with totalHandle,
    // Only dispatch after save and send
    set(copiedObject, key, value)
    dispatch(inputInvoiceUpdate(copiedObject))
    if (title) {
      handleTotal(copiedObject.items)
    }
  }

  return (
    <>
      {itemInput ? (
        <ModalInput
          big={big}
          defaultValue={initialState === "NEW" ? null : value}
          type={format || ""}
          onChange={handleChange}
          area={area}
          name={name}
          title={title}
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
          ></ModalInput>
        </ModalInputWrap>
      )}
    </>
  )
}

export default InvoiceInput
