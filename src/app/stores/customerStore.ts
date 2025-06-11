// import { create } from "zustand";
// import { CustomerService } from "@/features/customer/services/customerService";
// import { Customer, CustomerPurchase, CustomerRequest, CustomerTableFilters } from "@/features/customer/types/customerTypes";
// import { getValueByPath, SortOption } from "@/lib/utils";
// import debounce from "lodash.debounce";

// interface CustomerState {
//   allCustomers: Customer[]
//   filteredCustomers: Customer[]
//   displayedCustomers: Customer[]

//   total: number
//   pageCount: number

//   isLoading: boolean
//   error: string | null

//   filters: CustomerTableFilters
//   search: string
//   sort: SortOption | undefined
//   pageIndex: number
//   pageSize: number

//   editDialogOpen: boolean
//   newCustomerDialogOpen: boolean
//   deleteDialogOpen: boolean
//   selectedCustomer: Customer | null
//   customerIdToDelete: string | null
//   sheetCustomer: Customer | null
//   sheetOpen: boolean
//   customerPurchase: CustomerPurchase | null


//   fetchCustomers: (params?: { search?: string, skip?: number, limit?: number }) => Promise<void>
//   createCustomer: (customer: CustomerRequest) => Promise<void>
//   updateCustomer: (customer: CustomerRequest) => Promise<void>
//   toggleCustomerState: (document: string) => Promise<void>
//   fetchCustomerPurchase: (document: string) => Promise<void>
//   fetchAndSetSelectedCustomerByDocument: (document: string) => Promise<void>

//   setFilters: (filters: Partial<CustomerTableFilters>) => void
//   clearFilters: () => void
//   setSearch: (search: string) => void
//   setSort: (sort: SortOption | undefined) => void
//   setPageIndex: (index: number) => void
//   setPageSize: (size: number) => void

//   setCustomerDocument: (document: string) => void
//   setNameFilter: (name: string) => void
//   setEmailFilter: (email: string) => void
//   setPhoneFilter: (phone: string) => void
//   setAddressFilter: (address: string) => void
//   setBranchFilter: (branch: string) => void
//   setSearchWithDebounce: (search: string) => void
//   setSelectedCustomer: (customer: Customer | null) => void

//   openEditDialog: (customer: Customer) => void
//   openNewCustomerDialog: () => void
//   openDeleteDialog: (customerId: string) => void
//   openSheet: (customer: Customer) => void
//   closeEditDialog: () => void
//   closeNewCustomerDialog: () => void
//   closeDeleteDialog: () => void
//   closeSheet: () => void


//   applyFilters: () => void
//   applyPagination: () => void
//   applySorting: (customers: Customer[]) => Customer[]
// }

// const initialFilters: CustomerTableFilters = {
//   document_type: null,
//   customer_address: null,
//   customer_document: null,
//   customer_email: null,
//   customer_name: null,
//   customer_phone: null,
//   branch: null,
//   customer_state: null,
//   minPurchase: null,
//   maxPurchase: null,
//   minDuration: null,
//   maxDuration: null,
// }

// export const useCustomerStore = create<CustomerState>((set, get) => ({
//   allCustomers: [],
//   filteredCustomers: [],
//   displayedCustomers: [],
//   sheetOpen: false,
//   sheetCustomer: null,
//   customerPurchase: null,

//   total: 0,
//   pageCount: 0,

//   isLoading: false,
//   error: null,

//   filters: { ...initialFilters },
//   search: "",
//   sort: undefined,
//   pageIndex: 0,
//   pageSize: 5,

//   editDialogOpen: false,
//   newCustomerDialogOpen: false,
//   deleteDialogOpen: false,
//   selectedCustomer: null,
//   customerIdToDelete: null,

//   fetchCustomers: async (params) => {
//     set({ isLoading: true, error: null })
//     try {
//       const { search = get().search, skip, limit } = params || {};
//       const pageIndex = get().pageIndex;
//       const pageSize = get().pageSize;
//       const customers = await CustomerService.getCustomers({
//         search,
//         skip: skip !== undefined ? skip : pageIndex * pageSize,
//         limit: limit !== undefined ? limit : pageSize,
//       })

//       set({
//         allCustomers: customers,
//         total: customers.length,
//         pageCount: Math.ceil(customers.length / pageSize),
//       })

//       get().applyFilters()
//       set({ isLoading: false })
//     } catch (error) {
//       set({ error: "Error fetching customers", isLoading: false })
//     }
//   },
//   fetchAndSetSelectedCustomerByDocument: async (document: string) => {
//     set({ isLoading: true, error: null, selectedCustomer: null });
//     try {
//       // Asumimos que el backend puede buscar un cliente por su documento
//       // usando el parámetro 'search' y que el documento es único.
//       // Limitamos a 1 para obtener solo ese cliente si se encuentra.
//       const customers = await CustomerService.getCustomers({ search: document, limit: 1, skip: 0 });

//       if (customers && customers.length > 0) {
//         // Verificamos si el primer cliente encontrado realmente coincide con el documento,
//         // ya que la búsqueda podría ser amplia.
//         const foundCustomer = customers.find(c => c.customer_document === document);
//         if (foundCustomer) {
//           set({ selectedCustomer: foundCustomer, isLoading: false });
//         } else {
//           // La búsqueda devolvió resultados, pero ninguno coincidió exactamente con el documento.
//           set({ selectedCustomer: null, isLoading: false, error: "Cliente no encontrado con ese documento exacto." });
//         }
//       } else {
//         // No se encontraron clientes que coincidan con el criterio de búsqueda.
//         set({ selectedCustomer: null, isLoading: false, error: "Cliente no encontrado." });
//       }
//     } catch (error) {
//       console.error("Error fetching and setting customer by document:", error);
//       set({ error: "Error al buscar el cliente por documento.", isLoading: false, selectedCustomer: null });
//     }
//   },
//   fetchCustomerPurchase: async (document) => {
//     set({ isLoading: true, error: null })
//     try {
//       const response = await CustomerService.getCustomerPurchase(document)
//       set({
//         isLoading: false,
//         customerPurchase: response,
//       })
//     } catch (error) {
//       set({ error: "Error fetching customers" })
//     }
//   },
//   createCustomer: async (customer) => {
//     set({ isLoading: true, error: null })
//     try {
//       const newCustomer = await CustomerService.createCostumer(customer)

//       set((state) => ({
//         allCustomers: [...state.allCustomers, newCustomer],
//         isLoading: false,
//       }))

//       await get().fetchCustomers()

//       get().applyFilters()
//       get().closeNewCustomerDialog()
//     } catch (error) {
//       set({ error: "Error creating customer" })
//     } finally {
//       set({ isLoading: false })
//     }
//   },
//   updateCustomer: async (customer) => {
//     set({ isLoading: true, error: null })
//     try {
//       const updatedCustomer = await CustomerService.updateCustomer(customer)

//       set((state) => ({
//         allCustomers: state.allCustomers.map((c) => (c.customer_document === customer.customer_document ? updatedCustomer : c)),
//         isLoading: false,
//       }))

//       await get().fetchCustomers()

//       get().applyFilters()
//       get().closeEditDialog()

//     } catch (error) {
//       set({ error: "Error updating customer" })
//     } finally {
//       set({ isLoading: false })
//     }
//   },
//   toggleCustomerState: async (document) => {
//     set({ isLoading: true, error: null })
//     try {
//       await CustomerService.toggleCustomer(document)
//       set((state) => ({
//         allCustomers: state.allCustomers.map((c) =>
//           c.customer_document === document ? { ...c, customer_state: !c.customer_state } : c
//         ),
//         isLoading: false
//       }))
//       await get().fetchCustomers()
//       get().applyFilters()
//     } catch (error) {
//       set({ error: "Error toggling customer state", isLoading: false })
//     } finally {
//       set({ isLoading: false })
//     }
//   },

//   setSelectedCustomer: (customer) => {
//     set({ selectedCustomer: customer })
//   },

//   openSheet: (customer: Customer) => {
//     set({
//       sheetCustomer: customer,
//       sheetOpen: true
//     })
//     get().fetchCustomerPurchase(customer.customer_document)
//   },

//   closeSheet: () => {
//     set({
//       sheetOpen: false,
//       sheetCustomer: null,
//       customerPurchase: null
//     })
//   },

//   setFilters: (newFilter) => {
//     set((state) => ({
//       filters: { ...state.filters, ...newFilter },
//       pageIndex: 0
//     }))
//     get().applyFilters()
//   },
//   clearFilters: () => {
//     set({
//       filters: { ...initialFilters },
//       search: "",
//       sort: undefined,
//       pageIndex: 0,
//       selectedCustomer: null,
//     })
//     get().applyFilters()
//   },

//   setSearch: (search) => {
//     set({ search, pageIndex: 0 })
//     get().applyFilters()
//   },

//   setSearchWithDebounce: (search) => {
//     set({ search })
//     debouncedSearch(search, set, get)
//   },

//   setSort: (sort) => {
//     set({ sort })
//     get().applyFilters()
//   },

//   setPageIndex: (pageIndex) => {
//     set({ pageIndex })
//     get().applyPagination()
//   },
//   setPageSize: (pageSize) => {
//     set({ pageSize, pageIndex: 0 })
//     get().applyPagination()
//   },
//   openEditDialog: (customer) => {
//     console.log(customer)
//     set({
//       selectedCustomer: customer,
//       editDialogOpen: true
//     })
//   },
//   openNewCustomerDialog: () => {
//     set({ newCustomerDialogOpen: true })
//   },
//   openDeleteDialog: (customerId) => {
//     set({
//       customerIdToDelete: customerId,
//       deleteDialogOpen: true
//     })
//   },
//   closeEditDialog: () => {
//     set({
//       selectedCustomer: null,
//       editDialogOpen: false
//     })
//   },
//   closeNewCustomerDialog: () => {
//     set({ newCustomerDialogOpen: false })
//   },

//   closeDeleteDialog: () => {
//     set({ customerIdToDelete: null, deleteDialogOpen: false })
//   },

//   setCustomerDocument: (document) => {
//     set((state) => ({
//       filters: { ...state.filters, customer_document: document },
//     }))
//     get().applyFilters()
//   },

//   setNameFilter: (name) => {
//     set((state) => ({
//       filters: { ...state.filters, customer_name: name },
//     }))
//     get().applyFilters()
//   },

//   setEmailFilter: (email) => {
//     set((state) => ({
//       filters: { ...state.filters, customer_email: email },
//     }))
//     get().applyFilters()
//   },

//   setPhoneFilter: (phone) => {
//     set((state) => ({
//       filters: { ...state.filters, customer_phone: phone },
//     }))
//     get().applyFilters()
//   },

//   setAddressFilter: (address) => {
//     set((state) => ({
//       filters: { ...state.filters, customer_address: address },
//     }))
//     get().applyFilters()
//   },

//   setBranchFilter: (branch) => {
//     set((state) => ({
//       filters: { ...state.filters, id_branch: branch },
//     }))
//     get().applyFilters()
//   },

  // applyFilters: () => {
  //   const { allCustomers, filters, search, pageSize, sort } = get()

  //   let filtered = [...allCustomers]

  //   if (filters.customer_document) {
  //     const docFilter = filters.customer_document.trim()

  //     filtered = filtered.filter((c) =>
  //       c.customer_document.toLowerCase().includes(docFilter.toLowerCase())
  //     )
  //   }

  //   if (filters.document_type) {
  //     const docType = filters.document_type.trim()

  //     filtered = filtered.filter((d) =>
  //       d.document_type.toLowerCase().includes(docType.toLowerCase())
  //     )
  //   }

  //   if (filters.customer_phone) {
  //     const phoneFilter = filters.customer_phone.trim().toLowerCase()

  //     filtered = filtered.filter((c) =>
  //       c.phone_number.toLowerCase().includes(phoneFilter.toLowerCase())
  //     )
  //   }

  //   if (filters.customer_address) {
  //     const addressFilter = filters.customer_address.trim().toLowerCase()

  //     filtered = filtered.filter((c) =>
  //       c.home_address.toLowerCase().includes(addressFilter.toLowerCase())
  //     )
  //   }

  //   if (filters.branch?.id_branch) {
  //     const branchFilter = filters.branch.id_branch.trim().toLowerCase()

  //     filtered = filtered.filter((c) =>
  //       c.branch.id_branch.toLowerCase().includes(branchFilter.toLowerCase())
  //     )
  //   }
  //   if (filters.branch?.branch_name) {
  //     const brachFilter = filters.branch.branch_name.toLowerCase()

  //     filtered = filtered.filter((c) =>
  //       c.branch.branch_name.toLowerCase().includes(brachFilter.toLowerCase())
  //     )
  //   }

  //   if (search) {
  //     const words = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
  //     filtered = filtered.filter((c) =>
  //       words.every((word) =>
  //         c.customer_first_name.toLowerCase().includes(word) ||
  //         c.customer_last_name.toLowerCase().includes(word) ||
  //         c.customer_document.toLowerCase().includes(word) ||
  //         c.email.toLowerCase().includes(word) ||
  //         c.phone_number.toLowerCase().includes(word)
  //       )
  //     );
  //   }

  //   if (sort) {
  //     filtered = get().applySorting(filtered)
  //   }

  //   const total = filtered.length
  //   const pageCount = Math.ceil(total / pageSize)

  //   set({
  //     filteredCustomers: filtered,
  //     total,
  //     pageCount,
  //   })

  //   get().applyPagination()
  // },

//   applyPagination: () => {
//     const { filteredCustomers, pageIndex, pageSize } = get()
//     const start = pageIndex * pageSize
//     const end = start + pageSize
//     const paginatedCustomer = filteredCustomers.slice(start, end)

//     set({
//       displayedCustomers: paginatedCustomer,
//     })
//   },
//   applySorting: (customers: Customer[]): Customer[] => {
//     const { sort } = get()

//     if (!sort) return customers

//     return [...customers].sort((a, b) => {
//       const aValue = getValueByPath(a, sort.field)
//       const bValue = getValueByPath(b, sort.field)

//       if (aValue == null || bValue == null) return 0
//       if (aValue < bValue) return sort.direction === "asc" ? -1 : 1
//       if (aValue > bValue) return sort.direction === "asc" ? 1 : -1
//       return 0
//     })
//   }
// }))


// const debouncedSearch = debounce(async (search: string, set: any, get: any) => {
//   set({ isLoading: true })
//   try {
//     const result = await get().fetchCustomers({ search })
//     if (!Array.isArray(result)) {
//       set({ error: "Error fetching customers" })
//       return
//     }
//     set({ filteredCustomers: result, isLoading: false })
//   } catch (error) {
//     set({ error: "Error fetching customers" })
//   }
// }, 500) 