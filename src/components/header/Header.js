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

import { BsFillSunFill } from "react-icons/bs"
import { IoMoon } from "react-icons/io5"
import { IconWrap } from "../../styles/repeatables"

const Header = () => {
  const theme = useSelector((state) => state.theme.value)
  const dispatch = useDispatch()

  const handleTheme = () => {
    dispatch(toggle())
  }

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
              <IconWrap themeToggle onClick={handleTheme}>
                <IoMoon size="1.375rem" />
              </IconWrap>
            ) : (
              <IconWrap themeToggle onClick={handleTheme}>
                <BsFillSunFill size="1.375rem" />
              </IconWrap>
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
