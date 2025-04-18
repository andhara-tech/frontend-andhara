import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Table } from "@tanstack/react-table";
import { FileDown, Plus } from "lucide-react";
import { exportToPdf } from "@/lib/pdfExportProducts";
import { useProductStore } from "@/app/stores/productStore";

interface ProductTableToolbarProps<TData> {
   table: Table<TData>;
   onNewProduct: () => void;
}

export function ProductTableToolbar<TData>({
   table,
   onNewProduct,
}: ProductTableToolbarProps<TData>) {
   const { filteredProducts } = useProductStore();

   const handleExportToPdf = () => {
      exportToPdf(filteredProducts);
   };

   return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-4">
         <div className="flex flex-1 items-center space-x-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                     Columnas
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="end">
                  {table
                     .getAllColumns()
                     .filter((column) => column.getCanHide())
                     .map((column) => {
                        return (
                           <DropdownMenuCheckboxItem
                              key={column.id}
                              className="capitalize"
                              checked={column.getIsVisible()}
                              onCheckedChange={(value) =>
                                 column.toggleVisibility(!!value)
                              }>
                              {column.id === "product_name"
                                 ? "Producto"
                                 : column.id === "product_description"
                                 ? "Descripción"
                                 : column.id === "id_supplier"
                                 ? "Proveedor"
                                 : column.id === "purchase_price"
                                 ? "Precio Compra"
                                 : column.id === "product_discount"
                                 ? "Descuento"
                                 : column.id === "sale_price"
                                 ? "Precio Venta"
                                 : column.id === "profit_margin"
                                 ? "Margen"
                                 : column.id === "vat"
                                 ? "IVA"
                                 : column.id}
                           </DropdownMenuCheckboxItem>
                        );
                     })}
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
         <div className="flex space-x-2">
            <Button variant="outline" onClick={handleExportToPdf}>
               <FileDown className="mr-2 h-4 w-4" />
               Exportar PDF
            </Button>
            <Button onClick={onNewProduct}>
               <Plus className="mr-2 h-4 w-4" />
               Nuevo Producto
            </Button>
         </div>
      </div>
   );
}
