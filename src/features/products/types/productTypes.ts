// Definición de sedes
export type LocationName = "bogota" | "valledupar" | "palmira"

// Información de stock por sede
export interface StockInfo {
  location: LocationName
  quantity: number
}

export interface Product {
  product_id: number
  supplier_id: number
  product_name: string
  product_description: string
  purchase_price: number
  product_discount: number
  sale_price: number
  profit_margin: number
  vat: number
  stock: StockInfo[] // Stock por sede
}

export interface ProductTableFilters {
  supplier_id: number | null
  discount: number | null
  location?: LocationName | null
  minStock?: number | null
}

// Constantes para las sedes
export const LOCATIONS: { id: LocationName; name: string }[] = [
  { id: "bogota", name: "Bogotá" },
  { id: "valledupar", name: "Valledupar" },
  { id: "palmira", name: "Palmira" },
]
