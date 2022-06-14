import React from "react"

import invoices from "../../data/data.json"
import { Button } from "../../styles/buttons"
import { useRouter } from "next/router"

import {
  Container,
  GoBackDiv,
  GoBackImg,
  GoBackLink,
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
} from "../../components/invoiceinfo/InvoiceStyles"

import {
  ItemStatus,
  ItemStatusCircle,
  ItemStatusTitle,
  ItemId,
  ItemIdHash,
} from "../../styles/repeatables"
import { transformDate } from "../../helpers/dateFormatter"
import { getTotal } from "../../helpers/getTotalSum"
import { useDispatch, useSelector } from "react-redux"
import { resetCurrInvoice } from "../../store/slices/dataSlice"
import { openModal } from "../../store/slices/modalSlice"

const Invoice = (props) => {
  const dispatch = useDispatch()
  const invoice = useSelector((state) => state.currData?.currInvoice)

  const router = useRouter()
  const goBack = () => {
    router.back()
  }

  // console.log(useSelector((state) => state.currData.currInvoice))

  const editInvoice = () => {
    dispatch(openModal(true))
  }

  return (
    <Container>
      <GoBackDiv>
        <GoBackImg src={"/assets/icon-arrow-left.svg"} />
        <GoBackLink onClick={goBack}> Go back</GoBackLink>
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
          <Button onClick={editInvoice} darkgray>
            edit
          </Button>
          <Button red>Delete</Button>
          <Button purple>Mark As Paid </Button>
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
          <InvoiceDates>
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
          <InvoiceBillTo>
            <InvoiceSubTitle>Bill to</InvoiceSubTitle>
            <InvoiceStrongLine name="true">
              {invoice.clientName}
            </InvoiceStrongLine>
            <AddressInfoList>
              <ListItem>{invoice.clientAddress.street} </ListItem>
              <ListItem>{invoice.clientAddress.city} </ListItem>
              <ListItem>{invoice.clientAddress.postCode} </ListItem>
              <ListItem>{invoice.clientAddress.country} </ListItem>
            </AddressInfoList>
          </InvoiceBillTo>
          <InvoiceEmail>
            <InvoiceSubTitle>Sent to</InvoiceSubTitle>
            <InvoiceStrongLine> {invoice.clientEmail}</InvoiceStrongLine>
          </InvoiceEmail>
        </InvoiceContentMiddle>

        <InvoiceContentBottom>
          <InvoiceCart>
            <InvoiceCartRow titleRow>
              <InvoiceSubTitle cartTitle>Item Name</InvoiceSubTitle>
              <InvoiceSubTitle cartTitle>QTY.</InvoiceSubTitle>
              <InvoiceSubTitle cartTitle>Price</InvoiceSubTitle>
              <InvoiceSubTitle cartTitle>Total</InvoiceSubTitle>
            </InvoiceCartRow>
            {invoice.items.map((item, index) => {
              return (
                <InvoiceCartRow key={index}>
                  <InvoiceSubTitle cartItem>{item.name}</InvoiceSubTitle>
                  <InvoiceSubTitle cartItem>{item.quantity}</InvoiceSubTitle>
                  <InvoiceSubTitle cartItem>
                    $ {item.price.toFixed(2).toLocaleString("en-US")}
                  </InvoiceSubTitle>
                  <InvoiceSubTitle cartItem>
                    ${" "}
                    {(item.quantity * item.price)
                      .toFixed(2)
                      .toLocaleString("en-US")}
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
        <Button darkgray>edit</Button>
        <Button red>Delete</Button>
        <Button purple>Mark As Paid </Button>
      </ButtonsFooter>
    </Container>
  )
}

export default Invoice
