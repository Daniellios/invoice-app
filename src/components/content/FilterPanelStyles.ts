import styled from "styled-components"

interface Props {
  Checked?: boolean
  THEME?: number
}

export const Container = styled.div`
  grid-area: c;
  display: flex;
  width: 730px;
  flex-direction: column;
  row-gap: 3rem;
  margin: 0rem auto 0 auto;
  justify-content: flext-start;
  height: 100%;
  // max-height: 707px;
  position: relative;
  min-height: 707px;
  margin-left: 6rem;
  pointer-events: auto;

  @media ${(props) => props.theme.breakpoints.lg} {
    margin: 8rem auto 0 auto;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    width: 672px;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 327px;
  }
`

export const InvFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  justify-self: flex-start;
  height: 59px;
  @media ${(props) => props.theme.breakpoints.mmd} {
    height: 44px;
  }
`

export const InvTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`

export const InvTitle = styled.h1``

export const InvSpan = styled.span`
  color: ${(props) => props.theme.subText1};
`

export const InvButtonsContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  column-gap: 2.4rem;
  height: 100%;

  @media ${(props) => props.theme.breakpoints.mmd} {
    column-gap: 0.5rem;
  }
`

export const InvStatusSpan = styled.span`
  font-weight: 600;
  user-select: none;
  &:hover {
    cursor: pointer;
  }
`

// CHECKBOXES
export const InvBoxChecks = styled.div<Props>`
  position: absolute;
  display: flex;
  flex-direction: column;
  z-index: 10;
  align-items: start;
  justify-content: center;
  background: ${(props) => props.theme.invoiceBg};
  row-gap: 1rem;
  width: 192px;
  height: 128px;
  padding-left: 1.5rem;
  user-select: none;
  ${(props) =>
    props.THEME
      ? `
  -webkit-box-shadow: 0px 7px 9px 4px rgba(146, 119, 255, 0.3);
  -moz-box-shadow: 0px 7px 9px 4px rgba(146, 119, 255, 0.3);
  box-shadow: 0px 7px 9px 4px rgba(146, 119, 255, 0.3);`
      : `
  -webkit-box-shadow: 0px 2px 11px 13px rgba(12, 14, 22, 0.2);
  -moz-box-shadow: 0px 2px 11px 13px rgba(12, 14, 22, 0.2);
  box-shadow: 0px 2px 11px 13px rgba(12, 14, 22, 0.2);`};
  border-radius: 5px;
  top: 3.5rem;
  right: 8.5rem;

  @media ${(props) => props.theme.breakpoints.md} {
    top: 4rem;
    right: 8rem;
  }

  @media ${(props) => props.theme.breakpoints.mmd} {
    top: 3rem;
    right: 8rem;
    width: 126px;
    padding-left: 1rem;
  }
`

export const InvCheckBoxPair = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;

  &:hover {
    & > div {
      border: 1px solid ${(props) => props.theme.darkPurple};
    }
    cursor: pointer;
  }
`

export const InvCheckBoxSpan = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`

export const InvCheckBoxCont = styled.div<Props>`
  display: flex;
  border: 1px solid transparent;
  width: 1rem;
  height: 1rem;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: ${(props) => {
    if (props.Checked) {
      return props.theme.darkPurple
    } else {
      return props.theme.checkBg
    }
  }};
  border-radius: 2px;
`

export const InvCheckBoxIcon = styled.img<Props>`
  opacity: ${(props) => (props.Checked ? "1" : "0")};
`

export const PlusDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.theme.white};
  border-radius: 50%;
`

/////
export const PlusIcon = styled.img`
  border-radius: 50%;
`
