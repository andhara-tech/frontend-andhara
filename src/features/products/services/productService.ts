import apiClient from "@/app/apiClient"
import { supplierStatic } from "@/shared/static"
import type { Product } from "@/features/products/types/productTypes"

/**
 * Represents sorting options for a list of products.
 * 
 * @property {string} field - Field name to sort by.
 * @property {"asc" | "desc"} direction - Sorting direction, either ascending or descending.
 */
export interface SortOption {
  field: string
  direction: "asc" | "desc"
}

/**
 * Service that handles all logic related to product data,
 * including CRUD operations, supplier utilities, and filtering.
 */
export const ProductService = {
  /**
   * Returns the name of a supplier based on its ID.
   * 
   * @param {string} supplierId - The ID of the supplier.
   * @returns {string} The name of the supplier, or the ID if not found.
   */
  getSupplierName: (supplierId: string): string => {
    const supplier = supplierStatic.find((s) => s.id === supplierId)
    return supplier ? supplier.supplier_name : supplierId
  },

  /**
   * Returns a list of supplier options for use in dropdowns or filters.
   * 
   * @returns {Array<{ id: string; supplier_name: string }>} List of supplier options.
   */
  getSupplierFilterOptions: () => {
    return supplierStatic.map((supplier) => ({
      id: supplier.id,
      supplier_name: supplier.supplier_name,
    }))
  },

  /**
   * Fetches all products from the API.
   * 
   * @async
   * @returns {Promise<Product[]>} A list of all products.
   * @throws {Error} If the request fails.
   */
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>("/product/products")
      return response.data
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Error fetching products")
    }
  },

  /**
   * Fetches a single product by its ID.
   * 
   * @async
   * @param {string} id - The ID of the product.
   * @returns {Promise<Product | null>} The product if found, otherwise null.
   * @throws {Error} If the request fails.
   */
  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const response = await apiClient.get<Product>(`/product/by-id/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      throw new Error(`Error fetching product with ID ${id}`)
    }
  },

  /**
   * Creates a new product.
   * 
   * @async
   * @param {Omit<Product, "id_product">} product - The product data without the ID.
   * @returns {Promise<Product>} The created product.
   * @throws {Error} If the request fails.
   */
  createProduct: async (product: Omit<Product, "id_product">): Promise<Product> => {
    try {
      const response = await apiClient.post<Product>("/product/create-product", product)
      return response.data
    } catch (error) {
      console.error("Error creating product:", error)
      throw new Error("Error creating product")
    }
  },

  /**
   * Updates an existing product.
   * 
   * @async
   * @param {Product} product - The updated product data.
   * @returns {Promise<Product>} The updated product.
   * @throws {Error} If the request fails.
   */
  updateProduct: async (product: Product): Promise<Product> => {
    try {
      const response = await apiClient.put<Product>(`/product/update-product/${product.id_product}`, product)
      return response.data
    } catch (error) {
      console.error(`Error updating product with ID ${product.id_product}:`, error)
      throw new Error(`Error updating product with ID ${product.id_product}`)
    }
  },

  /**
   * Inactivates a product by its ID.
   * 
   * @async
   * @param {string} id - The ID of the product.
   * @throws {Error} If the request fails.
   */
  inactivateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/inactivate/${id}`)
    } catch (error) {
      console.error(`Error inactivating product with ID ${id}:`, error)
      throw new Error(`Error inactivating product with ID ${id}`)
    }
  },

  /**
   * Activates a product by its ID.
   * 
   * @async
   * @param {string} id - The ID of the product.
   * @throws {Error} If the request fails.
   */
  activateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/activate/${id}`)
    } catch (error) {
      console.error(`Error activating product with ID ${id}:`, error)
      throw new Error(`Error activating product with ID ${id}`)
    }
  },

  /**
   * Toggles the active state of a product. If currently active, it will be inactivated,
   * and vice versa.
   * 
   * @async
   * @param {string} id - The ID of the product.
   * @param {boolean} [currentState] - The current state of the product.
   * @returns {Promise<Product>} The updated product after toggling.
   * @throws {Error} If the operation fails.
   */
  toggleProductState: async (id: string, currentState?: boolean): Promise<Product> => {
    try {
      if (currentState) {
        await ProductService.inactivateProduct(id)
      } else {
        await ProductService.activateProduct(id)
      }

      const updatedProduct = await ProductService.getProduct(id)

      if (!updatedProduct) {
        throw new Error(`Product with ID ${id} not found after toggle`)
      }

      return updatedProduct
    } catch (error) {
      console.error(`Error toggling state for product with ID ${id}:`, error)
      throw error
    }
  },

  /**
   * Filters a list of products based on the supplier ID.
   * 
   * @param {Product[]} products - List of products to filter.
   * @param {string | null} supplierId - Supplier ID to filter by.
   * @returns {Product[]} Filtered list of products.
   */
  filterProductsBySupplier: (products: Product[], supplierId: string | null): Product[] => {
    if (!supplierId) return products
    return products.filter((product) => product.id_supplier === supplierId)
  },
}
