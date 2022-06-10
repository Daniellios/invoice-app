import { rem } from "polished"
import styled from "styled-components"
import { useSelector } from "react-redux"

export const Container = styled.div`
  display: flex;
  grid-area: c;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 730px;
  height: 790px;
  background: transparent;
  row-gap: 1.5rem;
  margin-bottom: 5rem;

  @media ${(props) => props.theme.breakpoints.md} {
    margin-top: 3rem;
    width: 688px;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 327px;
  }
`

//// GO BACK DIV

export const GoBackDiv = styled.div`
  display: flex;
  column-gap: 1rem;
  justify-self: flex-start;
  align-self: flex-start;
`

export const GoBackImg = styled.img``

export const GoBackLink = styled.p`
  font-weight: 600;
  color: ${(props) => props.theme.mainText};
  position: relative;

  &: hover {
    cursor: pointer;
  }

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: -3px;
    left: 0;
    background-color: ${(props) => props.theme.darkPurple};
    transform-origin: bottom right;
    transition: transform 0.1s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`

/// CONTROL PANEL

export const EditPanel = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: ${(props) => props.theme.invoiceBg};
  border-radius: 5px;
  height: 88px;
`

export const ButtonPanel = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;

  @media ${(props) => props.theme.breakpoints.mmd} {
    ${(props) =>
      props.mobile
        ? ` display: flex;
    width: 100%;
    align-items: center;
    column-gap: 10px;
    `
        : `display: none;`}
  }
`

export const StatusPanel = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 159px;
  column-gap: 1rem;
  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 100%;
    justify-content: space-between;
  }
`

export const StatusSpan = styled.span`
  color: ${(props) => props.theme.subText2};
`

//// INFO PANEL

export const InvoiceContentPanel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  border-radius: 5px;
  background: ${(props) => props.theme.invoiceBg};
  padding: 3rem;

  @media ${(props) => props.theme.breakpoints.mmd} {
    padding: 1.5rem;
  }
`

/// TOP PART
export const InvoiceContentTop = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${(props) => props.theme.breakpoints.mmd} {
    flex-direction: column;
    align-items: flex-start;
    row-gap: 2rem;
  }
`

export const InvoiceName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  row-gap: 1rem;

  @media ${(props) => props.theme.breakpoints.mmd} {
    row-gap: 0.2rem;
  }
`

export const AddressInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: ${(props) => (props.sender ? "flex-end" : "flex-start")};

  @media ${(props) => props.theme.breakpoints.mmd} {
    align-items: flex-start;
  }
`

export const ListItem = styled.li`
  color: ${(props) => props.theme.subText2};
`

/// MID PART

export const InvoiceContentMiddle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  widht: 100%;

  & > div {
    margin-right: auto;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: flex-start;
    column-gap: 2rem;
    row-gap: 2rem;
    height: 220px;
    & > div {
      margin-right: 0;
    }
  }
`

export const InvoiceDates = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  @media ${(props) => props.theme.breakpoints.mmd} {
    justify-content: space-between;
    align-items: flex-start;
    max-height: 143px;
  }
`

export const InvoiceDate = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) => (props.due ? "flex-end" : "flex-start")};
  align-items: flex-start;
  justify-content: center;
  row-gap: 1rem;
  @media ${(props) => props.theme.breakpoints.mmd} {
    align-self: flex-start;
  }
`

export const InvoiceSubTitle = styled.p`
  text-transform: capitalize;
  font-weight: ${(props) =>
    props.cartTitle ? "300" : props.cartItem ? "500" : ""};
  color: ${(props) => props.theme.mainText};
  font-size: ${(props) => (props.cartItem ? "13px" : "")};
`

export const InvoiceBillTo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 0.5rem;
  @media ${(props) => props.theme.breakpoints.mmd} {
    order: 3;
  }
`

export const InvoiceStrongLine = styled.h3`
  margin: ${(props) => (props.name ? ".5rem 0" : "0")};
`

export const InvoiceEmail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  row-gap: 1rem;
  @media ${(props) => props.theme.breakpoints.mmd} {
    justify-self: flex-start;
    order: 1;
  }
`

/// PRICE PART

export const InvoiceContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 7px;
  width: 100%;
  margin-top: 2rem;
  background: ${(props) => props.theme.invoiceBgLight};

  @media ${(props) => props.theme.breakpoints.mmd} {
    margin-top: 0;
  }
`

export const InvoiceCart = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  border-radius: 7px;
  padding: 2rem;
  background-color: ${(props) => props.theme.invoiceBgLight};
`

export const InvoiceAmountDue = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.amountDue};
  width: 100%;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  height: 100%;
  padding: 2rem;
`

export const InvoiceCartRow = styled.div`
  display: flex;
  justify-content: space-evenly;

  & > p:not(:first-child) {
    margin-left: auto;
    text-align: right;
    width: 4rem;
  }

  & > p :first-child {
    width: 5rem;
    margin-right: auto;
    text-align: left;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    display: ${(props) => (props.titleRow ? "none" : "flex")};
    flex-direction: column;
    // flex-wrap: wrap;
    // row-gap: 0.5rem;

    // & > p :first-child {
    //   width: 6 rem;
    //   margin-right: 0;
    // }

    // & > p:nth-child(2) {
    //   margin: 0 0 0 0;
    //   text-align: left;
    // }
    // & > p:nth-child(3) {
    //   margin: 0 0 0 0;
    //   text-align: left;
    // }
    // & > p:nth-child(4) {
    //   margin: 0 0 0 0;
    // }
    // & > p {
    //   margin: 0;
    //   flex: 1 0 21%;
    //   width: 4rem;
    // }
  }
`

export const ButtonsFooter = styled.div`
  width: 100%;
  display: none;
  background: ${(props) => props.theme.invoiceBg};
  @media ${(props) => props.theme.breakpoints.mmd} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.5rem 1rem 1.5rem;

    & > button {
      display: inline-block;
      padding: 0 1rem;
      text-align: center;
  }
`

export const InvoiceTotal = styled.h2`
  font-size: 1.5rem;
`
