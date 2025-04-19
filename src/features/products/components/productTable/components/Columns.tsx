import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, XCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/features/products/types/productTypes";
import { formatCurrency, formatPercent } from "@/lib/format";
import { ProductActions } from "@/features/products/components/productTable/components/ProductActions";
// import { StockDisplay } from "@/features/products/components/productTable/components/stockDisplay"
import { supplierStatic } from "@/shared/static";
import { SortOption } from "@/features/products/services/productService";
import { Badge } from "@/components/ui/badge";

interface ColumnOptions {
   onEdit: (product: Product) => void;
   onDelete: (productId: string) => void;
   onToggleState: (productId: string) => void;
   onSort: (field: string) => void;
   sort?: SortOption;
   isLoading: boolean;
}

const handleSort = (
   field: string,
   isLoading: boolean,
   onSort: (field: string) => void
) => {
   if (isLoading) return;
   onSort(field);
};

const getSortIcon = (field: string) => {
   if (field === "product_state") return null;
   return <ArrowUpDown className="ml-2 h-4 w-4" />;
};

export const getColumns = ({
   onEdit,
   onDelete,
  //  onToggleState,
   onSort,
  //  sort,
   isLoading,
}: ColumnOptions): ColumnDef<Product>[] => [
   {
      accessorKey: "product_name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }>
               Producto
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => <div>{row.getValue("product_name")}</div>,
   },
   {
      accessorKey: "product_description",
      header: "Descripción",
      cell: ({ row }) => (
         <div className="max-w-[200px] truncate">
            {row.getValue("product_description")}
         </div>
      ),
   },
   {
      accessorKey: "id_supplier",
      header: "Proveedor",
      cell: ({ row }) => {
         const supplierId = row.getValue("id_supplier") as string;
         const supplier = supplierStatic.find((s) => s.id === supplierId);
         return <div>{supplier ? supplier.supplier_name : supplierId}</div>;
      },
      filterFn: (row, id, value) => {
         return value.includes(row.getValue(id));
      },
   },
   {
      accessorKey: "purchase_price",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
               className="whitespace-nowrap">
               Precio Compra
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => {
         const amount = Number.parseFloat(row.getValue("purchase_price"));
         return <div className="text-left">{formatCurrency(amount)}</div>;
      },
   },
   {
      accessorKey: "product_discount",
      header: "Descuento",
      cell: ({ row }) => {
         const discount = Number.parseFloat(row.getValue("product_discount"));
         return <div className="text-left">{formatPercent(discount)}</div>;
      },
   },
   {
      accessorKey: "sale_price",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() =>
                  column.toggleSorting(column.getIsSorted() === "asc")
               }
               className="whitespace-nowrap">
               Precio Venta
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         );
      },
      cell: ({ row }) => {
         const amount = Number.parseFloat(row.getValue("sale_price"));
         return <div className="text-left">{formatCurrency(amount)}</div>;
      },
   },
   {
      accessorKey: "profit_margin",
      header: "Margen",
      cell: ({ row }) => {
         const margin = Number.parseFloat(row.getValue("profit_margin"));
         return <div className="text-left">{formatPercent(margin)}</div>;
      },
   },
   {
      accessorKey: "product_state",
      header: () => (
         <Button
            variant="ghost"
            onClick={() => handleSort("product_state", isLoading, onSort)}
            disabled={isLoading}>
            Estado
            {getSortIcon("product_state")}
         </Button>
      ),
      cell: ({ row }) => {
         const state = row.getValue("product_state") as boolean;
         return (
            <div className="flex justify-center">
               {state ? (
                  <Badge variant={"success"} className="gap-1">
                     <CheckCircle className="h-3 w-3" />
                     Activo
                  </Badge>
               ) : (
                  <Badge variant="destructive" className="gap-1">
                     <XCircle className="h-3 w-3" />
                     Inactivo
                  </Badge>
               )}
            </div>
         );
      },
   },
   {
      id: "actions",
      cell: ({ row }) => (
         <ProductActions row={row} onEdit={onEdit} onDelete={onDelete} />
      ),
   },
];
