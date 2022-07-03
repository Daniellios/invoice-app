import React, { useEffect, useMemo, useRef, useState } from "react"
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
import {
  addItem,
  deleteItem,
  resetCurrInvoice,
  inputInvoiceUpdate,
  updateWorkingObject,
  addInvoice,
  updateInvoiceInfo,
  setId,
  changeModalType,
} from "../../store/slices/dataSlice"

import useClickOutside from "../../hooks/clickOutsideHook"
import BillFrom from "./BillFrom"

import BillTo from "./BillTo"

import { modalCoser, modalOpener } from "../../utils/dispatchFunctions"

const Invoicecreator = () => {
  const modalIsOpen = useSelector((state) => state.modalInvoice.isModalOpen)
  const [modalType, setModalType] = useState("NEW")

  // const testTYPE = useSelector((state) => state.currData.modalType)
  const dispatch = useDispatch()
  const router = useRouter()
  const invoice = useSelector((state) => state.currData.currInvoice)
  const invoicesLIST = useSelector((state) => state.currData.invoices)

  const updatedObj = useSelector((state) => state.currData.test)
  const epmtyITEM = useSelector((state) => state.currData.item)

  const [itemList, setItemList] = useState([])

  let domNode = useClickOutside(modalCoser)

  // UPDATE LIST ITEMS
  useEffect(() => {
    setItemList(invoice?.items)
  }, [invoice])

  // REMOVE ITEM FROM
  const removeItem = (itemNumber) => {
    const newList = itemList.filter((item, index) => index !== itemNumber)
    dispatch(deleteItem({ type: modalType, itemNumber: itemNumber }))
    setItemList(newList)
  }

  //  UPDATE OBJECT ON NEW INVOICE
  const newModalSetup = () => {
    console.log("NEW SETUP")
    setModalType("NEW")
    dispatch(updateWorkingObject({ TYPE: "NEW", id: randomIdGenerator() }))
  }

  //  UPDATE OBJECT ON EDIT INVOICE
  const editModalSetup = () => {
    console.log("EDIT SETUP")
    setModalType("EDIT")
    dispatch(updateWorkingObject({ TYPE: "EDIT" }))
  }

  /// Set EDIT modal or NEW one
  useEffect(() => {
    console.log("rendered")
    modalCoser()
    if (router.pathname === "/") {
      console.log("called")
      newModalSetup()
    } else if (router.pathname === "/invoice/[id]") {
      console.log("called")
      editModalSetup()
    }
  }, [router.pathname])

  const addNewItem = () => {
    dispatch(addItem())
    setItemList(itemList.concat(epmtyITEM))
  }

  const saveAsDraft = () => {
    console.log("saved as Draft")
    dispatch(updateInvoiceInfo({ ...invoice, status: "draft" }))
  }

  // const memeTEST = useMemo(() => saveAndSend)

  const saveAndSend = () => {
    console.log("SAVED AND SENT")
    dispatch(updateInvoiceInfo({ ...invoice, status: "pending" }))
    modalCoser()
  }

  // HERE IS STIL EDIT ONE
  console.log(invoice)
  console.log(itemList)
  return (
    <Modal isOpen={modalIsOpen} ref={domNode}>
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
            <Dropdown value={invoice?.paymentTerms} name={"paymentTerms"} />
          </ModalInputWrap>
          <InvoiceInput
            area={"pd"}
            value={invoice?.description}
            initialState={modalType}
            name={"description"}
            title={"Project Description"}
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
