/**
 * Represents the possible names of company branches.
 */
export type LocationName = "Sede Valledupar" | "Sede Bogota" | "Sede Palmira"

/**
 * Represents the stock information for a product at a specific branch.
 * 
 * @property {string} [id_product] - Optional product ID.
 * @property {string} id_branch - ID of the branch where the product is stocked.
 * @property {number} quantity - Available quantity of the product at the branch.
 */
export interface StockInfo {
  id_product?: string
  id_branch: string
  quantity: number
}

/**
 * Represents a branch of the company.
 * 
 * @property {string} id_branch - Unique identifier for the branch.
 * @property {LocationName} name - The name of the branch, based on predefined locations.
 */
export interface Branch {
  id_branch: string
  name: LocationName
}

/**
 * Represents the detailed information of a product.
 * 
 * @property {string} [id_product] - Optional unique identifier for the product.
 * @property {string} id_supplier - ID of the supplier providing the product.
 * @property {string} product_name - Name of the product.
 * @property {string} product_description - Description of the product.
 * @property {number} purchase_price - Purchase price of the product.
 * @property {number} product_discount - Discount applied to the product.
 * @property {number} sale_price - Final sale price of the product.
 * @property {number} [profit_margin] - Optional calculated profit margin for the product.
 * @property {number} [vat] - Optional VAT (value-added tax) for the product.
 * @property {boolean} [product_state] - Optional flag indicating whether the product is active.
 * @property {StockInfo[]} stock - Array of stock entries for different branches.
 */
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

/**
 * Represents the filters used for querying products in a table.
 * 
 * @property {string | null} id_supplier - Filter by supplier ID (nullable).
 * @property {number | null} discount - Filter by discount value (nullable).
 * @property {number | null} minStock - Filter by minimum stock quantity (nullable).
 * @property {boolean | null} product_state - Filter by product availability status (nullable).
 */
export interface ProductTableFilters {
  id_supplier: string | null
  discount: number | null
  minStock: number | null
  product_state: boolean | null
}

/**
 * List of predefined company locations with their corresponding IDs.
 */
export const LOCATIONS: { id: string; name: LocationName }[] = [
  { id: "885d040f-272c-43f4-b5e3-33cbc7692fd0", name: "Sede Valledupar" },
  { id: "90a2fc99-1ada-4797-b6c0-b132c5430f90", name: "Sede Bogota" },
  { id: "fffe60df-52d8-4717-949e-58ed108f998e", name: "Sede Palmira" },
]

/**
 * List of registered branches within the company.
 */
export const BRANCHES: Branch[] = [
  { id_branch: "885d040f-272c-43f4-b5e3-33cbc7692fd0", name: "Sede Bogota" },
  { id_branch: "90a2fc99-1ada-4797-b6c0-b132c5430f90", name: "Sede Valledupar" },
  { id_branch: "fffe60df-52d8-4717-949e-58ed108f998e", name: "Sede Palmira" },
]
