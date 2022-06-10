import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  Container,
  InvFilterContainer,
  InvTitle,
  InvSpan,
  InvTitleWrap,
  InvButtonsContainer,
  InvStatusSpan,
  ArrowImg,
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
import data from "../../data/data.json"
import { transformDate } from "../../helpers/dateFormatter"
import { useSelector, useDispatch } from "react-redux"
import { formatMoney } from "../../helpers/moneyFormatter"

import {
  ItemStatus,
  ItemStatusCircle,
  ItemStatusTitle,
  ItemId,
  ItemIdHash,
} from "../../styles/repeatables"
import { newInvoice } from "../../store/slices/modalSlice"
import { setCurrInvoice, setId } from "../../store/slices/dataSlice"

// export const getStaticProps = async (context) => {
//   // const invoices = await import("../../data/data.json")
//   console.log(context)
//   return {
//     props: {
//       invoices: data,
//     },
//   }
// }

const Content = (props) => {
  const [isOpened, setIsOpened] = useState(false)
  const statuses = useSelector((state) => state.statusToggle.value)
  const dispatch = useDispatch()
  const [invoiceList, setInvoceList] = useState(data)

  useEffect(() => {
    if (invoiceList.length > 20) {
      return
    } else {
      localStorage.setItem("invoices", JSON.stringify(invoiceList))
    }
  }, [invoiceList])

  const [checkedState, setCheckedStates] = useState(statusTypes)

  const toggleDiv = () => {
    setIsOpened((wasOpened) => !wasOpened)
  }

  const chooseInvoice = (id) => {
    dispatch(setId(id))
    dispatch(setCurrInvoice())
  }
  // const checkEmptyInvoices = (currentList) => {
  //   currentList.map((item, index) => {
  //     if (!item[("id", "clienName", "paymentDue")]) {
  //       console.log(item)
  //     } else if (Object.values(item).some((value) => !value)) {
  //       item.status = "draft"
  //     }
  //   })
  // }

  const test = () => {
    console.log(typeof invoiceList[0], invoiceList[0])
    let filteredInvoices = []
  }

  const handleCheckBox = (name) => {
    const updatedCheckedState = checkedState.map((item, index) => {
      const keyName = Object.keys(item)[0]
      if (name === keyName) {
        item[name] = !item[name]
      }

      return item
    })

    setCheckedStates(updatedCheckedState)
    test()
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
            <ArrowImg isOpen={isOpened} src={"/assets/icon-arrow-down.svg"} />
          </InvStatusSpan>
          {isOpened && (
            <InvBoxChecks>
              {checkedState.map((item, index) => {
                const stName = Object.keys(item)[0]
                return (
                  <InvCheckBoxPair key={index}>
                    <InvCheckBoxCont
                      onClick={() => handleCheckBox(stName)}
                      Checked={item[stName]}
                      id={stName}
                    >
                      <InvCheckBoxIcon
                        Checked={item[stName]}
                        src={"/assets/icon-check.svg"}
                      />
                    </InvCheckBoxCont>
                    <InvCheckBoxSpan>{stName}</InvCheckBoxSpan>
                  </InvCheckBoxPair>
                )
              })}
            </InvBoxChecks>
          )}
          <Button onClick={() => dispatch(newInvoice(true))} newInvoice>
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
