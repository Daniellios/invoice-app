import React, { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFilterStatus,
  setFilterStatus,
} from "../../store/slices/filterSlice"

import {
  InvBoxChecks,
  InvCheckBoxPair,
  InvCheckBoxSpan,
  InvCheckBoxCont,
  InvCheckBoxIcon,
} from "../content/FilterPanelStyles"

const FilterBox = () => {
  const dispatch = useDispatch()

  const filterStatus = useSelector(selectFilterStatus)

  const handleClick = (currBox) => {
    dispatch(
      setFilterStatus({
        ...filterStatus,
        [currBox[0]]: !currBox[1],
      })
    )
  }
  console.log(filterStatus)

  return (
    <InvBoxChecks>
      {filterStatus.map((box, index) => (
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
