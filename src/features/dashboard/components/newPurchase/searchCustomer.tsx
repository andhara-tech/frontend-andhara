import * as React from "react"
import { Loader2, User } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { FormControl } from "@/components/ui/form"
import type { Customer } from "@/features/customer/types/customerTypes"
import { useCustumerStore } from "@/app/stores/customerStore"
import { Label } from "@/components/ui/label"

interface SearchCustomerProps {
  placeholder?: string
}

export function SearchCustomer({
  placeholder = "Buscar cliente...",
}: SearchCustomerProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [isFocused, setIsFocused] = React.useState(false)

  // Usar el store de Zustand
  const { allCustomers, isLoading, fetchCustomers, setSearchWithDebounce, selectedCustomer, setSelectedCustomer } = useCustumerStore()

  // Cargar clientes al montar el componente
  React.useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // Filtrar clientes según el término de búsqueda
  const filteredCustomers = React.useMemo(() => {
    if (!searchQuery) return []

    const query = searchQuery.toLowerCase()
    return allCustomers.filter(
      (customer) =>
        customer.customer_first_name.toLowerCase().includes(query) ||
        customer.customer_last_name.toLowerCase().includes(query) ||
        customer.customer_document.includes(query),
    )
  }, [searchQuery, allCustomers])

  // Manejar cambios en la búsqueda con debounce
  React.useEffect(() => {
    if (searchQuery) {
      setSearchWithDebounce(searchQuery)
    }
  }, [searchQuery, setSearchWithDebounce])

  // Manejar selección
  const handleSelect = (customer: Customer) => {
    setSelectedCustomer(customer)
    setSearchQuery(`${customer.customer_first_name} ${customer.customer_last_name}`)
    setIsFocused(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value === "") {
      setSelectedCustomer(null)
    }
  }

  // Formatear para mostrar en campo de búsqueda al seleccionar
  const getDisplayValue = () => {
    if (selectedCustomer) {
      return `${selectedCustomer.customer_first_name} ${selectedCustomer.customer_last_name}`
    }
    return searchQuery
  }

  return (
    <div>
      <div >
        <Label htmlFor="customer" className="mb-2">Cliente</Label>
        <FormControl>
          <Input
            id="customer"
            type="text"
            placeholder={placeholder}
            value={getDisplayValue()}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
          />
        </FormControl>
      </div>

      {isFocused && (searchQuery || isLoading) && (
        <div className="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Command className="rounded-lg border shadow-md">
              <CommandList>
                <CommandEmpty>No se enctraron resultados</CommandEmpty>
                <CommandGroup>
                  {filteredCustomers.map((customer) => (
                    <CommandItem
                      key={customer.customer_document}
                      value={customer.customer_document}
                      onSelect={() => handleSelect(customer)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        <div className="flex flex-col">
                          <span>
                            {customer.customer_first_name} {customer.customer_last_name}
                          </span>
                          <div className="flex text-xs text-muted-foreground">
                            <span className="mr-2">Doc: {customer.customer_document}</span>
                          </div>
                        </div>
                        <div className="ml-auto text-xs text-muted-foreground">{customer.branch.branch_name}</div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </div>
      )}
    </div>
  )
}
