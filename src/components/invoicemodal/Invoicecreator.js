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
import { openModal, setModalType } from "../../store/slices/modalSlice"
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
} from "../../store/slices/dataSlice"

import useClickOutside from "../../hooks/clickOutsideHook"
import BillFrom from "./BillFrom"

import BillTo from "./BillTo"

const Invoicecreator = () => {
  const modalIsOpen = useSelector((state) => state.modalInvoice.isModalOpen)
  const [modalType, setModalType] = useState("NEW")
  const dispatch = useDispatch()
  const router = useRouter()
  const invoice = useSelector((state) => state.currData.currInvoice)

  const epmtyITEM = useSelector((state) => state.currData.item)

  const [itemList, setItemList] = useState([])

  const removeItem = (itemNumber) => {
    const newList = itemList.filter((item, index) => index !== itemNumber)
    dispatch(deleteItem({ type: modalType, itemNumber: itemNumber }))
    setItemList(newList)
  }
  const newModalSetup = () => {
    console.log("NEW SETUP")
    setModalType("NEW")
    dispatch(updateWorkingObject("NEW"))

    // dispatch(inputInvoiceUpdate({ ...invoice, id: randomIdGenerator() }))
    // setItemList(invoice.items)
  }

  const editModalSetup = () => {
    console.log("EDIT SETUP")
    setModalType("EDIT")
    dispatch(updateWorkingObject("EDIT"))

    setItemList(invoice.items)
  }
  /// Set EDIT modal or NEW one
  useEffect(() => {
    dispatch(openModal(false))
    if (router.pathname === "/") {
      console.log("called")
      newModalSetup()
    } else if (router.pathname === "/invoice/[id]") {
      console.log("called")
      editModalSetup()
    }
  }, [router.pathname])

  const addNewItem = () => {
    dispatch(addItem(modalType))
    setItemList(itemList.concat(epmtyITEM))
    // setCurrINV(newInv)
  }

  const handleSubmit = () => {
    console.log("SUBMITTED")
  }

  let domNode = useClickOutside(() => {
    dispatch(openModal(false))
  })

  const saveAsDraft = () => {
    console.log("saved as Draft")
  }

  const saveAndSend = () => {
    handleSubmit()
    console.log("SAVED AND SENT")
    // console.log(newInv)
  }
  // console.log(newInv)
  console.log("updated", invoice)
  return (
    <Modal isOpen={modalIsOpen} ref={domNode}>
      <GoBackDiv modalLink>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={() => dispatch(openModal(false))}>
          Go Back
        </GoBackLink>
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
                    // propName={invoice?.items[index]}
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
