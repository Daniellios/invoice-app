import styled from "styled-components"
import { rem, rgba } from "polished"
import { useSelector } from "react-redux"

export const InvBucketContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.background};
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
    transform: scale(1.002);
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

//// LEFT PART OF THE INVOICE

export const ItemId = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 15px;

  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-column: 1/2;
  }
`

export const ItemIdHash = styled.span`
  color: ${(props) => props.theme.subText2};
`
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

export const ItemStatus = styled.div`
  display: flex;
  flex-direction: row;
  width: 104px;
  height: 40px;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  border-radius: 5px;
  justify-self: end;
  transform: translateX(50%);
  ${(props) => {
    if (useSelector((state) => state.themeToggle.value)) {
      if (props._STATUS === "draft") {
        return `
          color: ${props.theme.draft};
          background: transparent;
          & > div {
            background: ${props.theme.draft};
          }
          `
      } else if (props._STATUS === "pending") {
        return `
          color: ${props.theme.pending};
          & > div {
            background: ${props.theme.pending};
          }
          `
      } else if (props._STATUS === "paid") {
        return `
          color:  ${props.theme.paid};
          & > div {
            background: ${props.theme.paid};
          }
          `
      }
    } else {
      if (props._STATUS === "draft") {
        return `
          background: ${rgba(props.theme.draft, 0.1)};
          color: ${props.theme.draft};
          & > div {
            background: ${props.theme.draft};
          }
          `
      } else if (props._STATUS === "pending") {
        return `
          background: ${rgba(props.theme.pending, 0.1)};
          color: ${props.theme.pending};
          & > div {
            background: ${props.theme.pending};
          }
          `
      } else if (props._STATUS === "paid") {
        return `
          background: ${rgba(props.theme.paid, 0.1)};
          color:  ${props.theme.paid};
          & > div {
            background: ${props.theme.paid};
          }
          `
      }
    }
  }};

  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-column: 2/2;
    grid-row: 2/2;
    transform: translateX(0);
  }
`

export const ItemStatusCircle = styled.div`
  height: 8px;
  width: 8px;
  border-radius: 50%; ;
`

export const ItemStatusTitle = styled.h3`
  text-transform: capitalize;
  font-size: 15px;
  color: inherit;
  font-weight: 500;
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
