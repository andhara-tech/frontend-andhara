"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/features/products/types/productTypes"
import { formatCurrency, formatPercent } from "@/lib/format"
import { ProductActions } from "@/features/products/components/productTable/components/ProductActions"
// import { StockDisplay } from "@/features/products/components/productTable/components/stockDisplay"
import { supplierStatic } from "@/shared/static"

interface ColumnOptions {
  onEdit: (product: Product) => void
  onDelete: (productId: string) => void
  onManageStock: (product: Product) => void
}

export const getColumns = ({ onEdit, onDelete }: ColumnOptions): ColumnDef<Product>[] => [
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("product_name")}</div>,
  },
  {
    accessorKey: "product_description",
    header: "Descripción",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("product_description")}</div>,
  },
  {
    accessorKey: "id_supplier",
    header: "Proveedor",
    cell: ({ row }) => {
      const supplierId = row.getValue("id_supplier") as string
      const supplier = supplierStatic.find((s) => s.id === (supplierId))
      return <div>{supplier ? supplier.supplier_name : supplierId}</div>
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "purchase_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Precio Compra
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("purchase_price"))
      return <div className="text-left">{formatCurrency(amount)}</div>
    },
  },
  {
    accessorKey: "product_discount",
    header: "Descuento",
    cell: ({ row }) => {
      const discount = Number.parseFloat(row.getValue("product_discount"))
      return <div className="text-left">{formatPercent(discount)}</div>
    },
  },
  {
    accessorKey: "sale_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="whitespace-nowrap"
        >
          Precio Venta
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("sale_price"))
      return <div className="text-left">{formatCurrency(amount)}</div>
    },
  },
  {
    accessorKey: "profit_margin",
    header: "Margen",
    cell: ({ row }) => {
      const margin = Number.parseFloat(row.getValue("profit_margin"))
      return <div className="text-left">{formatPercent(margin)}</div>
    },
  },
  // {
  //   accessorKey: "stock",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         className="whitespace-nowrap"
  //       >
  //         Stock
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   // cell: ({ row }) => {
  //   //   return <StockDisplay product={row.original} compact />
  //   // },
  //   sortingFn: (rowA, rowB) => {
  //     const stockA = rowA.original.stock.reduce((sum, item) => sum + item.quantity, 0)
  //     const stockB = rowB.original.stock.reduce((sum, item) => sum + item.quantity, 0)
  //     return stockA - stockB
  //   },
  // },
  // {
  //   id: "stock-actions",
  //   cell: ({ row }) => (
  //     <Button variant="ghost" size="icon" onClick={() => onManageStock(row.original)}>
  //       <Boxes className="h-4 w-4" />
  //     </Button>
  //   ),
  // },
  {
    id: "actions",
    cell: ({ row }) => <ProductActions row={row} onEdit={onEdit} onDelete={onDelete} />,
  },
]
