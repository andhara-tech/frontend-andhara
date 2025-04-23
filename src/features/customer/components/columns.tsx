import { formaterDate, SortOption } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Customer } from "../types/customerTypes"
import { Button } from "@/components/ui/button"

interface ColumnOptions {
  onSort: (field: string) => void
  sort?: SortOption
  isLoading: boolean
}

export const getColumns = ({ onSort, sort, isLoading }: ColumnOptions): ColumnDef<Customer>[] => {
  const handleSort = (field: string) => {
    if (isLoading) return
    onSort(field)
  }

  const getSortIcon = (field: string) => {
    if (!sort || sort.field !== field) {
      return <ArrowUpDown className="ml-2 h-4 w-4" />
    }

    return (
      <ArrowUpDown
        className={`ml-2 h-4 w-4 ${sort.direction === "asc" ? "text-primary" : "text-primary rotate-180"}`}
      />
    )
  }

  return [
    {
      accessorKey: "branch.branch_name",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("branch.branch_name")} disabled={isLoading}>
          Sucursal
          {getSortIcon("branch.branch_name")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("branch.branch_name")}
        </div>
      ),
    },
    {
      accessorKey: "last_purchase.purchase_date",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("last_purchase.purchase_date")} disabled={isLoading}>
          Última compra
          {getSortIcon("last_purchase.purchase_date")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {formaterDate(row.getValue("last_purchase.purchase_date"))}
        </div>
      ),
    },
    {
      accessorKey: "customer_first_name",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("customer_first_name")} disabled={isLoading}>
          Nombre
          {getSortIcon("customer_first_name")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("customer_first_name")}
        </div>
      ),
    },
    {
      accessorKey: "customer_last_name",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("customer_last_name")} disabled={isLoading}>
          Apellido
          {getSortIcon("customer_last_name")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("customer_last_name")}
        </div>
      ),
    },
    {
      accessorKey: "document_type",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("document_type")} disabled={isLoading}>
          Tipo de documento
          {getSortIcon("document_type")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("document_type")}
        </div>
      ),
    },
    {
      accessorKey: "customer_document",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("customer_document")} disabled={isLoading}>
          Documento
          {getSortIcon("customer_document")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("customer_document")}
        </div>
      ),
    },
    {
      accessorKey: "phone_number",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("phone_number")} disabled={isLoading}>
          Teléfono
          {getSortIcon("phone_number")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("phone_number")}
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("email")} disabled={isLoading}>
          Correo
          {getSortIcon("email")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("email")}
        </div>
      ),
    },
    {
      accessorKey: "home_address",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("home_address")} disabled={isLoading}>
          Dirección
          {getSortIcon("home_address")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("home_address")}
        </div>
      ),
    },
    {
      accessorKey: "branch.city_name",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("branch.city_name")} disabled={isLoading}>
          Ciudad
          {getSortIcon("branch.city_name")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("branch.city_name")}
        </div>
      ),
    },
    {
      accessorKey: "branch.department_name",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("branch.department_name")} disabled={isLoading}>
          Departamento
          {getSortIcon("branch.department_name")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("branch.department_name")}
        </div>
      ),
    },
    {
      accessorKey: "last_purchase.total_purchase",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("last_purchase.total_purchase")} disabled={isLoading}>
          Total compra
          {getSortIcon("last_purchase.total_purchase")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("last_purchase.total_purchase")}
        </div>
      ),
    },
    {
      accessorKey: "last_purchase.next_purchase_date",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("last_purchase.next_purchase_date")} disabled={isLoading}>
          Próxima compra
          {getSortIcon("last_purchase.next_purchase_date")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {formaterDate(row.getValue("last_purchase.next_purchase_date"))}
        </div>
      ),
    },
    {
      accessorKey: "customer_state",
      header: () => (
        <Button variant="ghost" onClick={() => handleSort("customer_state")} disabled={isLoading}>
          Estado
          {getSortIcon("customer_state")}
        </Button>
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("customer_state") ? "Activo" : "Inactivo"}
        </div>
      ),    
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => console.log("Edit", row.original)}>
            Editar
          </Button>
          <Button variant="destructive" size="sm" onClick={() => console.log("Delete", row.original)}>
            Eliminar
          </Button>
        </div>
      ),
    }
  ]
}

 