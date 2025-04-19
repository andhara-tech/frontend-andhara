import apiClient from "@/app/apiClient"
import type { Product } from "@/features/products/types/productTypes"

export interface SortOption {
  field: string
  direction: "asc" | "desc"
}

export const ProductService = {
  // Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>("/product/products")
      return response.data
    }catch (error) {
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
    try{
      const response = await apiClient.post<Product>("/product/create-product", product)
      return response.data
    }catch (error) {
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

  // Eliminar un producto
  inactivateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/inactivate/${id}`)
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error)
      throw new Error(`Error deleting product with ID ${id}`)
    }
  },
}
