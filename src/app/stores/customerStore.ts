import { CustomerService } from "@/features/customer/services/customerService";
import { Customer, CustomerTableFilters } from "@/features/customer/types/customerTypes";
import { SortOption } from "@/lib/utils";
import { create } from "zustand";

interface CustomerState {
  allCustomers: Customer[]
  filteredCustomers: Customer[]
  displayedCustomers: Customer[]

  total: number
  pageCount: number

  isLoading: boolean
  error: string | null

  filters: CustomerTableFilters
  search: string
  sort: SortOption | undefined
  pageIndex: number
  pageSize: number

  editDialogOpen: boolean
  newCustomerDialogOpen: boolean
  deleteDialogOpen: boolean
  selectedCustomer: Customer | null
  customerIdToDelete: string | null

  fetchCustomers: () => Promise<void>
  createCustomer: (customer: Customer) => Promise<void>
  updateCustomer: (customer: Customer) => Promise<void>
  inactivateCustomer: (document: string) => Promise<void>
  toggleCustomerState: (document: string) => Promise<void>

  setFilters: (filters: Partial<CustomerTableFilters>) => void
  clearFilters: () => void
  setSearch: (search: string) => void
  setSort: (sort: SortOption | undefined) => void
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void

  setCustomerDocument: (document: string) => void
  setNameFilter: (name: string) => void
  setEmailFilter: (email: string) => void
  setPhoneFilter: (phone: string) => void
  setAddressFilter: (address: string) => void
  setBranchFilter: (branch: string) => void

  openEditDialog: (customer: Customer) => void
  openNewCustomerDialog: () => void
  openDeleteDialog: (customerId: string) => void
  closeEditDialog: () => void
  closeNewCustomerDialog: () => void
  closeDeleteDialog: () => void

  applyFilters: () => void
  applyPagination: () => void
  applySorting: (customers: Customer[]) => Customer[]
}

const initialFilters: CustomerTableFilters = {
  document_type: null,
  customer_address: null,
  customer_document: null,
  customer_email: null,
  customer_name: null,
  customer_phone: null,
  id_branch: null,
  customer_state: null,
  minPurchase: null,
  maxPurchase: null,
  minDuration: null,
  maxDuration: null,
}

export const useCostumerStore = create<CustomerState>((set, get) => ({
  allCustomers: [],
  filteredCustomers: [],
  displayedCustomers: [],

  total: 0,
  pageCount: 0,

  isLoading: false,
  error: null,

  filters: initialFilters,
  search: "",
  sort: undefined,
  pageIndex: 0,
  pageSize: 10,

  editDialogOpen: false,
  newCustomerDialogOpen: false,
  deleteDialogOpen: false,
  selectedCustomer: null,
  customerIdToDelete: null,

  fetchCustomers: async () => {
    set({ isLoading: true, error: null })
    try {
      const customers = await CustomerService.getCustomers()

      set({
        allCustomers: customers,
        total: customers.length,
        pageCount: Math.ceil(customers.length / get().pageSize),
      })

      get().applyFilters()
    } catch (error) {
      set({ error: "Error fetching customers" })
    } finally {
      set({ isLoading: false })
    }
  },
  createCustomer: async (customer) => {
    set({ isLoading: true, error: null })
    try {
      const newCustomer = await CustomerService.createCostumer(customer)

      set((state) => ({
        allCustomers: [...state.allCustomers, newCustomer],
        isLoading: false,
      }))

      get().applyFilters()
    } catch (error) {
      set({ error: "Error creating customer" })
    } finally {
      set({ isLoading: false })
    }
  },
  updateCustomer: async (customer) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCustomer = await CustomerService.updateCustomer(customer.customer_document, customer)

      set((state) => ({
        allCustomers: state.allCustomers.map((c) => (c.customer_document === customer.customer_document ? updatedCustomer : c)),
        isLoading: false,
      }))

      get().applyFilters()
    } catch (error) {
      set({ error: "Error updating customer" })
    } finally {
      set({ isLoading: false })
    }
  },
  inactivateCustomer: async (document) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCustomer = await CustomerService.inactivateCustomer(document)

      set((state) => ({
        allCustomers: state.allCustomers.map((c) => (c.customer_document === document ? updatedCustomer : c)),
        isLoading: false,
      }))

      get().applyFilters()
    } catch (error) {
      set({ error: "Error inactivating customer" })
    } finally {
      set({ isLoading: false })
    }
  },
  toggleCustomerState: async (document) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCustomer = await CustomerService.activateCustomer(document)

      set((state) => ({
        allCustomers: state.allCustomers.map((c) => (c.customer_document === document ? updatedCustomer : c)),
        isLoading: false,
      }))

      get().applyFilters()
    } catch (error) {
      set({ error: "Error toggling customer state" })
    } finally {
      set({ isLoading: false })
    }
  },
  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }))

    get().applyFilters()
  },
  clearFilters: () => {
    set({
      filters: initialFilters,
      search: "",
      sort: undefined,
      pageIndex: 0,
    })
    get().applyFilters()
  },
  setCustomerDocument: (document) => {
    set((state) => ({
      filters: { ...state.filters, customer_document: document },
    }))
    get().applyFilters()
  },

  setNameFilter: (name) => {
    set((state) => ({
      filters: { ...state.filters, customer_name: name },
    }))
    get().applyFilters()
  },

  setEmailFilter: (email) => {
    set((state) => ({
      filters: { ...state.filters, customer_email: email },
    }))
    get().applyFilters()
  },

  setPhoneFilter: (phone) => {
    set((state) => ({
      filters: { ...state.filters, customer_phone: phone },
    }))
    get().applyFilters()
  },

  setAddressFilter: (address) => {
    set((state) => ({
      filters: { ...state.filters, customer_address: address },
    }))
    get().applyFilters()
  },

  setBranchFilter: (branch) => {
    set((state) => ({
      filters: { ...state.filters, id_branch: branch },
    }))
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
  setPageIndex: (index) => {
    set({ pageIndex: index })
    get().applyPagination()
  },
  setPageSize: (size) => {
    set({ pageSize: size, pageIndex: 0 })
    get().applyPagination()
  },
  openEditDialog: (customer) => {
    set({ selectedCustomer: customer, editDialogOpen: true })
  },
  openNewCustomerDialog: () => {
    set({ newCustomerDialogOpen: true })
  },
  openDeleteDialog: (customerId) => {
    set({ customerIdToDelete: customerId, deleteDialogOpen: true })
  },
  closeEditDialog: () => {
    set({ selectedCustomer: null, editDialogOpen: false })
  },
  closeNewCustomerDialog: () => {
    set({ newCustomerDialogOpen: false })
  },
  closeDeleteDialog: () => {
    set({ customerIdToDelete: null, deleteDialogOpen: false })
  },
  applyFilters: () => {
    const { allCustomers, filters, search, pageSize, sort } = get()

    let filtered = [...allCustomers]

    if (filters.customer_document) {
      const docFilter = filters.customer_document.trim()

      filtered = filtered.filter((c) =>
        c.customer_document.toLowerCase().includes(docFilter.toLowerCase())
      )
    }
    if (filters.customer_name) {
      const nameFilter = filters.customer_name.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.customer_first_name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        c.customer_last_name.toLowerCase().includes(nameFilter.toLowerCase())
      )
    }

    if (filters.customer_email) {
      const emailFilter = filters.customer_email.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.email.toLowerCase().includes(emailFilter.toLowerCase())
      )
    }

    if (filters.customer_phone) {
      const phoneFilter = filters.customer_phone.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.phone_number.toLowerCase().includes(phoneFilter.toLowerCase())
      )
    }

    if (filters.customer_address) {
      const addressFilter = filters.customer_address.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.home_address.toLowerCase().includes(addressFilter.toLowerCase())
      )
    }

    if (filters.id_branch) {
      const branchFilter = filters.id_branch.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.branch.id_branch.toLowerCase().includes(branchFilter.toLowerCase())
      )
    }
    
    if (search) {
      const searchFilter = search.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.customer_first_name.toLowerCase().includes(searchFilter) ||
        c.customer_last_name.toLowerCase().includes(searchFilter) ||
        c.customer_document.toLowerCase().includes(searchFilter) ||
        c.email.toLowerCase().includes(searchFilter) ||
        c.phone_number.toLowerCase().includes(searchFilter)
      )
    }

    if (sort) {
      filtered = get().applySorting(filtered)
    }

    const total = filtered.length
    const pageCount = Math.ceil(total / pageSize)

    set({
      filteredCustomers: filtered,
      total,
      pageCount,
    })
  },
  applyPagination: () => {
    const { filteredCustomers, pageIndex, pageSize } = get()
    const start = pageIndex * pageSize
    const end = start + pageSize

    set({
      displayedCustomers: filteredCustomers.slice(start, end),
    })
  },
  applySorting: (customers) => {
    const { sort } = get()

    if (!sort) return customers

    return [...customers].sort((a, b) => {
      const aValue = a[sort.field as keyof Customer] 
      const bValue = b[sort.field as keyof Customer]

      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1
      return 0
    })
  }
}))