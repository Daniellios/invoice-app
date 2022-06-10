import styled from "styled-components"

export const Container = styled.div`
  position: sticky;
  z-index: 15;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 103px;
  max-width: 103px;
  height: 100%;
  grid-area: h;
  background-color: ${(props) => props.theme.headerBg};
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  @media ${(props) => props.theme.breakpoints.md} {
    max-width: unset;
    max-height: 5rem;
    min-width: 375px;
    width: 100%;
    grid-column: 1/ -1;
    flex-direction: row;
    border-radius: 0;
  }

  @media ${(props) => props.theme.breakpoints.md} {
    height: 72px;
  }
`

export const SquareWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 103px;
  position: relative;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;

  @media ${(props) => props.theme.breakpoints.md} {
    height: 100%;
    width: 5rem;
  }
`

export const SquareUp = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${(props) => props.theme.darkPurple};
`
export const SquareDown = styled.div`
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  border-bottom-right-radius: 15px;
  border-top-left-radius: 15px;
  background-color: ${(props) => props.theme.lightPurple};
`

export const SquareLogo = styled.img`
  position: absolute;
  z-index: 3;
`

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;

  @media ${(props) => props.theme.breakpoints.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0 1.5rem 0 0;
  }
`

export const SwitchContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 0;

  @media ${(props) => props.theme.breakpoints.md} {
    height: 100%;
    padding: 0 1.5rem;
  }
`

export const ThemeSwither = styled.button`
  background: transparent;
  &:hover {
    cursor: pointer;
  }
`

export const ProfileContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #494e6e;
  padding: 1.5rem 0 0 0;

  @media ${(props) => props.theme.breakpoints.md} {
    height: 100%;
    border-top: none;
    border-left: 1px solid #494e6e;
    padding: 0 0 0 1.5rem;
  }
`

export const ProfilePic = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
`

export const MoonIcon = styled.img``
