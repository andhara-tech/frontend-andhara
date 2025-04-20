import { useEffect, useMemo, useState } from "react"
import { type ColumnFiltersState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Loader2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getColumns } from "@/features/products/components/productTable/components/Columns"
import { ProductDialog } from "@/features/products/components/productTable/components/ProductDialogTable"
import { Pagination } from "@/features/products/components/productTable/components/Pagination"
import { ProductFilters } from "@/features/products/components/productTable/components/productFilters"
import { ProductTableToolbar } from "@/features/products/components/productTable/components/productTableToolbar"
import { DeleteAlert } from "@/features/products/components/productTable/components/deleteAlert"
import { useProductStore } from "@/app/stores/productStore"

/**
 * Main component for the product table
 */
export default function ProductTable() {
  // Global state with Zustand
  const {
    fetchProducts,
    displayedProducts,
    isLoading,
    error,
    pageIndex,
    pageSize,
    sort,
    setSort,
  } = useProductStore()

  // Table state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection] = useState({})

  // Load products when component mounts
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Handler for sorting
  const handleSort = (field: string) => {
    if (!sort || sort.field !== field) {
      setSort({ field, direction: "asc" })
    } else if (sort.direction === "asc") {
      setSort({ field, direction: "desc" })
    } else {
      setSort(undefined)
    }
  }

  // Column definition with action handlers
  const columns = useMemo(() => getColumns({ onSort: handleSort, sort, isLoading }), [sort, isLoading, handleSort])

  // Table configuration
  const table = useReactTable({
    data: displayedProducts,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnFilters,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    manualSorting: true, // Indicate that sorting is manual
    pageCount: -1, // We don't need this as we handle pagination in the store
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold uppercase">Productos</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <ProductFilters />
          <ProductTableToolbar table={table} />

          {/* Table */}
          <div className="rounded-md border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      ))}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                        <div className="flex justify-center items-center">
                          <Loader2 className="h-6 w-4 animate-spin mr-2" />
                          Cargando productos...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">
                        No se encontraron resultados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination />
        </CardContent>
      </Card>

      {/* Edit dialog */}
      <ProductDialog />

      {/* Delete confirmation dialog */}
      <DeleteAlert />
    </div>
  )
}
