import { Row } from "@tanstack/react-table";
import { Customer } from "../types/customerTypes";
import { useCustumerStore } from "@/app/stores/customerStore";
import { formaterDate } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, ExternalLink, MoreHorizontal, Power, ShoppingCart, Trash } from "lucide-react"
import { usePurchaseStore } from "@/app/stores/purchaseStore";

interface CustomerActionsProps {
  row: Row<Customer>
}

export const CustomerActions = ({row}: CustomerActionsProps) => {
  const customer = row.original
  const {openEditDialog, openDeleteDialog, toggleCustomerState, setSelectedCustomer } = useCustumerStore()
  const {setIsOpenModal} = usePurchaseStore()

  const handleToggleCustomerState = async (document: string) => {
    try {
      await toggleCustomerState(document)
      toast.success(`Cliente ${customer.customer_state ? "desactivado" : "activado"} correctamente`)
    }catch (error) {
      console.error("Error toggling customer state:", error)
      toast.error("Error al cambiar el estado del cliente")
    }
  }

  const handleNewPurchaseWithCustomer = async () => {
    try {
      setSelectedCustomer(customer)
      setIsOpenModal(true)
    } catch (error) {
      console.error("Error opening purchase modal:", error)
      toast.error("Error al abrir el modal de compra")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menú</span>
          <MoreHorizontal className="h-4 w-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
        onClick={() => openEditDialog(customer)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNewPurchaseWithCustomer()}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar venta
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleToggleCustomerState(customer.customer_document!)}>
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

export const CustomerDataAction = ({row}: CustomerActionsProps) => {
  const customer = row.original
  const { openSheet} = useCustumerStore()


  return (
    <Button
    variant="link"
    className="cursor-pointer"
    onClick={() => openSheet(customer)}
  >
    {customer.last_purchase?.purchase_date
      ? formaterDate(customer.last_purchase?.purchase_date)
      : "No registrado"}
    <ExternalLink className="h-4 w-4 ml-1" />
  </Button>
  )
}