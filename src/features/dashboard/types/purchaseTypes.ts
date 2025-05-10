export type SelectedProduct = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  vat: number
}
export type FormValues = {
  customerDocument: string
  branchId: string
  purchaseDuration: string
  paymentType: string
  paymentStatus: string
  remainingBalance: number
  deliveryType: string
  deliveryComment: string
  deliveryCost: number
}
export type ProductSelected = {
  id_product: string
  unit_quantity: number
}