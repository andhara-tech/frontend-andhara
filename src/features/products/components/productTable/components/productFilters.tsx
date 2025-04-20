import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useProductStore } from "@/app/stores/productStore"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useEffect, useMemo, useRef } from "react"
import { ProductService } from "@/features/products/services/productService"

/**
 * Component for product table filters
 */
export function ProductFilters() {
  const { filters, search, setFilters, clearFilters, setSearch, isLoading, getSupplierName } = useProductStore()
  const [localSearch, setLocalSearch] = useState(search)

  // Referencia para el timeout del debounce
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Get supplier options directly from ProductService
  const supplierOptions = useMemo(() => ProductService.getSupplierFilterOptions(), [])

  // Sync local state with global state when it changes externally
  useEffect(() => {
    // Solo actualizamos el estado local si es diferente al actual
    // Esto evita ciclos infinitos y problemas con el cursor
    if (search !== localSearch) {
      setLocalSearch(search)
    }
  }, [search])

  // Mejorado el manejo del cambio en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    // Actualizamos inmediatamente el estado local para reflejar lo que el usuario está escribiendo
    setLocalSearch(value)

    // Limpiamos cualquier temporizador existente
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Configuramos un nuevo temporizador para actualizar el estado global
    debounceTimerRef.current = setTimeout(() => {
      setSearch(value)
    }, 300) // Reducido a 300ms para una respuesta más rápida pero aún con debounce
  }

  // Limpiamos el temporizador cuando el componente se desmonta
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="space-y-4">
      {/* Search bar and filters */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={localSearch}
            onChange={handleSearchChange}
            className="pl-8"
            disabled={isLoading}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Supplier filter */}
          <Select
            value={filters.id_supplier?.toString() || ""}
            onValueChange={(value) => setFilters({ id_supplier: value === "all" ? null : value })}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proveedores</SelectItem>
              {supplierOptions.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.supplier_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* State filter */}
          <Select
            value={filters.product_state === null ? "all" : filters.product_state ? "active" : "inactive"}
            onValueChange={(value) => {
              if (value === "all") {
                setFilters({ product_state: null })
              } else {
                setFilters({ product_state: value === "active" })
              }
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Estado del producto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los estados</SelectItem>
              <SelectItem value="active">Activos</SelectItem>
              <SelectItem value="inactive">Inactivos</SelectItem>
            </SelectContent>
          </Select>

          {/* Minimum stock filter */}
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Stock mínimo"
              className="w-32"
              value={filters.minStock || ""}
              onChange={(e) => setFilters({ minStock: e.target.value ? Number(e.target.value) : null })}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      {/* Active filters */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value === null) return null

          let label = ""
          if (key === "id_supplier") {
            label = `Proveedor: ${getSupplierName(value as string)}`
          }
          if (key === "discount") label = `Descuento mín: ${value}%`
          if (key === "minStock") label = `Stock mín: ${value}`
          if (key === "product_state") label = `Estado: ${value ? "Activo" : "Inactivo"}`

          return (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => setFilters({ [key]: null })}
                disabled={isLoading}
              >
                ×
              </Button>
            </Badge>
          )
        })}
        {(Object.values(filters).some((v) => v !== null) || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters} disabled={isLoading}>
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
