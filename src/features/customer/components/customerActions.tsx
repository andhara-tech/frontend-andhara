import { Row } from "@tanstack/react-table";
import { Customer } from "../types/customerTypes";
import { useCustumerStore } from "@/app/stores/customerStore";

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Power, ShoppingCart, Trash } from "lucide-react"

interface CustomerActionsProps {
  row: Row<Customer>
}

export const CustomerActions = ({row}: CustomerActionsProps) => {
  const customer = row.original
  const {openEditDialog, openDeleteDialog, toggleCustomerState } = useCustumerStore()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openEditDialog(customer)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openEditDialog(customer)}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar venta
        </DropdownMenuItem>
        <DropdownMenuItem 
          disabled={customer.customer_state ? false : true}
          onClick={() => toggleCustomerState(customer.customer_document!)}>
          <Power className="mr-2 h-4 w-4" />
          {customer.customer_state ? "Desactivar" : "Activar"}
        </DropdownMenuItem>
        <DropdownMenuItem disabled onClick={() => openDeleteDialog(customer.customer_document!)} className="text-red-600">
          <Trash className="mr-2 h-4 w-4" />
          Eliminar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}