import { useCostumerStore } from "@/app/stores/customerStore"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useMemo, useState } from "react"
import { getColumns } from "./components/columns"
import { type ColumnFiltersState, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
import { Loader2 } from "lucide-react"

export const CostumerTable = () => {
  const { fetchCustomers ,error, sort, setSort, isLoading, displayedCustomers, pageIndex, pageSize } = useCostumerStore()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection] = useState({})

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  const handleSort = (field: string) => {
    if (!sort || sort.field !== field) {
      setSort({ field, direction: "asc" });
    } else if (sort.direction === "asc") {
      setSort({ field, direction: "desc" });
    } else {
      setSort(undefined);
    }
  };

  const columns = useMemo(
    () => getColumns({ onSort: handleSort, sort, isLoading }),
    [sort, isLoading, handleSort]
  )

  const table = useReactTable({
    data: displayedCustomers,
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
    manualSorting: true,
    pageCount: -1,
  })

  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold uppercase">
            Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          {
            error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )
          }
          {/* <CustomerFilter /> */}
          {/* <ProductTableToolbar /> */}

          <div className="rounded border overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  {
                    table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="whitespace-nowrap">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            }
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                  {
                    isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={
                            table.getVisibleLeafColumns().length
                          }
                          className="h-24 text-center">
                          <div className="flex justify-center items-center">
                            <Loader2 className="h-6 w-4 animate-spin mr-2" />
                            Cargando productos ...
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={
                            row.getIsSelected() && "selected"
                          }>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={
                            table.getVisibleLeafColumns().length
                          }
                          className="h-24 text-center">
                          No se encontrarón resultados.
                        </TableCell>
                      </TableRow>
                    )}
                </TableBody>
              </Table>
            </div>
          </div>
          {/* <Pagination /> */}
        </CardContent>
      </Card>
      {/* <CustomerDialog /> */}
      {/* <DeleteAlert /> */}
    </section>
  )
}