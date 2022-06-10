import React, { useEffect } from "react"
import {
  Container,
  SquareWrap,
  SquareDown,
  SquareUp,
  SquareLogo,
  ProfileWrap,
  ProfilePic,
  ProfileContainer,
  SwitchContainer,
  ThemeSwither,
  MoonIcon,
} from "./HeaderStyles"
import { useSelector, useDispatch } from "react-redux"
import { toggle } from "../../store/slices/themeSwitch"

const Header = (props) => {
  const theme = useSelector((state) => state.themeToggle.value)
  const dispatch = useDispatch()

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [])

  return (
    <Container>
      <SquareWrap>
        <SquareLogo src={"/assets/logo.svg"} />
        <SquareUp />
        <SquareDown />
      </SquareWrap>
      <ProfileWrap>
        <SwitchContainer>
          <ThemeSwither>
            {theme ? (
              <MoonIcon
                onClick={() => dispatch(toggle())}
                src={"/assets/icon-moon.svg"}
              />
            ) : (
              <MoonIcon
                onClick={() => dispatch(toggle())}
                src={"/assets/icon-sun.svg"}
              />
            )}
          </ThemeSwither>
        </SwitchContainer>
        <ProfileContainer>
          <ProfilePic src={"/assets/profile2.jpg"} />
        </ProfileContainer>
      </ProfileWrap>
    </Container>
  )
}

export default Header
