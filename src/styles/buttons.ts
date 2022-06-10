import styled, { css } from "styled-components"
import { useSelector } from "react-redux"
import { lighten, darken } from "polished"

interface Props {
  red?: boolean
  purple?: boolean
  darkgray?: boolean
  addbtn?: boolean
  newInvoice?: boolean
  basicWhite?: boolean
  area?: string
}

const purple = css`
  text-transform: capitalize;
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.darkPurple};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightPurple};
  }
`
const red = css`
  text-transform: capitalize;
  color: ${(props) => props.theme.mainText};
  background: ${(props) => props.theme.red};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightred};
  }
`
const darkgray = css`
  color: ${(props) => props.theme.white};
  background: #373b53;
  text-transform: capitalize;
  &:hover {
    cursor: pointer;
    background: ${lighten(0.05, "#373b53")};
  }
`
const addbtn = css`
  width: 100%;
  color: ${(props) => props.theme.subText2};
  background: ${(props) => props.theme.background};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.subText1};
  }
`

const newInvoice = css`
  justify-content: space-between;
  text-transform: capitalize;
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.darkPurple};
  padding-left: 0.5rem;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightPurple};
  }
`

const basicWhite = css`
  color: ${(props) => props.theme.lightPurple};
  background: ${(props) => props.theme.white};
  &:hover {
    background: ${(props) => darken(0.1, props.theme.white)};
    cursor: pointer;
  }
`

export const Button = styled.button<Props>`
  ${(props) => {
    if (props.purple) {
      return purple
    } else if (props.red) {
      return red
    } else if (props.darkgray) {
      return darkgray
    } else if (props.addbtn) {
      return addbtn
    } else if (props.newInvoice) {
      return newInvoice
    } else if (props.basicWhite) {
      return basicWhite
    } else {
    }
  }}
`
