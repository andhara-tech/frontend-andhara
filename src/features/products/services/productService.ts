import apiClient from "@/app/apiClient"
import { supplierStatic } from "@/shared/static"
import type { Product } from "@/features/products/types/productTypes"

export const ProductService = {

  getSupplierName: (supplierId: string): string => {
    const supplier = supplierStatic.find((s) => s.id === supplierId)
    return supplier ? supplier.supplier_name : supplierId
  },

  getSupplierFilterOptions: () => {
    return supplierStatic.map((supplier) => ({
      id: supplier.id,
      supplier_name: supplier.supplier_name,
    }))
  },

  getProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>("/product/products")
      return response.data
    } catch (error) {
      console.error("Error fetching products:", error)
      throw new Error("Error fetching products")
    }
  },

  getProduct: async (id: string): Promise<Product | null> => {
    try {
      const response = await apiClient.get<Product>(`/product/by-id/${id}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error)
      throw new Error(`Error fetching product with ID ${id}`)
    }
  },

  createProduct: async (product: Omit<Product, "id_product">): Promise<Product> => {
    try {
      const response = await apiClient.post<Product>("/product/create-product", product)
      return response.data
    } catch (error) {
      console.error("Error creating product:", error)
      throw new Error("Error creating product")
    }
  },

  updateProduct: async (product: Product): Promise<Product> => {
    try {
      const response = await apiClient.put<Product>(`/product/update-product/${product.id_product}`, product)
      return response.data
    } catch (error) {
      console.error(`Error updating product with ID ${product.id_product}:`, error)
      throw new Error(`Error updating product with ID ${product.id_product}`)
    }
  },

  inactivateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/inactivate/${id}`)
    } catch (error) {
      console.error(`Error inactivating product with ID ${id}:`, error)
      throw new Error(`Error inactivating product with ID ${id}`)
    }
  },

  activateProduct: async (id: string): Promise<void> => {
    try {
      await apiClient.patch(`/product/activate/${id}`)
    } catch (error) {
      console.error(`Error activating product with ID ${id}:`, error)
      throw new Error(`Error activating product with ID ${id}`)
    }
  },

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

  filterProductsBySupplier: (products: Product[], supplierId: string | null): Product[] => {
    if (!supplierId) return products
    return products.filter((product) => product.id_supplier === supplierId)
  },
}
