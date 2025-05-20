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

export interface PurchaseRequest {
  customer_document: string
  id_branch: string
  purchase_duration: number,
  payment_type: string
  payment_status: string
  remaining_balance: number
  delivery_type: string
  delivery_comment?: string
  delivery_cost: number
  products: ProductSelected[]
} 


//Management customer service
export interface CustomerService {
	id_customer_service: string;
	id_purchase: string;
	service_date: string;
	customer_full_name: string;
	phone_number: string;
	branch_name: string;
	days_remaining: number;
	isComment: boolean;
	contact_comment: string;
	customer_service_status: boolean;
	id_branch: string;
}