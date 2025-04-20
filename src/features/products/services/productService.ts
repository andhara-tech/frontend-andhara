import apiClient from "@/app/apiClient"
import type { Product } from "@/features/products/types/productTypes"
import { supplierStatic } from "@/shared/static"

export interface SortOption {
  field: string
  direction: "asc" | "desc"
}

// Service for product operations
export const ProductService = {
  // Get supplier name by ID
  getSupplierName: (supplierId: string): string => {
    const supplier = supplierStatic.find((s) => s.id === supplierId)
    return supplier ? supplier.supplier_name : supplierId
  },

  // Get all suppliers as filter options
  getSupplierFilterOptions: () => {
    return supplierStatic.map((supplier) => ({
      id: supplier.id,
      supplier_name: supplier.supplier_name,
    }))
  },

  // Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>("/product/products")
      return response.data
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Error fetching products")
    }
  },

  // Obtener un producto por ID
  getProduct: async (id: number): Promise<Product | null> => {
    try {
      const response = await apiClient.get<Product>(`/product/by-id/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      throw new Error(`Error fetching product with ID ${id}`)
    }
  },

  // Crear un nuevo producto
  createProduct: async (product: Omit<Product, "id_product">): Promise<Product> => {
    try {
      const response = await apiClient.post<Product>("/product/create-product", product)
      return response.data
    } catch (error) {
      console.error("Error creating product:", error)
      throw new Error("Error creating product")
    }
  },

  // Actualizar un producto existente
  updateProduct: async (product: Product): Promise<Product> => {
    try {
      const response = await apiClient.put<Product>(`/product/update-product/${product.id_product}`, product)
      return response.data
    } catch (error) {
      console.error(`Error updating product with ID ${product.id_product}:`, error)
      throw new Error(`Error updating product with ID ${product.id_product}`)
    }
  },

  // Inactivar un producto
  inactivateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/inactivate/${id}`)
    } catch (error) {
      console.error(`Error inactivating product with ID ${id}:`, error)
      throw new Error(`Error inactivating product with ID ${id}`)
    }
  },

  // Activar un producto
  activateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/activate/${id}`)
    } catch (error) {
      console.error(`Error activating product with ID ${id}:`, error)
      throw new Error(`Error activating product with ID ${id}`)
    }
  },

  // Toggle product state (active/inactive)
  toggleProductState: async (id: string, currentState?: boolean): Promise<Product> => {
    try {
      // Dependiendo del estado actual, activamos o inactivamos
      if (currentState) {
        await ProductService.inactivateProduct(id)
      } else {
        await ProductService.activateProduct(id)
      }

      // Obtenemos el producto actualizado
      const updatedProduct = await ProductService.getProduct(Number(id))

      if (!updatedProduct) {
        throw new Error(`Product with ID ${id} not found after toggle`)
      }

      return updatedProduct
    } catch (error) {
      console.error(`Error toggling state for product with ID ${id}:`, error)
      throw error
    }
  },

  // Filter products by supplier
  filterProductsBySupplier: (products: Product[], supplierId: string | null): Product[] => {
    if (!supplierId) return products
    return products.filter((product) => product.id_supplier === supplierId)
  },
}
