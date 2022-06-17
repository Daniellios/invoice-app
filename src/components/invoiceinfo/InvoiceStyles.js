import { rem } from "polished"
import styled from "styled-components"
import { useSelector } from "react-redux"

export const Container = styled.div`
  display: flex;
  grid-area: c;
  flex-direction: column;
  align-items: center;
  width: 730px;
  height: 790px;
  background: transparent;
  row-gap: 1.5rem;
  margin: 3rem auto 5rem auto;

  @media ${(props) => props.theme.breakpoints.lg} {
    margin-top: 6rem;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 688px;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 327px;
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
  display: grid;
  grid-template-areas:
    "Dates BillTo Email"
    "Dates BillTo Email";
  justify-content: space-between;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-template-columns: 50% 50%;
    grid-template-areas:
      "Dates BillTo"
      "Email Email";
    row-gap: 2rem;
    height: 220px;
  }
`

export const InvoiceDates = styled.div`
  display: flex;
  grid-area: ${(props) => props.area};
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
`

export const InvoiceDate = styled.div`
  display: flex;
  flex-direction: column;
  align-self: "flex-start";
  align-items: flex-start;
  justify-content: center;
  row-gap: 1rem;
`

export const InvoiceSubTitle = styled.p`
  text-transform: capitalize;
  font-weight: ${(props) =>
    props.cartTitle ? "300" : props.cartItem ? "500" : ""};
  color: ${(props) => props.theme.mainText};
  font-size: ${(props) => (props.cartItem ? "13px" : "")};
  grid-area: ${(props) => props.area};
`

export const InvoiceBillTo = styled.div`
  display: flex;
  grid-area: ${(props) => props.area};
  flex-direction: column;
  justify-content: flex-start;
  row-gap: 0.5rem;
`

export const InvoiceStrongLine = styled.h3`
  margin: ${(props) => (props.name ? ".5rem 0" : "0")};
`

export const InvoiceEmail = styled.div`
  display: flex;
  grid-area: ${(props) => props.area};
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
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.amountDue};
  width: 100%;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  height: 100%;
  padding: 2rem;
`

export const InvoiceCartRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: "ItmN ItmN ItmN qty Price Total";
  justify-content: flex-end;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.mmd} {
    display: ${(props) => (props.titleRow ? "none" : "grid")};
    row-gap: 0.5rem;
    column-gap: 0.5rem;
    grid-template-columns: auto auto 50px 36px 1fr auto;
    grid-template-areas:
      "ItmN ItmN ItmN ItmN . ."
      "qty x Price Price . Total";
  }

  & > p:last-child {
    text-align: right;
  }
`

export const Separator = styled.p`
  display: none;
  align-items: center;
  justify-content: center;
  grid-area: ${(props) => props.area};
  color: ${(props) => props.theme.subText1};

  @media ${(props) => props.theme.breakpoints.mmd} {
    display: flex;
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
