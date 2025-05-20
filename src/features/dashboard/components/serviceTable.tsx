import { useEffect, useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { getDaysRemainingColor } from "@/lib/utils";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { customerManagementStore } from "@/app/stores/customerManagementStore";
import { getColumns } from "@/features/dashboard/components/serviceTable/colums";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getTooltipContent } from "@/features/dashboard/components/serviceTable/alertTooltip";

export const ServiceTable = () => {
  const {
    fetchCustomerManagementList,
    fetchCustomerManagementById,
    clearSelectedService,
    selectedService,
    isLoading,
    error,
    customerManagementList
  } = customerManagementStore();

  useEffect(
    () => {
      fetchCustomerManagementList();
    },
    [fetchCustomerManagementList]
  );

  const columns = useMemo(() => getColumns(), [isLoading]);



  const table = useReactTable({
    data: customerManagementList,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: false,
    manualSorting: false,
  })

  const handleSelectService = (id: string) => {
    if (selectedService) {
      clearSelectedService()
    }
    try {
      fetchCustomerManagementById(id)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="rounded border overflow-hidden">
      {
        error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )
      }
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="gap-2">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TooltipProvider key={row.id}>
                  <Tooltip>
                    <TooltipTrigger 
                      asChild 
                      onClick={() => handleSelectService(row.original.id_customer_service)}
                      disabled={row.original.id_customer_service === selectedService.id_customer_service || isLoading}>
                      <TableRow
                        className="cursor-pointer"
                        data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className={`sticky ${cell.column.id === 'actions' ? 'right-0' : ''
                              }`}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TooltipTrigger>
                    <TooltipContent className={`
                        bg-background 
                        text-${getDaysRemainingColor(row.original.days_remaining)} 
                        p-2 border-2`
                    }>
                      {getTooltipContent(row.original.days_remaining)}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getVisibleLeafColumns().length}
                  className="h-24 text-center">
                  No se encontrarón resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  )
};
