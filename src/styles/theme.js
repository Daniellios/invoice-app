import { useSelector } from "react-redux"
import { ThemeProvider } from "styled-components"
import theme from "../themes/default"
import GlobalStyles from "./globals"

const Theme = ({ children }) => (
  <ThemeProvider
    theme={
      useSelector((state) => state.themeToggle.value)
        ? theme.lightTheme
        : theme.darkTheme
    }
  >
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

export default Theme
