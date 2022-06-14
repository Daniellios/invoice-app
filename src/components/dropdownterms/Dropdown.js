import React, { useEffect, useState } from "react"
import { TermDiv, TermList, TermOption } from "./DropdownStyles"
import { ArrowImg } from "../../styles/repeatables"

const Dropdown = ({ value }) => {
  const [currValue, setCurrValue] = useState(value)
  const [defaultValue, setDefValue] = useState("Net 30 days")
  const [isOpen, setIsOpen] = useState(false)
  const values = [1, 7, 14, 30]

  useEffect(() => {
    if (currValue === 30) setDefValue("Net 30 Days")
    if (currValue === 7) setDefValue("Net 7 Days")
    if (currValue === 14) setDefValue("Net 14 Days")
    if (currValue === 1) setDefValue("Net 1 Day")
  }, [currValue, setDefValue])

  const openForm = () => {
    setIsOpen((wasOpened) => !wasOpened)
  }

  const chooseValue = (num) => {
    setCurrValue(+num)
  }

  return (
    <TermDiv onClick={openForm}>
      {defaultValue}
      <TermList isOpened={isOpen}>
        {values.map((value, index) => {
          return (
            <TermOption onClick={() => chooseValue(value)} key={index}>
              {value === 1 ? `Net ${value} Day` : `Net ${value} Days`}
            </TermOption>
          )
        })}
      </TermList>
      <ArrowImg
        isOpen={isOpen}
        style={{ height: "8px" }}
        src={"/assets/icon-arrow-down.svg"}
      />
    </TermDiv>
  )
}

export default Dropdown
