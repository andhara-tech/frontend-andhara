export interface StockInfo {
  id_product?: string
  id_branch: string
  quantity: number
}

export interface Product {
  id_product?: string
  id_supplier: string
  product_name: string
  product_description: string
  purchase_price: number
  product_discount: number
  sale_price: number
  profit_margin?: number
  vat?: number
  product_state?: boolean
  stock: StockInfo[]
}

export interface ProductTableFilters {
  id_supplier: string | null
  discount: number | null
  minStock: number | null
  product_state: boolean | null
}


