import React, { useEffect, useState } from "react"
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
import { invoices } from "../../store/slices/dataSlice"
import FilterBox from "../filterbox/Filter"
import { modalOpener, filterToggle } from "../../utils/dispatchFunctions"
import { selectFilterStatus } from "../../store/slices/filterSlice"
import { filterModalStatus } from "../../store/slices/modalSlice"
import { Invoice } from "../../types/interfaces"

import { invoiceListCounter } from "../../helpers/invoiceListCounter"

const Content = () => {
  const dispatch = useDispatch()
  const invoiceListData = useSelector(invoices)
  const [invoiceList, setInvoceList] = useState(invoiceListData)

  const filterModalVisibility = useSelector(filterModalStatus)

  const filterStatus = useSelector(selectFilterStatus)

  // Filter Update
  useEffect(() => {
    if (Object.entries(filterStatus).every((item) => !item[1])) {
      setInvoceList(invoiceListData)
    } else {
      setInvoceList(invoiceListData.filter((inv) => filterStatus[inv.status]))
    }
  }, [filterStatus, invoiceListData])

  return (
    <Container>
      <InvFilterContainer>
        <InvTitleWrap>
          <InvTitle>Invoices</InvTitle>
          <InvSpan>{invoiceListCounter(invoiceList.length)}</InvSpan>
        </InvTitleWrap>
        <InvButtonsContainer>
          <InvStatusSpan onClick={filterToggle}>
            Filter by status
            <ArrowImg
              isOpen={filterModalVisibility}
              src={"/assets/icon-arrow-down.svg"}
            />
          </InvStatusSpan>
          {filterModalVisibility && <FilterBox />}
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
          invoiceList.map((item: Invoice) => (
            <Link
              href={{
                pathname: `/invoice/${encodeURIComponent(item.id)}`,
              }}
              key={item.id}
            >
              <InvBucketItem>
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
