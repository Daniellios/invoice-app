import React from "react"

import {
  Container,
  ButtonWrap,
  PopupTitle,
  PopupText,
} from "./DeletePopupStyles"

import { Button } from "../../styles/buttons"

import { deleteInvoice } from "../../store/slices/dataSlice"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteModalStatus,
  openDeletePopup,
} from "../../store/slices/modalSlice"
import { useRouter } from "next/router"

const DeletePopup = ({ id }) => {
  const dispatch = useDispatch()
  const isOpen = useSelector(deleteModalStatus)
  const router = useRouter()

  const handleDelete = () => {
    dispatch(deleteInvoice(id))
    dispatch(openDeletePopup(false))
    router.back()
  }

  return (
    <Container isOpen={isOpen}>
      <PopupTitle>Confirm Deletion</PopupTitle>
      <PopupText>
        Are you sure you want to delete invoice #{id}? This action cannot be
        undone.
      </PopupText>
      <ButtonWrap>
        <Button onClick={() => dispatch(openDeletePopup(false))} darkgray>
          Cancel
        </Button>
        <Button onClick={handleDelete} red>
          Delete
        </Button>
      </ButtonWrap>
    </Container>
  )
}

export default DeletePopup
