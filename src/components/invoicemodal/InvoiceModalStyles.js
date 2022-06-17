import { rem, rgba, lighten } from "polished"
import styled, { css } from "styled-components"

export const Modal = styled.div`
  position: absolute;
  z-index: 14;
  width: 719px;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  background: ${(props) => props.theme.modal};
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 3.4375rem 3.4375rem 2rem 9.875rem;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) => props.theme.input};
  }

  transition: transform 0.3s ease-out;
  transform: ${(props) =>
    props.isOpen ? "translateX(0%)" : "translateX(-100%)"};

  @media ${(props) => props.theme.breakpoints.md} {
    width: 616px;
    height: 100%;
    padding: 3rem 3.1875rem 2rem 3.5rem;
    margin-top: 72px;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 100%;
    height: 100%;
    min-width: 375px;
    max-width: 616px;
    padding: 3rem 2rem 2rem 2rem;
  }
`

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 3rem;
  background: ${(props) => props.theme.modal};
  width: 100%;
`

export const ModalTitle = styled.h1`
  font-size: 1.5rem;
  color: ${(props) => props.theme.mainText};
`

export const ModalBlock = styled.div`
  width: 100%;
  display: grid;
  row-gap: 1.5rem;
  align-items: flex-start;

  ${(props) => {
    if (props.billFrom) {
      return `
        grid-template-areas:
        "t . ."
        "sa sa sa"
        "city ps ctry";
        grid-template-columns: repeat(4, 152px);
        grid-template-rows: auto 1fr 1fr;
        grid-column-gap: 1.5rem;

      @media ${props.theme.breakpoints.mmd} {
        grid-template-areas:
        "t . . ."
        "sa sa sa sa"
        "city city ps ps"
        "ctry ctry ctry ctry";
        grid-template-columns: repeat(4, 1fr);
      }

      `
    } else if (props.billTo) {
      return `
        grid-template-areas:
      "t . . "
      "clN clN clN"
      "clE clE clE"
      "adrs adrs adrs"
      "city ps ctry";
      grid-template-columns: repeat(3, 152px);
      grid-template-rows: auto 1fr 1fr 1fr 1fr;
      grid-column-gap: 1.5rem;

      @media ${props.theme.breakpoints.mmd} {
        grid-template-areas:
        "t . . ."
        "clN clN clN clN"
        "clE clE clE clE"
        "adrs adrs adrs adrs"
        "city city ps ps"
        "ctry ctry ctry ctry";
        grid-template-columns: repeat(4, 1fr);
      }

      `
    } else if (props.dates) {
      return `
      grid-template-areas:
      "invD invD term term"
      "pd pd pd pd";
      grid-template-columns: repeat(4, 108px);
      grid-template-rows: 1fr 1fr;
      grid-column-gap: 1.5rem;
      
    @media ${props.theme.breakpoints.mmd} {
      grid-template-areas:
      "invD"
      "term"
      "pd";
      grid-template-columns: repeat(1, 1fr);
    }
    `
    } else if (props.list) {
      return `
      grid-template-columns: 1fr ;
      grid-template-rows: auto;
      row-gap: 1rem;
    `
    }
  }}
`

export const ModalRow = styled.div`
  grid-area: auto/1/auto/1;
  grid-template-columns: 1fr 40px 40px 46px 100px 1fr;
  grid-template-areas: "ItmN ItmN ItmN QTY Price Total";
  width: 100%;
  align-content: flex-end;
  justify-content: flex-end;
  display: grid;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;

  @media ${(props) => props.theme.breakpoints.mmd} {
    grid-template-columns: 64px 1fr 1fr 1fr;
    grid-template-areas:
      "ItmN ItmN ItmN ItmN"
      "QTY Price Price Total";
    display: ${(props) => (props.titleRow ? "none" : "")};
  }
`

export const RowCell = styled.div`
  width: 100%;
  display: flex;
  grid-area: ${(props) => props.gridArea};
`

export const ModalBlockTitle = styled.p`
  color: ${(props) => props.theme.darkPurple};
  font-weight: 600;
  align-self: flex-start;
  grid-area: t;
`

export const ItemListTitle = styled.h2`
  grid-area: 1/1/1/1;
  font-size: 18px;
  color: ${(props) => props.theme.subText2};
`

export const ModalInputWrap = styled.div`
  position: relative;
  grid-area: ${(props) => props.gridArea};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  row-gap: 0.8rem;
  width: ${(props) => (props.itemWrap ? "100%" : "")};

  ${(props) =>
    props.mistake
      ? `
    & > p {
      color: ${props.theme.red};
    }
    & > input {
      border: 1px solid ${props.theme.red};
      &:hover{
        border: 1px solid ${props.theme.red};
      }
    }
    ${ModalInputMistake}{
      display: unset;
    } `
      : ""}
`

export const ModalInputTitle = styled.p`
  color: ${(props) => props.theme.subText1};
  grid-area: ${(props) => props.area};
  display: ${(props) => (props.itemTitle ? "none" : "")};

  @media ${(props) => props.theme.breakpoints.mmd} {
    display: ${(props) => (props.rowTitle ? "none" : "")};
    display: ${(props) => (props.itemTitle ? "unset" : "")};
  }
`

export const ModalInputMistake = styled.p`
  display: none;
  color: ${(props) => props.theme.red};
  position: absolute;
  top: 0;
  right: 0;
`

export const TotalSumCell = styled.div`
  display: flex;
  grid-area: ${(props) => props.area};
  justify-content: space-between;
  color: ${(props) => props.theme.mainText};
  font-size: 12px;
  font-weight: 600;
  align-items: center;
  height: 3rem;
  width: 100%;

  @media ${(props) => props.theme.breakpoints.md} {
    column-gap: 2rem;
  }
`

export const ModalInput = styled.input`
  outline: none;
  width: 100%;
  grid-area: ${(props) => props.area};
  background: ${(props) => props.theme.input};
  color: ${(props) => props.theme.mainText};
  border: 1px solid ${(props) => rgba(props.theme.checkBg, 0.05)};
  font-family: ${(props) => props.theme.fonts.title};
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 3px;
  height: 3rem;
  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.darkPurple};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.darkPurple};
  }
`

export const AddItem = styled.button`
  grid-area: ${(props) => props.area};
  display: flex;
  align-items: center;
  width: 100%;
  align-text: center;
  background: ${(props) => props.theme.invoiceBg};
  color: ${(props) => props.theme.mainText};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.darkPurple};
    background: ${(props) => lighten("0.05", props.theme.invoiceBg)};
  }
`

export const ModalFooter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 0.5rem;
  background: transparent;

  & > button:nth-child(1) {
    margin-right: auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: 504px;
  }
`
