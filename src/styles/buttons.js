import styled, { css } from "styled-components"

const purple = css`
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.darkPurple};
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.lightPurple};
  }
`
const red = css`
  color: ${(props) => props.theme.background};
  background: ${(props) => props.theme.red};
  &:hover {
    background: ${(props) => props.theme.lightred};
  }
`
const darkgray = css`
  color: #888eb0;
  background: #373b53;
  &:hover {
    color: #888eb0;
    background: ${(props) => props.theme.black};
  }
`
const addbtn = css`
  color: ${(props) => props.theme.colors.subText2};
  background: ${(props) => props.theme.background};
  &:hover {
    background: ${(props) => props.theme.subText1};
  }
`

export const Button = styled.button`
  ${(props) => {
    if (props.purple) {
      return purple
    } else if (props.red) {
      return red
    } else if (props.darkgray) {
      return darkgray
    } else if (props.addbtn) {
      return addbtn
    } else {
    }
  }}
`
