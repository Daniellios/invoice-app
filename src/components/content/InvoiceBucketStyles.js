import styled from "styled-components"
import { rem, rgba } from "polished"
import { useSelector } from "react-redux"

export const InvBucketContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  height: auto;
  background: transparent;
  margin-bottom: 5rem;
  pointer-events: auto;
`

export const InvBucketItem = styled.div`
  display: grid;
  width: 100%;
  //   grid-template-columns: repeat(auto-fill, minmax(auto, 1fr));
  grid-template-rows: 70px;
  align-items: center;
  padding: 0 0 0 2rem;
  background: ${(props) => props.theme.invoiceBg};
  border: 1px solid transparent;
  border-radius: 5px;
  --grid-layout-gap: 10px;
  --grid-column-count: 6;
  --grid-item--min-width: 100px;

  /**
   * Calculated values.
   */
  --gap-count: calc(var(--grid-column-count) - 1);
  --total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
  --grid-item--max-width: calc(
    (100% - var(--total-gap-width)) / var(--grid-column-count)
  );
  grid-template-columns: repeat(
    auto-fill,
    minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
  );
  grid-gap: var(--grid-layout-gap);

  &:hover {
    border: 1px solid ${(props) => props.theme.darkPurple};
    cursor: pointer;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    --grid-layout-gap: 5px;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    padding: 1.5rem;
    --grid-column-count: 2;
    --grid-layout-gap: 0px;
    grid-template-rows: repeat(2, auto);
    row-gap: 1rem;
  }
`

export const EmptyInvoiceBucket = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  row-gap: 2rem;
  height: 339px;
  width: 240px;
  margin: 8rem auto;
`

export const EmptyInvoiceImg = styled.img`
  width: 100%;
`

export const EmptyInvoiceTextCont = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  height: 50%;
  row-gap: 1rem;
`

export const EmptyInvoiceTitle = styled.h2``

export const EmptyInvoiceText = styled.p`
  text-align: center;
`

export const EmptyInvoiceSpan = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.subText2};
`

//// LEFT PART OF THE INVOICE

export const ItemDate = styled.p`
  text-transform: capitalize;
  color: ${(props) => props.theme.subText1};

  @media ${(props) => props.theme.breakpoints.mmd} {
    align-self: start;
    justify-self: start;
    grid-column: 1/2;
    grid-row: 2/2;
  }
`
export const ItemSender = styled.p`
  text-transform: capitalize;
  color: ${(props) => props.theme.subText1};
  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-column: 2/2;
    justify-self: end;
    font-size: 13px;
  }
`

//// RIGHT PART OF THE INVOICE

export const ItemPrice = styled.h3`
  text-align: right;
  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-column: 1/2;
    grid-row: 2/2;
    align-self: end;
    justify-self: start;
    order: 2;
  }
`

export const ItemBtnInfo = styled.button`
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 2rem;
  @media ${(props) => props.theme.breakpoints.mmd} {
    display: none;
  }
`
