// import { Product } from "@/features/products/types/productTypes"

import { Button } from "@/components/ui/button"
// import type { Table } from "@tanstack/react-table"
import { Plus } from "lucide-react"
// import { ColumnVisibilityDropdown } from "@/features/products/components/columnVisibilityDropdown"
// import { ColumnVisibilityModal } from "@/features/products/components/columnVisibilitymodal"
// import { useIsMobile } from "@/hooks/use-mobile"
import { useCustumerStore } from "@/app/stores/customerStore"
// import { Customer } from "../types/customerTypes"

// interface ProductTableToolbarProps {
//   table: Table<Customer>
// }

export const ProductTableToolbar = () => {
  const { isLoading, openNewCustomerDialog } = useCustumerStore()
  // const isMobile = useIsMobile()

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {/* {isMobile ? <ColumnVisibilityModal table={table} /> : <ColumnVisibilityDropdown table={table} />}  */}
      </div>
      <div className="flex space-x-2">
        {/* <Button variant="outline" onClick={handleExportToPdf} disabled={true}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button> */}
        <Button onClick={openNewCustomerDialog} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo cliente
        </Button>
      </div>
    </div>
  )
}
