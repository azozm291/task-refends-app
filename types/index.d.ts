export type RefundOrder = {
    id: string
    reason: string
    store_name: string
    store_logo: string
    store_url: string
    amount: number
    active: boolean
    decision: string | null
    items: {
      name: string
      id: string
      price: number
      quantity: number
    }[]
  }