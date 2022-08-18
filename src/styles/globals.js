import { createGlobalStyle } from "styled-components"
import { rem } from "polished"

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  html {
    scroll-behavior: smooth;
  }
  body {
    height: 100%;
    font-family: ${(props) => props.theme.fonts.title};
    background-color:  ${(props) => props.theme.background};
    color: ${(props) => props.theme.mainText};
    cursor: default;
    overflow-x: hidden;
    min-width: 375px;
  }

  h1,h2,h3,h4,h5,h6,button {
    font-family: ${(props) => props.theme.fonts.title};
    color: ${(props) => props.theme.mainText};
  }
  h1{
    font-weight: bold;
    font-size: 2rem;
    @media ${(props) => props.theme.breakpoints.mmd} {
      font-size: ${rem("20px")};
    }
  }
  h2{
    font-weight: bold;
    font-size: 20px;
    letter-spacing: -0.63px;
  }
  h3{
    font-weight: bold;
    font-size: 1rem;
    letter-spacing: -0.1px;
  }
  h4{
    font-weight: bold;
    font-size: 12px;
    letter-spacing: -0.1px;
  }

  p{
    font-family: ${(props) => props.theme.fonts.title};
    color: ${(props) => props.theme.mainText};
    font-size: 13px;
    font-weight: 400;
  }

  button{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    outline: none;
    font-size: 12px;
    border: transparent;
    border-radius: 40px;
    font-weight: 600;
    height: 3rem;
    padding: 0 1.3rem 0 1.3rem;
    column-gap: 1rem;
    height: 44px;
    &:hover{
      cursor:poiner;
    }

    @media ${(props) => props.theme.breakpoints.mmd} {
      column-gap: .4rem;
      padding: 0 .8rem 0 .8rem;
    }
  }

  a {
    text-decoration: none;
    color: ${(props) => props.theme.mainText};
  }
  li{
    list-style: none;
  }

  span{
    font-family: ${(props) => props.theme.fonts.title};
    font-size: 15px;
    letter-spacing: -.25px;
    transition: all 0s ;
  }

`

export default GlobalStyles
