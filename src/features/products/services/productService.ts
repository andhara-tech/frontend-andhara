import type { Product, LocationName } from "@/features/products/types/productTypes"

// Simular delay de red

// Simular base de datos

// Servicio para operaciones con productos
export const ProductService = {
  // Obtener todos los productos
  getProducts: async (): Promise<Product[]> => {

  },

  // Obtener un producto por ID
  getProduct: async (id: number): Promise<Product | null> => {

  },

  // Crear un nuevo producto
  createProduct: async (product: Omit<Product, "product_id">): Promise<Product> => {

  },

  // Actualizar un producto existente
  updateProduct: async (product: Product): Promise<Product> => {

  },

  // Eliminar un producto
  deleteProduct: async (id: number): Promise<void> => {

  },

  // Actualizar stock de un producto en una ubicación específica
  updateStock: async (productId: number, location: LocationName, quantity: number): Promise<Product> => {

  },

  // Obtener stock total de un producto (suma de todas las ubicaciones)
  getTotalStock: async (productId: number): Promise<number> => {

  },
}
