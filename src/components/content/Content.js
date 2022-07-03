import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import {
  Container,
  InvFilterContainer,
  InvTitle,
  InvSpan,
  InvTitleWrap,
  InvButtonsContainer,
  InvStatusSpan,
  PlusIcon,
  PlusDiv,
} from "./FilterPanelStyles"
import { Button } from "../../styles/buttons"
import {
  InvBucketContainer,
  InvBucketItem,
  ItemDate,
  ItemSender,
  ItemPrice,
  ItemBtnInfo,
  EmptyInvoiceBucket,
  EmptyInvoiceImg,
  EmptyInvoiceTextCont,
  EmptyInvoiceTitle,
  EmptyInvoiceText,
  EmptyInvoiceSpan,
} from "./InvoiceBucketStyles"
import { transformDate } from "../../helpers/dateFormatter"
import { useSelector, useDispatch } from "react-redux"
import { formatMoney } from "../../helpers/moneyFormatter"

import {
  ItemStatus,
  ItemStatusCircle,
  ItemStatusTitle,
  ItemId,
  ItemIdHash,
  ArrowImg,
} from "../../styles/repeatables"
import {
  changeModalType,
  getInitialData,
  setCurrInvoice,
  setId,
  updateWorkingObject,
} from "../../store/slices/dataSlice"
import FilterBox from "../filterbox/Filter"
import { modalOpener, filterToggle } from "../../utils/dispatchFunctions"

const Content = (props) => {
  const dispatch = useDispatch()
  const [invoiceList, setInvoceList] = useState(
    useSelector((state) => state.currData.invoices)
  )
  const filterVisibility = useSelector(
    (state) => state.modalInvoice.isFilterOpen
  )

  const currentInvoiceList = useSelector((state) => state.currData.invoices)
  const filterStatus = useSelector((state) => state.statusToggle.value)

  // Local storage update
  useEffect(() => {
    if (invoiceList.length > 100) return
    localStorage.setItem("invoices", JSON.stringify(invoiceList))
  }, [invoiceList])

  console.log(currentInvoiceList)

  // Filter Update
  useEffect(() => {
    const filterStatusArr = Object.values(filterStatus)
    if (filterStatusArr.every((item) => !item)) {
      setInvoceList(currentInvoiceList)
    } else {
      const filteredList = []
      currentInvoiceList.filter((inv, index) => {
        if (filterStatus[inv.status]) {
          filteredList.push(inv)
        }
      })
      setInvoceList(filteredList)
    }
  }, [filterStatus, currentInvoiceList])

  // const createNewInvoice = () => {
  //   dispatch(changeModalType("NEW"))
  //   dispatch(updateWorkingObject("NEW"))
  //   dispatch(setId())
  //   modalOpener()
  // }

  const chooseInvoice = (id) => {
    dispatch(setId(id))
  }

  return (
    <Container>
      <InvFilterContainer>
        <InvTitleWrap>
          <InvTitle>Invoices</InvTitle>
          <InvSpan>
            {invoiceList.length > 0
              ? `${invoiceList.length} invoices`
              : `No Invoices`}
          </InvSpan>
        </InvTitleWrap>
        <InvButtonsContainer>
          <InvStatusSpan onClick={filterToggle}>
            Filter by status
            <ArrowImg
              isOpen={filterVisibility}
              src={"/assets/icon-arrow-down.svg"}
            />
          </InvStatusSpan>
          {filterVisibility && <FilterBox />}
          <Button onClick={modalOpener} newInvoice>
            <PlusDiv>
              <PlusIcon src={"/assets/icon-plus.svg"} />
            </PlusDiv>
            New Invoice
          </Button>
        </InvButtonsContainer>
      </InvFilterContainer>

      <InvBucketContainer>
        {invoiceList.length > 0 ? (
          invoiceList.map((item, index) => (
            <Link
              href={{
                pathname: `/invoice/${encodeURIComponent(item.id)}`,
              }}
              key={index}
            >
              <InvBucketItem onClick={() => chooseInvoice(item.id)}>
                <ItemId>
                  <ItemIdHash>#</ItemIdHash>
                  {item.id}
                </ItemId>
                <ItemDate>Due {transformDate(item.paymentDue)}</ItemDate>
                <ItemSender>{item.clientName}</ItemSender>
                <ItemPrice>
                  {item.total ? `$ ${formatMoney(item.total)}` : ""}
                </ItemPrice>
                <ItemStatus mainPage _STATUS={item.status}>
                  <ItemStatusCircle />
                  <ItemStatusTitle>{item.status}</ItemStatusTitle>
                </ItemStatus>
                <ItemBtnInfo>
                  <ArrowImg isLink src={"/assets/icon-arrow-right.svg"} />
                </ItemBtnInfo>
              </InvBucketItem>
            </Link>
          ))
        ) : (
          <EmptyInvoiceBucket>
            <EmptyInvoiceImg src={"/assets/illustration-empty.svg"} />
            <EmptyInvoiceTextCont>
              <EmptyInvoiceTitle>There is nothing here</EmptyInvoiceTitle>
              <EmptyInvoiceText>
                Create an invoice by clicking the
                <EmptyInvoiceSpan> New Invoice </EmptyInvoiceSpan> button and
                get started
              </EmptyInvoiceText>
            </EmptyInvoiceTextCont>
          </EmptyInvoiceBucket>
        )}
      </InvBucketContainer>
    </Container>
  )
}

export default Content
