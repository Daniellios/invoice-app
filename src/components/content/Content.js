import React, { useState } from "react"
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
import { data } from "../../data/data.js"

import {
  InvBucketContainer,
  InvBucketItem,
  ItemId,
  ItemDate,
  ItemIdHash,
  ItemSender,
  ItemPrice,
  ItemStatus,
  ItemStatusCircle,
  ItemStatusTitle,
  ItemBtnInfo,
} from "./InvoiceBucketStyles"

import { transformDate } from "../../helpers/dateFormatter"

function Content() {
  const [isOpened, setIsOpened] = useState(false)

  const [checkedState, setCheckedStates] = useState(
    new Array(statusTypes.length).fill(false)
  )

  const toggleDiv = () => {
    setIsOpened((wasOpened) => !wasOpened)
  }

  const handleCheckBox = (num) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === num ? !item : item
    )
    setCheckedStates(updatedCheckedState)
  }

  return (
    <Container>
      <InvFilterContainer>
        <InvTitleWrap>
          <InvTitle>Invoices</InvTitle>
          <InvSpan>
            {data.length > 0 ? `${data.length} invoices` : `No Invoices`}
          </InvSpan>
        </InvTitleWrap>
        <InvButtonsContainer>
          <InvStatusSpan onClick={toggleDiv}>
            Filter by status
            <ArrowImg isOpen={isOpened} src={"./assets/icon-arrow-down.svg"} />
          </InvStatusSpan>
          {isOpened && (
            <InvBoxChecks>
              {statusTypes.map((type, index) => {
                return (
                  <InvCheckBoxPair key={index}>
                    <InvCheckBoxCont
                      onClick={() => handleCheckBox(index)}
                      Checked={checkedState[index]}
                      id={type[index]}
                    >
                      <InvCheckBoxIcon
                        Checked={checkedState[index]}
                        src={"./assets/icon-check.svg"}
                      />
                    </InvCheckBoxCont>
                    <InvCheckBoxSpan>{type}</InvCheckBoxSpan>
                  </InvCheckBoxPair>
                )
              })}
            </InvBoxChecks>
          )}
          <Button purple>
            <PlusDiv>
              <PlusIcon src={"./assets/icon-plus.svg"} />
            </PlusDiv>
            New Invoice
          </Button>
        </InvButtonsContainer>
      </InvFilterContainer>

      <InvBucketContainer>
        {data.map((item, index) => (
          <InvBucketItem key={index}>
            <ItemId>
              <ItemIdHash>#</ItemIdHash>
              {item.id}
            </ItemId>
            <ItemDate>{transformDate(item.paymentDue)}</ItemDate>
            <ItemSender>{item.clientName}</ItemSender>
            <ItemPrice>
              $ {item.total?.toFixed(2).toLocaleString("en-US")}
            </ItemPrice>
            <ItemStatus _STATUS={item.status}>
              <ItemStatusCircle />
              <ItemStatusTitle>{item.status}</ItemStatusTitle>
            </ItemStatus>
            <ItemBtnInfo>
              <ArrowImg isLink src={"./assets/icon-arrow-right.svg"} />
            </ItemBtnInfo>
          </InvBucketItem>
        ))}
      </InvBucketContainer>
    </Container>
  )
}

export default Content
