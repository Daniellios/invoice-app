import styled from "styled-components"
import { rem, rgba } from "polished"
import { useSelector } from "react-redux"

interface Props {
  _STATUS?: string
  mainPage?: boolean
  isOpen?: boolean
  isLink?: boolean
  modalLink?: boolean
  big?: boolean
  themeToggle?: boolean
  trash?: boolean
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
    if (useSelector((state: any) => state.theme.value)) {
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

export const ItemIdHash = styled.span<Props>`
  font-size: ${(props) => (props.big ? "1.5rem" : "1rem")};
  color: ${(props) => props.theme.hash};
`

export const ArrowImg = styled.img<Props>`
  transform: rotate(${(props) => (props.isOpen ? "180" : "0")}deg);
  margin-left: 0.5rem;
  ${(props) => {
    if (props.isLink) {
      return `
        &:hover{
          cursor: pointer;
        }
      `
    }
  }}
`

//// GO BACK DIV

export const GoBackDiv = styled.div<Props>`
  display: ${(props) => (props.modalLink ? "none" : "flex")};
  column-gap: 1rem;
  justify-self: flex-start;
  align-self: flex-start;

  @media ${(props) => props.theme.breakpoints.mmd} {
    display: ${(props) => (props.modalLink ? "flex" : "flex")};
  }
`

export const GoBackImg = styled.img``

export const GoBackLink = styled.p`
  font-weight: 600;
  color: ${(props) => props.theme.mainText};
  position: relative;

  &:hover {
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

export const IconWrap = styled.span<Props>`
  color: ${(props) => props.theme.subText1};
  transition: 0.1s;
  &:hover {
    cursor: pointer;
    color: ${(props) =>
      props.themeToggle
        ? props.theme.white
        : props.trash
        ? props.theme.red
        : props.theme.white};
  }
`
