import { customerManagementStore } from "@/app/stores/customerManagementStore";
import { useEffect, useMemo } from "react";
import { getColumns } from "./serviceTable/colums";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { getDaysRemainingColor } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertCircle, AlertTriangle, XCircle } from "lucide-react";

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

  const getTooltipContent = (days: number) => {
    const isNegative = days < 0;
    const isUrgent = days >= 0 && days < 10;

    if (isNegative) {
      return (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4" />
          <span className="font-medium text-destructive">¡CRÍTICO!</span>
          <p className="text-sm text-destructive">El cliente se ha pasado del plazo en {-days} días</p>
        </div>
      );
    }

    if (isUrgent) {
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="font-medium">¡Urgente!</span>
          <p className="text-sm">El cliente necesita ser contactado en {days} días</p>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4" />
        <span className="font-medium">Pendiente</span>
        <p className="text-sm">El cliente necesita ser contactado en {days} días</p>
      </div>
    );
  };

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
