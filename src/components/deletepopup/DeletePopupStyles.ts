import styled from "styled-components"

interface Props {
  isOpen?: boolean
}

export const Container = styled.div<Props>`
  position: absolute;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  row-gap: 1rem;
  padding: 3rem;
  background: ${(props) => props.theme.invoiceBg};
  border-radius: 7px;
  width: 480px;
  height: 249px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 15;

  @media ${(props) => props.theme.breakpoints.mmd} {
    width: 327px;
    height: 220px;
  }
`

export const PopupTitle = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.mainText};
`

export const PopupText = styled.p`
  color: ${(props) => props.theme.mainText};
  line-height: 1.6;
`
export const ButtonWrap = styled.div`
  display: flex;
  column-gap: 0.5rem;
  align-self: flex-end;
`
