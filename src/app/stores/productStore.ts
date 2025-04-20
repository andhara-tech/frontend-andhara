import { create } from "zustand"
import { ProductService, type SortOption } from "@/features/products/services/productService"
import type { Product, ProductTableFilters } from "@/features/products/types/productTypes"

interface ProductState {
  // Data
  allProducts: Product[] // All products without filtering
  filteredProducts: Product[] // Filtered products
  displayedProducts: Product[] // Paginated products to display

  // Pagination metadata
  total: number
  pageCount: number

  // UI state
  isLoading: boolean
  error: string | null

  // Filters, sorting, and pagination
  filters: ProductTableFilters
  search: string
  sort: SortOption | undefined
  pageIndex: number
  pageSize: number

  // Dialog states
  editDialogOpen: boolean
  newProductDialogOpen: boolean
  deleteDialogOpen: boolean
  selectedProduct: Product | null
  productIdToDelete: string | null

  // Actions
  fetchProducts: () => Promise<void>
  createProduct: (product: Omit<Product, "id_product">) => Promise<void>
  updateProduct: (product: Product) => Promise<void>
  inactivateProduct: (id: string) => Promise<void>
  toggleProductState: (id: string) => Promise<void>
  getSupplierName: (supplierId: string) => string

  // UI actions
  setFilters: (filters: Partial<ProductTableFilters>) => void
  clearFilters: () => void
  setSearch: (search: string) => void
  setSort: (sort: SortOption | undefined) => void
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void

  // Dialog actions
  openEditDialog: (product: Product) => void
  openNewProductDialog: () => void
  openDeleteDialog: (productId: string) => void
  closeEditDialog: () => void
  closeNewProductDialog: () => void
  closeDeleteDialog: () => void

  // Internal functions for local filtering
  applyFilters: () => void
  applyPagination: () => void
  applySorting: (products: Product[]) => Product[]
}

// Initial state for filters
const initialFilters: ProductTableFilters = {
  id_supplier: null,
  discount: null,
  minStock: null,
  product_state: null,
}

export const useProductStore = create<ProductState>((set, get) => ({
  // Initial state
  allProducts: [],
  filteredProducts: [],
  displayedProducts: [],
  total: 0,
  pageCount: 0,
  isLoading: false,
  error: null,
  filters: { ...initialFilters },
  search: "",
  sort: undefined,
  pageIndex: 0,
  pageSize: 10,

  // Dialog states
  editDialogOpen: false,
  newProductDialogOpen: false,
  deleteDialogOpen: false,
  selectedProduct: null,
  productIdToDelete: null,

  // Actions
  fetchProducts: async () => {
    set({ isLoading: true, error: null })
    try {
      // Fetch all products without filters
      const products = await ProductService.getProducts()

      // Store all products
      set({
        allProducts: products,
        total: products.length,
        pageCount: Math.ceil(products.length / get().pageSize),
      })

      // Apply filters and pagination
      get().applyFilters()

      set({ isLoading: false })
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
      const newProduct = await ProductService.createProduct(productData)

      // Update local state
      set((state) => ({
        allProducts: [...state.allProducts, newProduct],
        isLoading: false,
      }))

      // Apply filters and pagination
      get().applyFilters()

      // Close the dialog
      get().closeNewProductDialog()
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
      const updatedProduct = await ProductService.updateProduct(product)

      // Update local state
      set((state) => ({
        allProducts: state.allProducts.map((p) => (p.id_product === updatedProduct.id_product ? updatedProduct : p)),
        isLoading: false,
      }))

      // Apply filters and pagination
      get().applyFilters()

      // Close the dialog
      get().closeEditDialog()
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

      // Update local state - we're not removing the product, just marking it as inactive
      // We'll refetch products to get the updated state
      await get().fetchProducts()

      // Close the dialog
      get().closeDeleteDialog()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al inactivar producto",
        isLoading: false,
      })
    }
  },

  toggleProductState: async (id) => {
    set({ isLoading: true, error: null })
    try {
      // Encontrar el producto actual para saber su estado
      const product = get().allProducts.find((p) => p.id_product === id)

      if (!product) {
        throw new Error(`Producto con ID ${id} no encontrado`)
      }

      const updatedProduct = await ProductService.toggleProductState(id, product.product_state)

      // Update local state
      set((state) => ({
        allProducts: state.allProducts.map((p) => (p.id_product === updatedProduct.id_product ? updatedProduct : p)),
        isLoading: false,
      }))

      // Apply filters and pagination
      get().applyFilters()
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Error al cambiar estado del producto",
        isLoading: false,
      })
    }
  },

  // Get supplier name by ID
  getSupplierName: (supplierId) => {
    return ProductService.getSupplierName(supplierId)
  },

  // UI actions
  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pageIndex: 0, // Reset to first page when filtering
    }))
    get().applyFilters()
  },

  clearFilters: () => {
    set({
      filters: { ...initialFilters },
      search: "",
      sort: undefined,
      pageIndex: 0,
    })
    get().applyFilters()
  },

  setSearch: (search) => {
    set({ search, pageIndex: 0 })
    get().applyFilters()
  },

  setSort: (sort) => {
    set({ sort, pageIndex: 0 })
    get().applyFilters()
  },

  setPageIndex: (pageIndex) => {
    set({ pageIndex })
    get().applyPagination()
  },

  setPageSize: (pageSize) => {
    set({ pageSize, pageIndex: 0 })
    get().applyFilters()
  },

  // Dialog actions
  openEditDialog: (product) => {
    set({
      selectedProduct: product,
      editDialogOpen: true,
    })
  },

  openNewProductDialog: () => {
    set({ newProductDialogOpen: true })
  },

  openDeleteDialog: (productId) => {
    set({
      productIdToDelete: productId,
      deleteDialogOpen: true,
    })
  },

  closeEditDialog: () => {
    set({
      selectedProduct: null,
      editDialogOpen: false,
    })
  },

  closeNewProductDialog: () => {
    set({ newProductDialogOpen: false })
  },

  closeDeleteDialog: () => {
    set({
      productIdToDelete: null,
      deleteDialogOpen: false,
    })
  },

  // Function to apply filters locally
  applyFilters: () => {
    const { allProducts, filters, search, sort, pageSize } = get()

    // Apply filters
    let filtered = [...allProducts]

    // Filter by supplier
    if (filters.id_supplier) {
      filtered = ProductService.filterProductsBySupplier(filtered, filters.id_supplier)
    }

    // Filter by minimum discount
    if (filters.discount !== null && filters.discount !== undefined) {
      filtered = filtered.filter((p) => p.product_discount >= filters.discount!)
    }

    // Filter by state
    if (filters.product_state !== null && filters.product_state !== undefined) {
      filtered = filtered.filter((p) => p.product_state === filters.product_state)
    }

    // Filter by minimum stock
    if (filters.minStock !== null && filters.minStock !== undefined) {
      filtered = filtered.filter((p) => {
        const totalStock = p.stock.reduce((sum, item) => sum + item.quantity, 0)
        return totalStock >= filters.minStock!
      })
    }

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.product_name.toLowerCase().includes(searchLower) ||
          p.product_description.toLowerCase().includes(searchLower) ||
          (p.id_product || '').toString().includes(searchLower) ||
          // Include supplier name in search
          ProductService.getSupplierName(p.id_supplier)
            .toLowerCase()
            .includes(searchLower)
      )
    }

    // Apply sorting
    if (sort) {
      filtered = get().applySorting(filtered)
    }

    // Calculate total and pages
    const total = filtered.length
    const pageCount = Math.ceil(total / pageSize)

    // Save filtered products
    set({
      filteredProducts: filtered,
      total,
      pageCount,
    })

    // Apply pagination
    get().applyPagination()
  },

  // Function to apply pagination
  applyPagination: () => {
    const { filteredProducts, pageIndex, pageSize } = get()

    // Apply pagination
    const start = pageIndex * pageSize
    const end = start + pageSize
    const paginatedProducts = filteredProducts.slice(start, end)

    // Update products to display
    set({ displayedProducts: paginatedProducts })
  },

  // Function to apply sorting
  applySorting: (products: Product[]): Product[] => {
    const { sort } = get()

    if (!sort) return products

    return [...products].sort((a, b) => {
      const { field, direction } = sort
      const multiplier = direction === "asc" ? 1 : -1

      // Special case for supplier field - sort by supplier name
      if (field === "id_supplier") {
        const supplierNameA = ProductService.getSupplierName(a.id_supplier)
        const supplierNameB = ProductService.getSupplierName(b.id_supplier)
        return supplierNameA.localeCompare(supplierNameB) * multiplier
      }

      // Handle stock field (which is an array)
      if (field === "stock") {
        const stockA = a.stock.reduce((sum, item) => sum + item.quantity, 0)
        const stockB = b.stock.reduce((sum, item) => sum + item.quantity, 0)
        return (stockA - stockB) * multiplier
      }

      // Handle other fields
      const valueA = a[field as keyof Product]
      const valueB = b[field as keyof Product]

      // Handle numeric fields
      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * multiplier
      }

      // Handle text fields
      if (typeof valueA === "string" && typeof valueB === "string") {
        return valueA.localeCompare(valueB) * multiplier
      }

      // Handle boolean fields
      if (typeof valueA === "boolean" && typeof valueB === "boolean") {
        return (valueA === valueB ? 0 : valueA ? 1 : -1) * multiplier
      }

      return 0
    })
  },
}))
