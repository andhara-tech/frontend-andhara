import { create } from "zustand"
import { ProductService } from "@/features/products/services/productService" 
import type { Product, ProductTableFilters, StockInfo } from "@/features/products/types/productTypes"

interface ProductState {
  // Datos
  products: Product[]
  filteredProducts: Product[]

  // Estado de UI
  isLoading: boolean
  error: string | null

  // Filtros y paginación
  filters: ProductTableFilters
  search: string
  pageIndex: number
  pageSize: number

  // Acciones
  fetchProducts: () => Promise<void>
  createProduct: (product: Omit<Product, "product_id">) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  inactivateProduct: (id: string) => Promise<void>

    // Acciones de UI
    setFilters: (filters: Partial<ProductTableFilters>) => void
  clearFilters: () => void
  setSearch: (search: string) => void
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void

  // Función interna para aplicar filtros
  applyFilters: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Estado inicial
  products: [],
  filteredProducts: [],
  isLoading: false,
  error: null,
  filters: {
    id_supplier: null,
    discount: null,
    location: null,
    minStock: null,
  },
  search: "",
  pageIndex: 0,
  pageSize: 5,

  // Acciones
  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      const products = await ProductService.getProducts()
      set({ products, isLoading: false })
      get().applyFilters()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al cargar productos",
        isLoading: false,
      })
    }
  },

  createProduct: async (productData) => {
    set({ isLoading: true, error: null })
    try {
      await ProductService.createProduct(productData)
      await get().fetchProducts()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al crear producto",
        isLoading: false,
      })
    }
  },

  updateProduct: async (product) => {
    set({ isLoading: true, error: null })
    try {
      await ProductService.updateProduct(product)
      await get().fetchProducts()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al actualizar producto",
        isLoading: false,
      })
    }
  },

  inactivateProduct: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await ProductService.inactivateProduct(id)
      await get().fetchProducts()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al eliminar producto",
        isLoading: false,
      })
    }
  },

  // Acciones de UI
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pageIndex: 0, // Resetear a la primera página al filtrar
    }))
    get().applyFilters()
  },

  clearFilters: () => {
    set({
      filters: {
        id_supplier: null,
        discount: null,
        location: null,
        minStock: null,
      },
      search: "",
      pageIndex: 0,
    })
    get().applyFilters()
  },

  setSearch: (search) => {
    set({ search, pageIndex: 0 })
    get().applyFilters()
  },

  setPageIndex: (pageIndex) => {
    set({ pageIndex })
  },

  setPageSize: (pageSize) => {
    set({ pageSize, pageIndex: 0 })
  },

  // Función interna para aplicar filtros
  applyFilters: () => {
    const { products, filters, search } = get()

    const filtered = products.filter((product) => {
      // Aplicar filtro de proveedor
      if (filters.id_supplier !== null && product.id_supplier !== filters.id_supplier) {
        return false
      }

      // Aplicar filtro de descuento
      if (filters.discount !== null && product.product_discount < filters.discount) {
        return false
      }

      // Aplicar filtro de ubicación y stock mínimo
      if (filters.location !== null) {
        const locationStock = product.stock.find((stock: StockInfo) => stock.id_branch === filters.location)
        if (!locationStock) return false

        if (filters.minStock && locationStock.quantity < filters.minStock) {
          return false
        }
      }

      // Aplicar búsqueda global
      if (search) {
        const searchLower = search.toLowerCase()
        return (
          product.product_name?.toLowerCase().includes(searchLower) ||
          product.product_description?.toLowerCase().includes(searchLower) ||
          product.id_product?.toString().includes(searchLower) ||
          product.id_supplier?.toString().includes(searchLower)
        )
      }

      return true
    })

    set({ filteredProducts: filtered })
  },
}))
