import { useEffect, useState, useMemo, useCallback } from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Loader2 } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

import type { Product } from "@/features/products/types/productTypes"
import { getColumns } from "@/features/products/components/productTable/components/Columns"
import { ProductDialog } from "@/features/products/components/productTable/components/ProductDialogTable"
import { Pagination } from "@/features/products/components/productTable/components/Pagination"
import { ProductFilters } from "@/features/products/components/productTable/components/productFilters"
import { ProductTableToolbar } from "@/features/products/components/productTable/components/productTableToolbar"
import { DeleteAlert } from "@/features/products/components/productTable/components/deleteAlert"
import { StockDialog } from "@/features/products/components/productTable/components/stockDialog"
import { useProductStore } from "@/app/stores/productStore"

export default function ProductTable() {
  // Estado local para diálogos
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [newProductDialogOpen, setNewProductDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [stockDialogOpen, setStockDialogOpen] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null)
  const [productToManageStock, setProductToManageStock] = useState<Product | null>(null)

  // Estado global con Zustand
  const { fetchProducts, filteredProducts, isLoading, error, pageIndex, pageSize, setPageIndex } = useProductStore()

  // Estado para la tabla
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Manejadores para acciones de productos
  const handleEditProduct = useCallback((product: Product) => {
    setProductToEdit(product)
    setEditDialogOpen(true)
  }, [])

  const handleNewProduct = useCallback(() => {
    setNewProductDialogOpen(true)
  }, [])

  const handleDeleteProduct = useCallback((productId: number) => {
    setProductIdToDelete(productId)
    setDeleteDialogOpen(true)
  }, [])

  const handleManageStock = useCallback((product: Product) => {
    setProductToManageStock(product)
    setStockDialogOpen(true)
  }, [])

  // Definición de columnas con manejadores de acciones
  const columns = useMemo(
    () =>
      getColumns({
        onEdit: handleEditProduct,
        onDelete: handleDeleteProduct,
        onManageStock: handleManageStock,
      }),
    [handleEditProduct, handleDeleteProduct, handleManageStock],
  )

  // Configuración de la tabla
  const table = useReactTable({
    data: filteredProducts,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(filteredProducts.length / pageSize),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize })
        setPageIndex(newState.pageIndex)
      }
    },
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Productos Farmacéuticos</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <ProductFilters />
          <ProductTableToolbar table={table} onNewProduct={handleNewProduct} />

          {/* Tabla */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      <div className="flex justify-center items-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        Cargando productos...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <Pagination totalItems={filteredProducts.length} />
        </CardContent>
      </Card>

      {/* Diálogo de edición */}
      <ProductDialog product={productToEdit} open={editDialogOpen} onOpenChange={setEditDialogOpen} />

      {/* Diálogo de nuevo producto */}
      <ProductDialog product={null} open={newProductDialogOpen} onOpenChange={setNewProductDialogOpen} />

      {/* Diálogo de gestión de stock */}
      <StockDialog product={productToManageStock} open={stockDialogOpen} onOpenChange={setStockDialogOpen} />

      {/* Diálogo de confirmación para eliminar */}
      <DeleteAlert open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} productId={productIdToDelete} />
    </div>
  )
}
