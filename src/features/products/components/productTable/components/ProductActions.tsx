import type { Row } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Power, Trash } from "lucide-react"
import type { Product } from "@/features/products/types/productTypes"
import { useProductStore } from "@/app/stores/productStore"

interface ProductActionsProps {
  row: Row<Product>
}

/**
 * Componente para las acciones de un producto (editar, activar/desactivar, eliminar)
 */
export function ProductActions({ row }: ProductActionsProps) {
  const product = row.original
  const { openEditDialog, openDeleteDialog, toggleProductState } = useProductStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openEditDialog(product)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={product.product_state ? false : true}
          onClick={() => toggleProductState(product.id_product!)}>
          <Power className="mr-2 h-4 w-4" />
          {product.product_state ? "Desactivar" : "Activar"}
        </DropdownMenuItem>
        <DropdownMenuItem disabled onClick={() => openDeleteDialog(product.id_product!)} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
