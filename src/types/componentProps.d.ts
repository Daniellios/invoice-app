import { Item } from "./interfaces"

export interface InputProps {
  value: number | string
  area?: string
  format?: string
  name?: string
  title?: string
  itemInput?: boolean
  handleTotal?: (number) => void
  big?: boolean
}

export interface InvoiceItemProps {
  itemInfo: Item
  number: number
}
