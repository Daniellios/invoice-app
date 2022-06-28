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
  InvBoxChecks,
  InvCheckBoxPair,
  InvCheckBoxSpan,
  InvCheckBoxCont,
  InvCheckBoxIcon,
  PlusIcon,
  PlusDiv,
} from "./FilterPanelStyles"
import { Button } from "../../styles/buttons"
import { statusTypes } from "../../data/constants"
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
import { openModal, toggleFilter } from "../../store/slices/modalSlice"
import {
  getInitialData,
  setCurrInvoice,
  setId,
} from "../../store/slices/dataSlice"
import FilterBox from "../filterbox/Filter"

const Content = (props) => {
  const dispatch = useDispatch()
  const [invoiceList, setInvoceList] = useState(
    useSelector((state) => state.currData.invoices)
  )
  const filterVisibility = useSelector(
    (state) => state.modalInvoice.isFilterOpen
  )

  const filterStatus = useSelector((state) => state.statusToggle.value)
  const initialState = useSelector((state) => state.currData.invoices)

  // List UPDATE
  useEffect(() => {
    if (invoiceList.length > 100) return
    localStorage.setItem("invoices", JSON.stringify(invoiceList))
  }, [invoiceList])

  // Filter Update
  useEffect(() => {
    const filterStatusArr = Object.values(filterStatus)
    if (filterStatusArr.every((item) => !item)) {
      setInvoceList(initialState)
    } else {
      const filteredList = []
      initialState.filter((inv, index) => {
        if (filterStatus[inv.status]) {
          filteredList.push(inv)
        }
      })
      setInvoceList(filteredList)
    }
  }, [filterStatus])

  const toggleDiv = () => {
    dispatch(toggleFilter(!filterVisibility))
  }

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
          <InvStatusSpan onClick={toggleDiv}>
            Filter by status
            <ArrowImg
              isOpen={filterVisibility}
              src={"/assets/icon-arrow-down.svg"}
            />
          </InvStatusSpan>
          {filterVisibility && <FilterBox />}
          <Button onClick={() => dispatch(openModal(true))} newInvoice>
            <PlusDiv>
              <PlusIcon src={"/assets/icon-plus.svg"} />
            </PlusDiv>
            New Invoice
          </Button>
        </InvButtonsContainer>
      </InvFilterContainer>

      <InvBucketContainer>
        {invoiceList.length > 0 ? (
          invoiceList.map((item, index) =>
            item[("id", "paymentDue", "clientName")] == undefined || null ? (
              ""
            ) : (
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
            )
          )
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
