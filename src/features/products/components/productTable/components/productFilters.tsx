import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useProductStore } from "@/app/stores/productStore"
import { supplierStatic } from "@/shared/static"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LocationName, LOCATIONS} from "@/features/products/types/productTypes"

export function ProductFilters() {
  const { filters, search, setFilters, clearFilters, setSearch } = useProductStore()

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda y filtros */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Filtro de proveedor */}
          <Select
            value={filters.id_supplier?.toString() || ""}
            onValueChange={(value) => setFilters({ id_supplier: value ? value : null })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por proveedor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los proveedores</SelectItem>
              {supplierStatic.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id.toString()}>
                  {supplier.supplier_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro de sede */}
          <Select value={filters.location || ""} onValueChange={(value) => setFilters({ location: value === "all" ? null : value as LocationName })}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por sede" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las sedes</SelectItem>
              {LOCATIONS.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro de stock mínimo */}
          {filters.location && (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Stock mínimo"
                className="w-32"
                value={filters.minStock || ""}
                onChange={(e) => setFilters({ minStock: e.target.value ? Number(e.target.value) : null })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Filtros activos */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value === null) return null

          let label = ""
          if (key === "id_supplier") {
            const supplier = supplierStatic.find((s) => s.id === value)
            label = `Proveedor: ${supplier ? supplier.id : value}`
          }
          if (key === "discount") label = `Descuento mín: ${value}%`
          if (key === "location") {
            const location = LOCATIONS.find((loc) => loc.id === value)
            label = `Sede: ${location ? location.name : value}`
          }
          if (key === "minStock") label = `Stock mín: ${value}`

          return (
            <Badge key={key} variant="secondary" className="flex items-center gap-1">
              {label}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => setFilters({ [key]: null })}
              >
                ×
              </Button>
            </Badge>
          )
        })}
        {(Object.values(filters).some((v) => v !== null) || search) && (
          <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={clearFilters}>
            Limpiar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
