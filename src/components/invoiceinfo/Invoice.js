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
} from "../../components/invoiceinfo/InvoiceStyles"

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
  resetCurrInvoice,
  updateData,
  updateInvoiceInfo,
  deleteInvoice,
} from "../../store/slices/dataSlice"

import DeletePopup from "../deletepopup/DeletePopup"
import { formatMoney } from "../../helpers/moneyFormatter"
import {
  deletePopupCloser,
  deletePopupOpener,
  modalOpener,
} from "../../utils/popupsManipulation"

const Invoice = ({ id }) => {
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.currData.currInvoice)

  const router = useRouter()
  console.log(router.query)
  const goBack = () => {
    router.back()
  }

  const markAsPaid = () => {
    dispatch(updateInvoiceInfo({ ...invoice, status: "paid" }))
  }

  return (
    <Container>
      <DeletePopup id={invoice.id} />
      <GoBackDiv>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={goBack}> Go Back</GoBackLink>
      </GoBackDiv>
      <EditPanel>
        <StatusPanel>
          <StatusSpan>Status</StatusSpan>
          <ItemStatus _STATUS={invoice.status}>
            <ItemStatusCircle />
            <ItemStatusTitle>{invoice.status} </ItemStatusTitle>
          </ItemStatus>
        </StatusPanel>
        <ButtonPanel>
          <Button onClick={modalOpener} darkgray>
            edit
          </Button>
          <Button onClick={deletePopupOpener} red>
            Delete
          </Button>
          <Button purple onClick={markAsPaid}>
            Mark As Paid
          </Button>
        </ButtonPanel>
      </EditPanel>

      <InvoiceContentPanel>
        <InvoiceContentTop>
          <InvoiceName>
            <ItemId>
              <ItemIdHash>#</ItemIdHash>
              {invoice.id}
            </ItemId>
            <InvoiceSubTitle>{invoice.description}</InvoiceSubTitle>
          </InvoiceName>
          <AddressInfoList sender>
            <ListItem> {invoice.senderAddress?.street}</ListItem>
            <ListItem> {invoice.senderAddress?.city}</ListItem>
            <ListItem> {invoice.senderAddress?.postCode}</ListItem>
            <ListItem> {invoice.senderAddress?.country}</ListItem>
          </AddressInfoList>
        </InvoiceContentTop>

        <InvoiceContentMiddle>
          <InvoiceDates area={"Dates"}>
            <InvoiceDate>
              <InvoiceSubTitle>Invoice date </InvoiceSubTitle>
              <InvoiceStrongLine>
                {transformDate(invoice.createdAt)}
              </InvoiceStrongLine>
            </InvoiceDate>
            <InvoiceDate due>
              <InvoiceSubTitle>Payment Due </InvoiceSubTitle>
              <InvoiceStrongLine>
                {transformDate(invoice.paymentDue)}
              </InvoiceStrongLine>
            </InvoiceDate>
          </InvoiceDates>
          <InvoiceBillTo area={"BillTo"}>
            <InvoiceSubTitle>Bill to</InvoiceSubTitle>
            <InvoiceStrongLine name="true">
              {invoice.clientName}
            </InvoiceStrongLine>
            <AddressInfoList>
              <ListItem>{invoice.clientAddress?.street} </ListItem>
              <ListItem>{invoice.clientAddress?.city} </ListItem>
              <ListItem>{invoice.clientAddress?.postCode} </ListItem>
              <ListItem>{invoice.clientAddress?.country} </ListItem>
            </AddressInfoList>
          </InvoiceBillTo>
          <InvoiceEmail area={"Email"}>
            <InvoiceSubTitle>Sent to</InvoiceSubTitle>
            <InvoiceStrongLine> {invoice.clientEmail}</InvoiceStrongLine>
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
            {invoice.items.map((item, index) => {
              return (
                <InvoiceCartRow key={index}>
                  <InvoiceSubTitle area={"ItmN"} cartItem>
                    {item.name}
                  </InvoiceSubTitle>
                  <InvoiceSubTitle area={"qty"} cartItem>
                    {item.quantity}
                  </InvoiceSubTitle>
                  <Separator area={"x"}>x</Separator>
                  <InvoiceSubTitle area={"Price"} cartItem>
                    ${formatMoney(item.price)}
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
            <InvoiceTotal>$ {getTotal(invoice.items)}</InvoiceTotal>
          </InvoiceAmountDue>
        </InvoiceContentBottom>
      </InvoiceContentPanel>
      <ButtonsFooter>
        <Button onClick={modalOpener} darkgray>
          edit
        </Button>
        <Button red onClick={deletePopupCloser}>
          Delete
        </Button>
        <Button purple>Mark As Paid </Button>
      </ButtonsFooter>
    </Container>
  )
}

export default Invoice
