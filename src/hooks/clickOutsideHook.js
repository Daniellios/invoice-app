import React, { useEffect, useRef } from "react"

// Close modal with outside click
const useClickOutside = (handler) => {
  let modalRef = useRef()

  useEffect(() => {
    let modalHandler = (event) => {
      if (!modalRef.current.contains(event.target)) handler()
    }
    document.addEventListener("mousedown", modalHandler)

    return () => {
      document.removeEventListener("mousedown", modalHandler)
    }
  }, [])

  return modalRef
}

export default useClickOutside
