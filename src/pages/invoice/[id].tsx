import { useRouter } from "next/router"
import React, { FunctionComponent } from "react"
import Layout from "../../layout/Layout"
import { NextPage } from "next"

import Invoice from "../../components/invoiceinfo/Invoice"
import { useSelector } from "react-redux"

const InvoicePage: NextPage = () => {
  const invoiceID = useSelector((state: any) => state.currData.currInvoice)
  const router = useRouter()
  const data = router.query

  return (
    <Layout>
      <Invoice id={invoiceID.id}></Invoice>
    </Layout>
  )
}

export default InvoicePage
