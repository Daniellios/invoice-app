import styled from "styled-components"
import { rem, rgba } from "polished"
import { useSelector } from "react-redux"
import { ThemeState } from "../store/slices/themeSwitch"

interface Props {
  _STATUS?: string
  mainPage?: boolean
}

export const ItemStatus = styled.div<Props>`
  display: flex;
  flex-direction: row;
  width: 104px;
  height: 40px;
  justify-content: center;
  align-items: center;
  column-gap: 8px;
  border-radius: 5px;
  ${(props) =>
    props.mainPage
      ? `
  justify-self: end;
  transform:   translateX(50%);
  `
      : ``}

  ${(props) => {
    if (useSelector((state: any) => state.themeToggle.value)) {
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

export const ItemId = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1rem;
  text-align: left;

  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-column: 1/2;
  }
`

export const ItemIdHash = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.hash};
`
