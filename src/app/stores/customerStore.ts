import { create } from "zustand";
import { CustomerService } from "@/features/customer/services/customerService";
import { Customer, CustomerByDocument, CustomerRequest, CustomerTableFilters} from "@/features/customer/types/customerTypes";
import { SortOption } from "@/lib/utils";

interface CustomerState {
  allCustomers: Customer[]
  filteredCustomers: Customer[]
  displayedCustomers: Customer[]
  customerData: CustomerByDocument | null

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
  sheetCustomer: Customer | null
  sheetOpen: boolean
  

  fetchCustomers: () => Promise<void>
  createCustomer: (customer: CustomerRequest) => Promise<void>
  updateCustomer: (customer: CustomerRequest) => Promise<void>
  toggleCustomerState: (document: string) => Promise<void>
  fetchCustomerByDocument: (document: string) => Promise<void>

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
  openSheet: (customer: Customer) => void
  closeEditDialog: () => void
  closeNewCustomerDialog: () => void
  closeDeleteDialog: () => void
  closeSheet: () => void


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
  branch: null,
  customer_state: null,
  minPurchase: null,
  maxPurchase: null,
  minDuration: null,
  maxDuration: null,
}

export const useCustumerStore = create<CustomerState>((set, get) => ({
  allCustomers: [],
  filteredCustomers: [],
  displayedCustomers: [],
  customerData: null,
  sheetOpen: false,
  sheetCustomer: null,

  total: 0,
  pageCount: 0,

  isLoading: false,
  error: null,

  filters: { ...initialFilters },
  search: "",
  sort: undefined,
  pageIndex: 0,
  pageSize: 5,

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
      set({isLoading: false})
    } catch (error) {
      set({ error: "Error fetching customers" })
    }
  },
  fetchCustomerByDocument: async(document) => {
    set({ isLoading: true, error: null })
    try{
      const response = await CustomerService.getCustomerByDocument(document)
      set({
        customerData: response,
        isLoading: false,
      })
    }catch (error){
      set({error: "Error fetching customers"})
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

      get().closeNewCustomerDialog()
    } catch (error) {
      set({ error: "Error creating customer" })
    } finally {
      set({ isLoading: false })
    }
  },
  updateCustomer: async (customer) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCustomer = await CustomerService.updateCustomer(customer)

      set((state) => ({
        allCustomers: state.allCustomers.map((c) => (c.customer_document === customer.customer_document ? updatedCustomer : c)),
        isLoading: false,
      }))

      get().applyFilters()
      get().closeEditDialog()
      
    } catch (error) {
      set({ error: "Error updating customer" })
    } finally {
      set({ isLoading: false })
    }
  },
  toggleCustomerState: async (document) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCustomer = await CustomerService.toggleCustomer(document)
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

  openSheet: (customer: Customer) => {
    set({
      sheetCustomer: customer,
      sheetOpen: true
    })
    get().fetchCustomerByDocument(customer.customer_document)
  },

  closeSheet: () => {
    set({
      sheetOpen: false,
      sheetCustomer: null,
      customerData: null
    })
  },
  
  setFilters: (newFilter) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilter },
      pageIndex: 0
    }))
    get().applyFilters()
  },
  clearFilters: () => {
    set({
      filters: {...initialFilters},
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
    get().applyPagination()
  },
  openEditDialog: (customer) => {
    console.log(customer)
    set({ 
      selectedCustomer: customer, 
      editDialogOpen: true 
    })
  },
  openNewCustomerDialog: () => {
    set({ newCustomerDialogOpen: true })
  },
  openDeleteDialog: (customerId) => {
    set({ 
      customerIdToDelete: customerId, 
      deleteDialogOpen: true 
    })
  },
  closeEditDialog: () => {
    set({ 
      selectedCustomer: null, 
      editDialogOpen: false 
    })
  },
  closeNewCustomerDialog: () => {
    set({ newCustomerDialogOpen: false })
  },

  closeDeleteDialog: () => {
    set({ customerIdToDelete: null, deleteDialogOpen: false })
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

  applyFilters: () => {
    const { allCustomers, filters, search, pageSize, sort } = get()

    let filtered = [...allCustomers]

    if (filters.customer_document) {
      const docFilter = filters.customer_document.trim()

      filtered = filtered.filter((c) =>
        c.customer_document.toLowerCase().includes(docFilter.toLowerCase())
      )
    }

    if(filters.document_type){
      const docType = filters.document_type.trim()

      filtered = filtered.filter((d) =>
        d.document_type.toLowerCase().includes(docType.toLowerCase())
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

    if (filters.branch?.id_branch) {
      const branchFilter = filters.branch.id_branch.trim().toLowerCase()

      filtered = filtered.filter((c) =>
        c.branch.id_branch.toLowerCase().includes(branchFilter.toLowerCase())
      )
    }
     if(filters.branch?.branch_name){
       const brachFilter = filters.branch.branch_name.toLowerCase()

      filtered = filtered.filter((c) =>
        c.branch.branch_name.toLowerCase().includes(brachFilter.toLowerCase())  
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

    get().applyPagination()
  },

  applyPagination: () => {
    const { filteredCustomers, pageIndex, pageSize } = get()
    const start = pageIndex * pageSize
    const end = start + pageSize
    const paginatedCustomer = filteredCustomers.slice(start, end)

    set({
      displayedCustomers: paginatedCustomer,
    })
  },
  applySorting: (customers: Customer[]): Customer[] => {
    const { sort } = get()

    if (!sort) return customers

    return [...customers].sort((a, b) => {
      const aValue = a[sort.field as keyof Customer]
      const bValue = b[sort.field as keyof Customer]

      if (aValue == null || bValue == null) return 0
      if (aValue < bValue) return sort.direction === "asc" ? -1 : 1
      if (aValue > bValue) return sort.direction === "asc" ? 1 : -1
      return 0
    })
  }
}))