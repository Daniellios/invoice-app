import React, { useState } from "react"

import {
  Modal,
  ModalContent,
  ModalTitle,
  ModalBlock,
  ModalBlockTitle,
  ModalInputWrap,
  ModalInputTitle,
  ModalInputMistake,
  ModalInput,
  ItemListTitle,
  TotalSumCell,
  AddItem,
  ModalFooter,
} from "./InvoiceModalStyles"
import { BiTrash } from "react-icons/bi"
import { formatMoney } from "../../helpers/moneyFormatter"
import { Button } from "../../styles/buttons"
import { useDispatch, useSelector } from "react-redux"
import { newInvoice } from "../../store/slices/modalSlice"
import { randomIdGenerator } from "../../helpers/idGenerator"
import { ItemIdHash } from "../../styles/repeatables"
import { useRouter } from "next/router"

const Invoicecreator = () => {
  const modal = useSelector((state) => state.createInvoice.isOpen)
  const invoiceData = useSelector((state) => state.currData)
  const dispatch = useDispatch()
  const router = useRouter()
  const [modalType, setModalType] = useState("NEW")

  console.log(invoiceData)

  const test = () => {
    if (router.pathname === "/") return
    if (router.pathname === "/invoice/[id]") setModalType("EDIT")
  }

  return (
    <Modal type={modalType} isOpen={modal}>
      <ModalContent>
        <ModalTitle>New Invoice</ModalTitle>
        {/* Bill FROM  */}
        <ModalBlock billFrom key={"bf"}>
          <ModalBlockTitle>Bill From</ModalBlockTitle>
          <ModalInputWrap gridArea={"sa"}>
            <ModalInputTitle>Streen Address</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"city"}>
            <ModalInputTitle>City</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"ps"}>
            <ModalInputTitle>Post Code</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"ctry"}>
            <ModalInputTitle>Country</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
        </ModalBlock>
        {/* Bill TO  */}
        <ModalBlock billTo key={"bt"}>
          <ModalBlockTitle>Bill To</ModalBlockTitle>
          <ModalInputWrap gridArea={"clN"}>
            <ModalInputTitle>Client's name</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput type={"text"} />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"clE"} mistake={false}>
            <ModalInputTitle>Client's Email</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"adrs"} mistake={false}>
            <ModalInputTitle>Street Address</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"city"}>
            <ModalInputTitle>City</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"ps"}>
            <ModalInputTitle>Post Code</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"ctry"}>
            <ModalInputTitle>Country</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
        </ModalBlock>
        {/* DATES */}
        <ModalBlock dates key={"dt"}>
          <ModalInputWrap gridArea={"invD"}>
            <ModalInputTitle>Invoice date</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput type={"date"} />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"term"}>
            <ModalInputTitle>Payment terms</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
          <ModalInputWrap gridArea={"pd"}>
            <ModalInputTitle>Project Description</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <ModalInput />
          </ModalInputWrap>
        </ModalBlock>
        {/* ITEMS */}
        <ModalBlock list={"true"} key={"itms"}>
          <ItemListTitle>Item List</ItemListTitle>
          <ModalInputTitle area={"2/1/2/2"}>Item name</ModalInputTitle>
          <ModalInputTitle area={"2/4/2/4"}>QTY</ModalInputTitle>
          <ModalInputTitle area={"2/5/2/5"}>Price</ModalInputTitle>
          <ModalInputTitle area={"2/6/2/6"}>Total</ModalInputTitle>
          <ModalInput area={"3/1/3/4"}></ModalInput>
          <ModalInput area={"3/4/3/5"}></ModalInput>
          <ModalInput area={"3/5/3/6"}></ModalInput>
          <TotalSumCell area={"3/6/3/7"}>
            {formatMoney(5000)}
            <BiTrash
              style={{ width: "16px", height: "16px", cursor: "pointer" }}
            />
          </TotalSumCell>
          <AddItem area={"auto/1/auto/7"}>+ Add New Item</AddItem>
        </ModalBlock>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => dispatch(newInvoice(false))} basicWhite>
          Discard
        </Button>
        <Button darkgray>Save as Draft</Button>
        <Button purple>Sace and Send</Button>
      </ModalFooter>
    </Modal>
  )
}

export default Invoicecreator
