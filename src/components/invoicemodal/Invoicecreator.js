import React, { useEffect, useRef, useState } from "react"

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
  ModalRow,
} from "./InvoiceModalStyles"
import { formatMoney } from "../../helpers/moneyFormatter"
import { Button } from "../../styles/buttons"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../store/slices/modalSlice"
import { randomIdGenerator } from "../../helpers/idGenerator"
import { ItemIdHash } from "../../styles/repeatables"
import { useRouter } from "next/router"
import Dropdown from "../dropdownterms/Dropdown"

import InvoiceItem from "./InvoiceItem"
import { resetCurrInvoice } from "../../store/slices/dataSlice"

// Close modal with outside click
let useClickOutside = (handler) => {
  let modalRef = useRef()

  useEffect(() => {
    let modalHandler = (event) => {
      if (!modalRef.current.contains(event.target)) handler()
    }
    document.addEventListener("mousedown", modalHandler)

    return () => {
      document.removeEventListener("mousedown", modalHandler)
    }
  }, [])

  return modalRef
}

const Invoicecreator = () => {
  const modalIsOpen = useSelector((state) => state.modalInvoice.isOpen)
  const dispatch = useDispatch()
  const router = useRouter()
  const [invoice, setCurrInvoice] = useState(
    useSelector((state) => state.currData.currInvoice)
  )
  const [itemList, setItemList] = useState(fillItemList())

  const [modalType, setModalType] = useState("NEW")

  const removeItem = (itemNumber) => {
    const newList = itemList.filter((item, index) => index !== itemNumber)
    setItemList(newList)
  }

  function fillItemList() {
    if (invoice === null) {
      return []
    } else {
      return invoice.items
    }
  }

  const addNewItem = () => {
    setItemList(itemList.concat({}))
  }

  /// Set EDIT modal type or NEW one
  useEffect(() => {
    dispatch(openModal(false))
    if (router.pathname === "/") {
      dispatch(resetCurrInvoice())
      setItemList([])
      setModalType("NEW")
    } else if (router.pathname === "/invoice/[id]") {
      setModalType("EDIT")
    }
  }, [router.pathname])

  let domNode = useClickOutside(() => {
    dispatch(openModal(false))
  })

  return (
    <Modal isOpen={modalIsOpen} ref={domNode}>
      <ModalContent>
        <ModalTitle>
          {modalType === "NEW" ? `New Invoice` : `Edit #${invoice.id}`}
        </ModalTitle>
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
            <Dropdown value={30} />
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
          <ModalRow>
            <ModalInputTitle area={"1/1/1/2"}>Item name</ModalInputTitle>
            <ModalInputTitle area={"1/4/1/4"}>QTY</ModalInputTitle>
            <ModalInputTitle area={"1/5/1/5"}>Price</ModalInputTitle>
            <ModalInputTitle area={"1/6/1/6"}>Total</ModalInputTitle>
          </ModalRow>
          {itemList
            ? itemList.map((item, index) => {
                return (
                  <InvoiceItem
                    itemInfo={item}
                    onRemove={removeItem}
                    key={index}
                    number={index}
                  ></InvoiceItem>
                )
              })
            : ""}
          <AddItem onClick={addNewItem} area={"auto/1/auto/7"}>
            + Add New Item
          </AddItem>
        </ModalBlock>
      </ModalContent>
      <ModalFooter>
        <Button onClick={() => dispatch(openModal(false))} basicWhite>
          Discard
        </Button>
        <Button darkgray>Save as Draft</Button>
        <Button purple>Sace and Send</Button>
      </ModalFooter>
    </Modal>
  )
}

export default Invoicecreator
