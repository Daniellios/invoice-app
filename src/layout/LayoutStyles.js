import { useSelector } from "react-redux"
import styled from "styled-components"

export const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "h . . . . . . . . . . ."
    "h . . c c c c c c . . ."
    "h . . c c c c c c . . ."
    "h . . c c c c c c . . .";
  height: 100%;
  // max-width: 1440px;
  width: 100vw;
  height: 100vh;
  margin: auto;
  overflow-x: hidden;

  ${(props) =>
    useSelector((state) => state.modalInvoice.isOpen)
      ? ` &:after {
  width: 100%;
  content: " ";
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);} `
      : ` &:after {
        pointer-events: none;
    }`}

  @media ${(props) => props.theme.breakpoints.md} {
    grid-template-areas:
      "h h h h h h h h h h h h"
      "c c c c c c c c c c c c"
      "c c c c c c c c c c c c"
      "c c c c c c c c c c c c";
  }
`
