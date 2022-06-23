import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setFilterStatus } from "../../store/slices/filterSlice"

import {
  InvBoxChecks,
  InvCheckBoxPair,
  InvCheckBoxSpan,
  InvCheckBoxCont,
  InvCheckBoxIcon,
} from "../content/FilterPanelStyles"

const FilterBox = () => {
  const dispatch = useDispatch()
  const [boxStatus, setBoxStatus] = useState(
    useSelector((state) => state.statusToggle.value)
  )

  const filterArr = Object.entries(boxStatus)
  const handleClick = (currBox) => {
    const currBoxState = {
      ...boxStatus,
      [currBox[0]]: !currBox[1],
    }
    setBoxStatus(currBoxState)
    dispatch(setFilterStatus(currBoxState))
  }

  return (
    <InvBoxChecks>
      {filterArr.map((box, index) => (
        <InvCheckBoxPair key={index}>
          <InvCheckBoxCont onClick={() => handleClick(box)} Checked={box[1]}>
            <InvCheckBoxIcon Checked={box[1]} src={"/assets/icon-check.svg"} />
          </InvCheckBoxCont>
          <InvCheckBoxSpan>{box[0]}</InvCheckBoxSpan>
        </InvCheckBoxPair>
      ))}
    </InvBoxChecks>
  )
}

export default FilterBox
