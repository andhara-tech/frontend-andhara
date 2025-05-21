import { Row } from "@tanstack/react-table";
import { customerManagementStore } from "@/app/stores/customerManagementStore";
import { CustomerService } from "@/features/dashboard/types/purchaseTypes";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Eye } from "lucide-react";

interface ServiceActionsProps {
  row: Row<CustomerService>
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    toast.success('ID copiado al portapapeles');
  }).catch(() => {
    toast.error('Error al copiar el ID');
  });
};

export const ServiceActions = ({row}: ServiceActionsProps) => {
  const { 
    fetchCustomerManagementById, 
    clearSelectedService, 
    selectedService  
  } = customerManagementStore();

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => copyToClipboard(row.original.id_customer_service)}>
          <Copy className="mr-2 h-4 w-4" />
          Copiar ID
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelectService(row.original.id_customer_service)}>
          <Eye className="mr-2 h-4 w-4" />
          Ver
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
