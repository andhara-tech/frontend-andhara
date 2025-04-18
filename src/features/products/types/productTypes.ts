// Definición de sedes
export type LocationName = "Sede Valledupar" | "Sede Bogota" | "Sede Palmira"

// Información de stock por sede
export interface StockInfo {
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
  stock: StockInfo[] // Stock por sede
}

export interface ProductTableFilters {
  id_supplier: string | null
  discount: number | null
  location?: LocationName | null
  minStock?: number | null
}

// Constantes para las sedes
export const LOCATIONS: { id: string; name: LocationName }[] = [
  { id: "885d040f-272c-43f4-b5e3-33cbc7692fd0", name: "Sede Valledupar" },
  { id: "90a2fc99-1ada-4797-b6c0-b132c5430f90", name: "Sede Bogota" },
  { id: "fffe60df-52d8-4717-949e-58ed108f998e", name: "Sede Palmira" },
]
