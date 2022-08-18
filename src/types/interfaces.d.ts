export interface AddressInfo {
  street: string
  city: string
  postCode: string
  country: string
}

export interface Item {
  id: string
  name: string
  quantity: number
  price: number
  total: number
}

export interface Invoice {
  id: string
  createdAt?: string
  paymentDue?: string
  description?: string
  paymentTerms?: number
  clientName?: string
  clientEmail?: string
  status?: string
  senderAddress?: AddressInfo
  clientAddress?: AddressInfo
  items?: Item[]
  total?: number
}
