export const invoiceListCounter = (listLength) => {
  let msg = ""
  if (listLength > 0) {
    msg = `${listLength} invoices`
  }
  if (listLength === 1) {
    msg = "1 invoice"
  }
  if (listLength === 0) {
    msg = "No Invoices"
  }
  return msg
}
