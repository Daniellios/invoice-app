import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectFilterStatus,
  setFilterStatus,
} from "../../store/slices/filterSlice"
import { selectThemeValue } from "../../store/slices/themeSwitch"

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
  const themeValue = useSelector(selectThemeValue)

  return (
    <InvBoxChecks THEME={themeValue}>
      {/* DRAFT */}
      <InvCheckBoxPair key={"draft"}>
        <InvCheckBoxCont
          onClick={() => dispatch(setFilterStatus("draft"))}
          Checked={filterStatus.draft}
        >
          <InvCheckBoxIcon
            Checked={filterStatus.draft}
            src={"/assets/icon-check.svg"}
          />
        </InvCheckBoxCont>
        <InvCheckBoxSpan>Draft</InvCheckBoxSpan>
      </InvCheckBoxPair>

      {/* PENDING */}
      <InvCheckBoxPair key={"pending"}>
        <InvCheckBoxCont
          onClick={() => dispatch(setFilterStatus("pending"))}
          Checked={filterStatus.pending}
        >
          <InvCheckBoxIcon
            Checked={filterStatus.pending}
            src={"/assets/icon-check.svg"}
          />
        </InvCheckBoxCont>
        <InvCheckBoxSpan>Pending</InvCheckBoxSpan>
      </InvCheckBoxPair>

      {/* PAID */}
      <InvCheckBoxPair key={"paid"}>
        <InvCheckBoxCont
          onClick={() => dispatch(setFilterStatus("paid"))}
          Checked={filterStatus.paid}
        >
          <InvCheckBoxIcon
            Checked={filterStatus.paid}
            src={"/assets/icon-check.svg"}
          />
        </InvCheckBoxCont>
        <InvCheckBoxSpan>Paid</InvCheckBoxSpan>
      </InvCheckBoxPair>
    </InvBoxChecks>
  )
}

export default FilterBox
