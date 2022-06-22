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
  ItemListTitle,
  AddItem,
  ModalFooter,
  ModalRow,
} from "./InvoiceModalStyles"
import { Button } from "../../styles/buttons"
import { useDispatch, useSelector } from "react-redux"
import { openModal } from "../../store/slices/modalSlice"
import { randomIdGenerator } from "../../helpers/idGenerator"
import {
  ItemIdHash,
  GoBackDiv,
  GoBackLink,
  GoBackImg,
} from "../../styles/repeatables"
import { useRouter } from "next/router"
import Dropdown from "../dropdownterms/Dropdown"

import InvoiceItem from "./InvoiceItem"
import InvoiceInput from "./InvoiceInput"
import { resetCurrInvoice } from "../../store/slices/dataSlice"
import useClickOutside from "../../hooks/clickOutsideHook"

const Invoicecreator = () => {
  const modalIsOpen = useSelector((state) => state.modalInvoice.isModalOpen)
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

  // remove to invoice item maybe?
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

  /// Set EDIT modal or NEW one
  useEffect(() => {
    dispatch(openModal(false))
    if (router.pathname === "/") {
      dispatch(resetCurrInvoice())
      setCurrInvoice(null)
      setItemList([])
      setModalType("NEW")
    } else if (router.pathname === "/invoice/[id]") {
      setModalType("EDIT")
    }
  }, [router.pathname])

  let domNode = useClickOutside(() => {
    dispatch(openModal(false))
  })

  const saveAsDraft = () => {
    console.log("saved as Draft")
  }

  const saveAndSend = () => {
    console.log("SAVED AND SENT")
    console.log(invoice)
  }

  return (
    <Modal isOpen={modalIsOpen} ref={domNode} data-hook={"ICON"}>
      <GoBackDiv modalLink>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={() => dispatch(openModal(false))}>
          Go Back
        </GoBackLink>
      </GoBackDiv>
      <ModalContent>
        <ModalTitle>
          {modalType === "NEW" ? `New Invoice` : `Edit #${invoice.id}`}
        </ModalTitle>
        {/* Bill FROM  */}
        <ModalBlock billFrom key={"bf"}>
          <ModalBlockTitle>Bill From</ModalBlockTitle>
          <InvoiceInput
            area={"sa"}
            value={invoice?.senderAddress.street}
            initialState={modalType}
            name={"Street Address"}
            id={"senderAddress.street"}
          />
          <InvoiceInput
            area={"city"}
            value={invoice?.senderAddress.city}
            initialState={modalType}
            name={"City"}
            id={"senderAddress.city"}
          />
          <InvoiceInput
            area={"ps"}
            value={invoice?.senderAddress.postCode}
            initialState={modalType}
            name={"Post Code"}
            id={"senderAddress.postCode"}
          />
          <InvoiceInput
            area={"ctry"}
            value={invoice?.senderAddress.country}
            initialState={modalType}
            name={"Country"}
            id={"senderAddress.country"}
          />
        </ModalBlock>
        {/* Bill TO  */}
        <ModalBlock billTo key={"bt"}>
          <ModalBlockTitle>Bill To</ModalBlockTitle>
          <InvoiceInput
            area={"clN"}
            value={invoice?.clientName}
            initialState={modalType}
            name={"Client's name"}
            id={"clientName"}
          />
          <InvoiceInput
            area={"clE"}
            value={invoice?.clientEmail}
            initialState={modalType}
            name={"Client's email"}
            id={"clientEmail"}
          />
          <InvoiceInput
            area={"adrs"}
            value={invoice?.clientAddress.street}
            initialState={modalType}
            name={"Street Address"}
            id={"clientAddress.street"}
          />
          <InvoiceInput
            area={"city"}
            value={invoice?.clientAddress.city}
            initialState={modalType}
            name={"City"}
            id={"clientAddress.city"}
          />
          <InvoiceInput
            area={"ps"}
            value={invoice?.clientAddress.postCode}
            initialState={modalType}
            name={"Post Code"}
            id={"clientAddress.postCode"}
          />
          <InvoiceInput
            area={"ctry"}
            value={invoice?.clientAddress.country}
            initialState={modalType}
            name={"Country"}
            id={"clientAddress.country"}
          />
        </ModalBlock>
        {/* DATES */}
        <ModalBlock dates key={"dt"}>
          <InvoiceInput
            area={"invD"}
            value={invoice?.createdAt}
            initialState={modalType}
            name={"Invoice date"}
            format={"date"}
            id={"createdAt"}
          />
          <ModalInputWrap gridArea={"term"}>
            <ModalInputTitle>Payment terms</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <Dropdown value={invoice?.paymentTerms} />
          </ModalInputWrap>
          <InvoiceInput
            area={"pd"}
            value={invoice?.description}
            initialState={modalType}
            name={"Project Description"}
            id={"description"}
          />
        </ModalBlock>
        {/* ITEMS */}
        <ModalBlock list={"true"} key={"itms"}>
          <ItemListTitle>Item List</ItemListTitle>
          <ModalRow titleRow>
            <ModalInputTitle rowTitle area={"ItmN"}>
              Item name
            </ModalInputTitle>
            <ModalInputTitle rowTitle area={"QTY"}>
              QTY
            </ModalInputTitle>
            <ModalInputTitle rowTitle area={"Price"}>
              Price
            </ModalInputTitle>
            <ModalInputTitle rowTitle area={"Total"}>
              Total
            </ModalInputTitle>
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
        <Button darkgray onClick={() => saveAsDraft()}>
          Save as Draft
        </Button>
        <Button purple onClick={() => saveAndSend()}>
          Save and Send
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default Invoicecreator
