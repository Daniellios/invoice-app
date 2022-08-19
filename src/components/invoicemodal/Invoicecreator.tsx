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
import {
  addItem,
  deleteItem,
  updateInvoiceInfo,
  changeModalType,
  invoices,
  selectModalType,
  selectItems,
  createNewModal,
  selectCurrentInvoice,
  setCurrentInvoice,
} from "../../store/slices/dataSlice"

import useOnClickOutside from "../../hooks/useClickOutsideHook"
import BillFrom from "./BillFrom"
import BillTo from "./BillTo"
import { modalCoser, modalOpener } from "../../utils/dispatchFunctions"
import { modalStatus } from "../../store/slices/modalSlice"
import { Item } from "../../types/interfaces"

import { columnNames } from "../../constants/columnNames"

const Invoicecreator = () => {
  const dispatch = useDispatch()
  const modalIsOpen = useSelector(modalStatus)
  const modalType = useSelector(selectModalType)
  const invoiceItems = useSelector(selectItems)

  const modalREF = useRef()
  const router = useRouter()
  const invoice = useSelector(selectCurrentInvoice)

  console.log(invoice)
  console.log(router)

  useOnClickOutside(modalREF, () => modalCoser())

  //  UPDATE OBJECT ON NEW INVOICE
  const newModalSetup = () => {
    console.log("NEW SETUP")
    dispatch(createNewModal())
    dispatch(changeModalType("NEW"))
  }

  //  UPDATE OBJECT ON EDIT INVOICE
  const editModalSetup = () => {
    console.log("EDIT SETUP")
    dispatch(changeModalType("EDIT"))
  }

  /// Set EDIT modal or NEW one
  useEffect(() => {
    dispatch(setCurrentInvoice(router.query?.id))
    // console.log("rendered")
    modalCoser()
    if (router.pathname === "/") {
      newModalSetup()
    } else if (router.pathname === "/invoice/[id]") {
      editModalSetup()
    }
  }, [router.pathname])

  const addNewItem = () => {
    dispatch(addItem())
  }

  const saveAsDraft = () => {
    console.log("saved as Draft")
    dispatch(updateInvoiceInfo({ ...invoice, status: "draft" }))
  }

  const saveAndSend = () => {
    console.log("SAVED AND SENT")
    dispatch(updateInvoiceInfo({ ...invoice, status: "pending" }))
    modalCoser()
  }

  return (
    <Modal isOpen={modalIsOpen} ref={modalREF}>
      <GoBackDiv modalLink>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={modalCoser}>Go Back</GoBackLink>
      </GoBackDiv>
      <ModalContent>
        {modalType === "NEW" ? (
          <ModalTitle>New Invoice</ModalTitle>
        ) : (
          <ModalTitle>
            Edit
            <ItemIdHash big> #</ItemIdHash>
            {invoice?.id}
          </ModalTitle>
        )}
        {/* Bill FROM  */}
        <BillFrom addressInfo={invoice?.senderAddress}></BillFrom>
        {/* Bill TO  */}
        <BillTo addressInfo={invoice?.clientAddress}></BillTo>
        {/* DATES */}
        <ModalBlock dates key={"dt"}>
          <InvoiceInput
            area={"invD"}
            value={invoice?.createdAt}
            name={"createdAt"}
            format={"date"}
            title={"Invoice Date"}
          />
          <ModalInputWrap gridArea={"term"}>
            <ModalInputTitle>Payment terms</ModalInputTitle>
            <ModalInputMistake>Mistake</ModalInputMistake>
            <Dropdown value={invoice?.paymentTerms} />
          </ModalInputWrap>
          <InvoiceInput
            area={"pd"}
            value={invoice?.description}
            name={"description"}
            format={"text"}
            title={"Project Description"}
          />
        </ModalBlock>
        {/* ITEMS */}
        <ModalBlock LIST key={"itms"}>
          <ItemListTitle>Item List</ItemListTitle>
          {/* TITLE ROW - COLUMN NAMES */}
          <ModalRow titleRow>
            {columnNames.map((column, index) => (
              <ModalInputTitle
                key={column.area + index}
                rowTitle
                area={column.area}
              >
                {column.title}
              </ModalInputTitle>
            ))}
          </ModalRow>
          {invoiceItems
            ? invoiceItems.map((item: Item, index: number) => {
                return (
                  <InvoiceItem
                    itemInfo={item}
                    key={item.id}
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
        <Button onClick={modalCoser} basicWhite>
          Discard
        </Button>
        <Button darkgray onClick={saveAsDraft}>
          Save as Draft
        </Button>
        <Button purple onClick={saveAndSend}>
          Save and Send
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default Invoicecreator
