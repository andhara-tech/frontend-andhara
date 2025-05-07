import { useProductStore } from "@/app/stores/productStore"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { branchesStatic } from "@/shared/static"
import { Package, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export const PurchaseProductSelector = () => {
  const {
    fetchProducts,
    displayedProducts,
    isLoading,
    error,
    search,
    setSearch
  } = useProductStore()

  const [localSearch, setLocalSearch] = useState(search)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

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

  const getBranchName = (branchId: string): string => {
    const branch = branchesStatic.find((b) => b.id_branch === branchId)
    return branch ? branch.branch_name : branchId
  }



  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={search}
            onChange={handleSearchChange}
            className="pl-8"
            disabled={isLoading}
          />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-600"/>
            Productos disponibles en 
          </h3>
          <div className="border rounded overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-center">Stock</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayedProducts.length > 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-sm text-muted-foreground">
                      {isLoading ? "Cargando..." : "No hay productos disponibles"}
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedProducts.map((product) => (
                    
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}