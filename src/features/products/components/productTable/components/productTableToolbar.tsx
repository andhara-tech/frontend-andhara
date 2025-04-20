import { Button } from "@/components/ui/button"
import type { Table } from "@tanstack/react-table"
import { FileDown, Plus } from "lucide-react"
import { exportToPdf } from "@/lib/pdfExportProducts"
import { useProductStore } from "@/app/stores/productStore" 
import { ColumnVisibilityDropdown } from "@/features/products/components/productTable/components/columnVisibilityDropdown"
import { ColumnVisibilityModal } from "@/features/products/components/productTable/components/columnVisibilitymodal"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Product } from "@/features/products/types/productTypes"

interface ProductTableToolbarProps {
  table: Table<Product>
}

/**
 * Toolbar for the product table
 */
export function ProductTableToolbar({ table }: ProductTableToolbarProps) {
  const { filteredProducts, isLoading, openNewProductDialog } = useProductStore()
  const isMobile = useMediaQuery("(max-width: 768px)")

  /**
   * Handle PDF export
   */
  const handleExportToPdf = () => {
    try {
      // Export filtered products
      exportToPdf(filteredProducts)
    } catch (error) {
      console.error("Error exporting to PDF:", error)
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
      <div className="flex flex-1 items-center space-x-2">
        {isMobile ? <ColumnVisibilityModal table={table} /> : <ColumnVisibilityDropdown table={table} />}
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={handleExportToPdf} disabled={isLoading}>
          <FileDown className="mr-2 h-4 w-4" />
          Exportar PDF
        </Button>
        <Button onClick={openNewProductDialog} disabled={isLoading}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>
    </div>
  )
}
