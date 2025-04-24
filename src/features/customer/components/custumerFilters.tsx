import { useCustumerStore } from "@/app/stores/customerStore"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductService } from "@/features/products/services/productService"
import { branchesStatic } from "@/shared/static" 
import { Search } from "lucide-react"
import React, { useEffect, useMemo, useRef, useState } from "react"

export const CustomersFilters = () => {
  const { filters, search, setFilters, clearFilters, setSearch, isLoading } = useCustumerStore()
  const [localSearch, setLocalSearch] = useState(search)

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (search !== localSearch) {
      setLocalSearch(search)
    }
  }, [search])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    setLocalSearch(value)

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    debounceTimerRef.current = setTimeout(() => {
      setSearch(value)
    }, 300)
  }

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar clientes..."
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-8"
            disabled={isLoading}
          />
        </div>
        <div className="felx flex-wrap gap-2">
          <Select
            value={filters.branch?.branch_name || "all"}
            onValueChange={(value) => {
              if (value === "all") {
                setFilters({ branch: null })
              } else {
                const selectedBranch = branchesStatic.find(branch => branch.branch_name === value);
                setFilters({ branch: selectedBranch ?? null })
              }
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Selecciona una sede" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las sedes</SelectItem>
              {branchesStatic.map(branch => (
                <SelectItem key={branch.id_branch} value={branch.branch_name}>
                  {branch.branch_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

