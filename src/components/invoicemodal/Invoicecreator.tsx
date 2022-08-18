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

const Invoicecreator = () => {
  const dispatch = useDispatch()
  const modalIsOpen = useSelector(modalStatus)

  const modalType = useSelector(selectModalType)

  const invoiceItems = useSelector(selectItems)

  const modalREF = useRef()

  const router = useRouter()
  const invoice = useSelector(selectCurrentInvoice)
  const invoicesLIST = useSelector(invoices)

  console.log(invoice)
  console.log(router)

  const [itemList, setItemList] = useState([])

  useOnClickOutside(modalREF, () => modalCoser())

  // UPDATE LIST ITEMS
  useEffect(() => {
    setItemList(invoice?.items)
  }, [invoice])

  // REMOVE ITEM FROM
  const removeItem = (itemID: string) => {
    // const newList = itemList.filter((item: Item) => item.id !== itemID)
    dispatch(deleteItem(itemID))
  }

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
        <BillFrom
          modalState={modalType}
          addressInfo={invoice?.senderAddress}
        ></BillFrom>
        {/* Bill TO  */}
        <BillTo
          modalState={modalType}
          addressInfo={invoice?.clientAddress}
        ></BillTo>
        {/* DATES */}
        <ModalBlock dates key={"dt"}>
          <InvoiceInput
            area={"invD"}
            value={invoice?.createdAt}
            initialState={modalType}
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
            initialState={modalType}
            name={"description"}
            format={"text"}
            title={"Project Description"}
          />
        </ModalBlock>
        {/* ITEMS */}
        <ModalBlock LIST key={"itms"}>
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
          {invoiceItems
            ? invoiceItems.map((item: Item, index) => {
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
