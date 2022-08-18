import { useRouter } from "next/router"
import React from "react"
import { useDispatch } from "react-redux"
import Invoice from "../../components/invoiceinfo/Invoice"
import { store } from "../../store/store"

const data = store.getState().data.invoices

export const getStaticPaths = async () => {
  const paths = data.map((invoice) => {
    return {
      params: { id: invoice.id },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: any) => {
  const id = context.params.id
  const invDATA = data.filter((inv) => inv.id === id)[0]

  return {
    props: { invoice: invDATA },
  }
}

const InvoicePage = ({ invoice }) => {
  const router = useRouter()
  const data = router.query
  console.log("STORE LOADED")

  return <Invoice invoiceInfo={invoice}></Invoice>
}

export default InvoicePage
