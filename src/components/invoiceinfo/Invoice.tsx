import React, { useState } from "react"
import { Button } from "../../styles/buttons"
import { useRouter } from "next/router"

import {
  Container,
  EditPanel,
  ButtonPanel,
  StatusSpan,
  StatusPanel,
  InvoiceContentPanel,
  InvoiceContentTop,
  InvoiceName,
  AddressInfoList,
  ListItem,
  InvoiceContentMiddle,
  InvoiceDates,
  InvoiceDate,
  InvoiceSubTitle,
  InvoiceBillTo,
  InvoiceEmail,
  InvoiceStrongLine,
  InvoiceContentBottom,
  InvoiceCart,
  InvoiceAmountDue,
  InvoiceCartRow,
  InvoiceTotal,
  ButtonsFooter,
  Separator,
} from "./InvoiceStyles"

import {
  ItemStatus,
  ItemStatusCircle,
  ItemStatusTitle,
  ItemId,
  ItemIdHash,
  GoBackDiv,
  GoBackImg,
  GoBackLink,
} from "../../styles/repeatables"
import { transformDate } from "../../helpers/dateFormatter"
import { getTotal } from "../../helpers/getTotalSum"
import { useDispatch, useSelector } from "react-redux"
import {
  selectCurrentInvoice,
  updateInvoiceInfo,
} from "../../store/slices/dataSlice"

import DeletePopup from "../deletepopup/DeletePopup"
import { formatMoney } from "../../helpers/moneyFormatter"
import {
  deletePopupCloser,
  deletePopupOpener,
  modalOpener,
} from "../../utils/dispatchFunctions"
import { Item } from "../../types/interfaces"

const Invoice = ({ invoiceInfo }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  // const invoice = useSelector(selectCurrentInvoice)
  const [currStatus, setCurrStatus] = useState<string>(invoiceInfo.status)

  const goBack = () => {
    router.back()
  }

  const markAsPaid = () => {
    setCurrStatus("paid")
    dispatch(updateInvoiceInfo({ ...invoiceInfo, status: "paid" }))
  }

  return (
    <Container>
      <DeletePopup id={invoiceInfo.id} />
      <GoBackDiv>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={goBack}> Go Back</GoBackLink>
      </GoBackDiv>
      <EditPanel>
        <StatusPanel>
          <StatusSpan>Status</StatusSpan>
          <ItemStatus _STATUS={currStatus}>
            <ItemStatusCircle />
            <ItemStatusTitle>{currStatus} </ItemStatusTitle>
          </ItemStatus>
        </StatusPanel>
        <ButtonPanel>
          <Button key={"edit"} onClick={modalOpener} darkgray>
            edit
          </Button>
          <Button key={"delete"} onClick={deletePopupOpener} red>
            Delete
          </Button>
          <Button key={"markPaid"} purple onClick={markAsPaid}>
            Mark As Paid
          </Button>
        </ButtonPanel>
      </EditPanel>

      <InvoiceContentPanel>
        <InvoiceContentTop>
          <InvoiceName>
            <ItemId>
              <ItemIdHash>#</ItemIdHash>
              {invoiceInfo.id}
            </ItemId>
            <InvoiceSubTitle>{invoiceInfo.description}</InvoiceSubTitle>
          </InvoiceName>
          {/* SENDER ADDRESS INFO */}
          <AddressInfoList sender>
            {Object.values(invoiceInfo.senderAddress).map(
              (value: string, index: number) => (
                <ListItem key={index + value.at(0)}> {value}</ListItem>
              )
            )}
          </AddressInfoList>
        </InvoiceContentTop>

        <InvoiceContentMiddle>
          <InvoiceDates area={"Dates"}>
            <InvoiceDate>
              <InvoiceSubTitle>Invoice date </InvoiceSubTitle>
              <InvoiceStrongLine>
                {transformDate(invoiceInfo.createdAt)}
              </InvoiceStrongLine>
            </InvoiceDate>
            <InvoiceDate>
              <InvoiceSubTitle>Payment Due </InvoiceSubTitle>
              <InvoiceStrongLine>
                {transformDate(invoiceInfo.paymentDue)}
              </InvoiceStrongLine>
            </InvoiceDate>
          </InvoiceDates>
          <InvoiceBillTo area={"BillTo"}>
            <InvoiceSubTitle>Bill to</InvoiceSubTitle>
            <InvoiceStrongLine NAME>{invoiceInfo.clientName}</InvoiceStrongLine>
            {/* CLIENT ADDRESS INFO */}
            <AddressInfoList>
              {Object.values(invoiceInfo.clientAddress).map(
                (value: string, index: number) => (
                  <ListItem key={index + value.at(0)}> {value}</ListItem>
                )
              )}
            </AddressInfoList>
          </InvoiceBillTo>
          <InvoiceEmail area={"Email"}>
            <InvoiceSubTitle>Sent to</InvoiceSubTitle>
            <InvoiceStrongLine> {invoiceInfo.clientEmail}</InvoiceStrongLine>
          </InvoiceEmail>
        </InvoiceContentMiddle>

        <InvoiceContentBottom>
          <InvoiceCart>
            <InvoiceCartRow titleRow>
              <InvoiceSubTitle area={"ItmN"} cartTitle>
                Item Name
              </InvoiceSubTitle>
              <InvoiceSubTitle area={"qty"} cartTitle>
                QTY.
              </InvoiceSubTitle>
              <InvoiceSubTitle area={"Price"} cartTitle>
                Price
              </InvoiceSubTitle>
              <InvoiceSubTitle area={"Total"} cartTitle>
                Total
              </InvoiceSubTitle>
            </InvoiceCartRow>
            {/* INVOICE ITEMS */}
            {invoiceInfo.items?.map((item: Item) => {
              return (
                <InvoiceCartRow key={item.id}>
                  <InvoiceSubTitle area={"ItmN"} cartItem>
                    {item.name}
                  </InvoiceSubTitle>
                  <InvoiceSubTitle area={"qty"} cartItem>
                    {item.quantity}
                  </InvoiceSubTitle>
                  <Separator area={"x"}>x</Separator>
                  <InvoiceSubTitle area={"Price"} cartItem>
                    $ {formatMoney(item.price)}
                  </InvoiceSubTitle>
                  <InvoiceSubTitle area={"Total"} cartItem>
                    $ {formatMoney(item.quantity * item.price)}
                  </InvoiceSubTitle>
                </InvoiceCartRow>
              )
            })}
          </InvoiceCart>
          <InvoiceAmountDue>
            <InvoiceSubTitle>Amount Due </InvoiceSubTitle>
            <InvoiceTotal>$ {getTotal(invoiceInfo.items)}</InvoiceTotal>
          </InvoiceAmountDue>
        </InvoiceContentBottom>
      </InvoiceContentPanel>
      <ButtonsFooter>
        <Button onClick={modalOpener} darkgray>
          edit
        </Button>
        <Button red onClick={deletePopupOpener}>
          Delete
        </Button>
        <Button onClick={markAsPaid} purple>
          Mark As Paid
        </Button>
      </ButtonsFooter>
    </Container>
  )
}

export default Invoice
