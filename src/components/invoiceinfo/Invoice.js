import React from "react"
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
import { updateInvoiceInfo } from "../../store/slices/dataSlice"

import DeletePopup from "../deletepopup/DeletePopup"
import { formatMoney } from "../../helpers/moneyFormatter"
import {
  deletePopupCloser,
  deletePopupOpener,
  modalOpener,
} from "../../utils/dispatchFunctions"

const Invoice = ({ invoiceInfo }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const invoice = useSelector((state) => state.data.currInvoice)

  console.log(invoice)

  const goBack = () => {
    router.back()
  }

  const markAsPaid = () => {
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
          <ItemStatus _STATUS={invoiceInfo.status}>
            <ItemStatusCircle />
            <ItemStatusTitle>{invoiceInfo.status} </ItemStatusTitle>
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
              {invoiceInfo.id}
            </ItemId>
            <InvoiceSubTitle>{invoiceInfo.description}</InvoiceSubTitle>
          </InvoiceName>
          <AddressInfoList sender>
            {Object.values(invoiceInfo.senderAddress).map((value, index) => (
              <ListItem key={index + value.at(0)}> {value}</ListItem>
            ))}
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
            <InvoiceDate due>
              <InvoiceSubTitle>Payment Due </InvoiceSubTitle>
              <InvoiceStrongLine>
                {transformDate(invoiceInfo.paymentDue)}
              </InvoiceStrongLine>
            </InvoiceDate>
          </InvoiceDates>
          <InvoiceBillTo area={"BillTo"}>
            <InvoiceSubTitle>Bill to</InvoiceSubTitle>
            <InvoiceStrongLine name="true">
              {invoiceInfo.clientName}
            </InvoiceStrongLine>
            <AddressInfoList>
              {Object.values(invoiceInfo.clientAddress).map((value, index) => (
                <ListItem key={index + value.at(0)}> {value}</ListItem>
              ))}
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
            {invoiceInfo.items?.map((item, index) => {
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
        <Button red onClick={deletePopupCloser}>
          Delete
        </Button>
        <Button purple>Mark As Paid </Button>
      </ButtonsFooter>
    </Container>
  )
}

export default Invoice
