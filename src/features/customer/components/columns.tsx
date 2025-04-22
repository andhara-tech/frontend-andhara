import { SortOption } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Customer } from "../types/customerTypes"

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
      accessorKey: "customer_document",
      header: "ID",
      cell: ({ row }) => (
        <div className="text-center max-w-[100px] truncate" title={row.getValue("customer_document")}>
          {(row.getValue("customer_document") as string).substring(0, 8)}...
        </div>
      ),
    }
  ]
}
