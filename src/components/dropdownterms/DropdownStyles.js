import { rgba } from "polished"
import styled from "styled-components"

export const TermList = styled.ul`
  width: inherit;
  position: absolute;
  top: 3.6rem;
  left: 0;
  display: ${(props) => (props.isOpened ? "flex" : "none")};
  align-items: center;
  color: ${(props) => props.theme.mainText};
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  flex-direction: column;
  border-radius: 3px;
  z-index: 10;

  & > li:nth-child(1) {
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
  }

  & > li:nth-child(4) {
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    border-bottom: none;
  }
`

export const TermDiv = styled.div`
  position: relative;
  grid-area: term;
  font-weight: 500;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${(props) => rgba(props.theme.checkBg, 0.05)};
  padding: 0 1rem;
  height: 3rem;
  width: 100%;
  border-radius: 3px;
  background: ${(props) => props.theme.input};

  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.darkPurple};
  }
`

export const TermOption = styled.li`
  width: 100%;
  padding: 1rem;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) => props.theme.input};
  border-bottom: 1px solid ${(props) => rgba(props.theme.headerBg, 0.1)};
  color: ${(props) => props.theme.mainText};

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.darkPurple};
  }
`
