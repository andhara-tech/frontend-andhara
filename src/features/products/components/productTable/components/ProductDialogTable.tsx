import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Product } from "@/features/products/types/productTypes";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { supplierStatic } from "@/shared/static";
import {
   productsSchema,
   type ProductFormValues,
} from "@/features/products/schema/productsShema";
import { useProductStore } from "@/app/stores/productStore";
import { Loader2 } from "lucide-react";
import { LOCATIONS } from "@/features/products/types/productTypes";

interface ProductDialogProps {
   product: Product | null;
   open: boolean;
   onOpenChange: (open: boolean) => void;
}

export function ProductDialog({
   product,
   open,
   onOpenChange,
}: ProductDialogProps) {
   const { createProduct, updateProduct, isLoading } = useProductStore();

   // Definir el formulario con validación de Zod
   const form = useForm<ProductFormValues>({
      resolver: zodResolver(productsSchema),
      defaultValues: {
         product_name: "",
         product_description: "",
         purchase_price: "",
         product_discount: "",
         sale_price: "",
         vat: "",
         id_supplier: "",
         stock: LOCATIONS.map((loc) => ({ location: loc.id, quantity: 0 })),
      },
   });

   // Actualizar valores del formulario cuando cambia el producto
   useEffect(() => {
      if (product) {
         // Preparar los valores de stock para cada ubicación
         const stockValues = LOCATIONS.map((location) => {
            const stockItem = product.stock.find(
               (item) => item.id_branch === location.id
            );
            return {
               location: location.id,
               quantity: stockItem ? stockItem.quantity : 0,
            };
         });

         form.reset({
            id_product: product.id_product || "0",
            product_name: product.product_name,
            product_description: product.product_description,
            purchase_price: product.purchase_price.toString(),
            product_discount: product.product_discount.toString(),
            sale_price: product.sale_price?.toString() || "0",
            profit_margin: product.profit_margin || 0,
            vat: product.vat?.toString() || "0",
            id_supplier: product.id_supplier || "",
            stock: stockValues,
         });
      } else {
         form.reset({
            product_name: "",
            product_description: "",
            purchase_price: "0",
            product_discount: "0",
            sale_price: "0",
            vat: "4",
            id_supplier: "",
            stock: LOCATIONS.map((loc) => ({ location: loc.id, quantity: 0 })),
         });
      }
   }, [product, form, open]);

   // Manejar el envío del formulario
   const onSubmit = async (data: ProductFormValues) => {
      try {
         // Calcular el margen de beneficio si no está presente
         const purchasePrice = Number(data.purchase_price);
         const salePrice = Number(data.sale_price);
         const profitMargin =
            data.profit_margin ||
            ((salePrice - purchasePrice) / salePrice) * 100;
         // Preparar los datos de stock
         const stock = data.stock.map((item) => ({
            id_branch: item.id_branch,
            quantity: item.quantity,
         }));

         if (product) {
            // Actualizar producto existente
            await updateProduct({
               id_product: product.id_product,
               product_name: data.product_name,
               product_description: data.product_description,
               purchase_price: Number(data.purchase_price),
               product_discount: Number(data.product_discount),
               sale_price: Number(data.sale_price),
               profit_margin: Number(profitMargin.toFixed(2)),
               vat: Number(data.vat),
               id_supplier: data.id_supplier,
               stock,
            });
         } else {
            // Crear nuevo producto
            await createProduct({
               product_name: data.product_name,
               product_description: data.product_description,
               purchase_price: Number(data.purchase_price),
               product_discount: Number(data.product_discount),
               sale_price: Number(data.sale_price),
               profit_margin: Number(profitMargin.toFixed(2)),
               vat: Number(data.vat),
               id_supplier: data.id_supplier,
               stock,
            });
         }

         onOpenChange(false);
      } catch (error) {
         console.error("Error al guardar el producto:", error);
      }
      // console.log("Datos del formulario:", data)
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
               <DialogTitle>
                  {product ? "Editar Producto" : "Nuevo Producto"}
               </DialogTitle>
               <DialogDescription>
                  {product
                     ? "Actualice los detalles del producto. Haga clic en guardar cuando termine."
                     : "Ingrese los detalles del nuevo producto. Haga clic en guardar cuando termine."}
               </DialogDescription>
            </DialogHeader>

            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4">
                  {product && (
                     <FormField
                        control={form.control}
                        name="id_product"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>ID</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    disabled
                                    value={product.id_product}
                                 />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  )}

                  <div className="grid md:grid-cols-2 grid-rows-1 gap-2">
                     <FormField
                        control={form.control}
                        name="product_name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Nombre</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="product_description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Descripción</FormLabel>
                              <FormControl>
                                 <Input {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="id_supplier"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Proveedor</FormLabel>
                              <Select
                                 onValueChange={(value) =>
                                    field.onChange(value)
                                 }
                                 defaultValue={field.value?.toString()}
                                 value={field.value?.toString()}>
                                 <FormControl>
                                    <SelectTrigger className="w-full">
                                       <SelectValue placeholder="Seleccione un proveedor" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {supplierStatic.map((supplier) => (
                                       <SelectItem
                                          key={supplier.id}
                                          value={supplier.id.toString()}>
                                          {supplier.supplier_name}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="purchase_price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Precio Compra</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="grid grid-cols-3 grid-rows-1 gap-2">
                     <FormField
                        control={form.control}
                        name="sale_price"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Precio Venta</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="product_discount"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Descuento (%)</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="vat"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>IVA (%)</FormLabel>
                              <FormControl>
                                 <Input
                                    {...field}
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="100"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <h3 className="font-medium text-sm">Stock</h3>
                  <div className="grid grid-cols-3 grid-rows-1 gap-2">
                     {LOCATIONS.map((location, index) => (
                        <FormField
                           key={location.id}
                           control={form.control}
                           name={`stock.${index}.quantity`}
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>{location.name}</FormLabel>
                                 <FormControl>
                                    <Input {...field} type="number" min="0" />
                                 </FormControl>
                                 <FormMessage />
                                 <input
                                    type="hidden"
                                    {...form.register(
                                       `stock.${index}.id_branch`
                                    )}
                                    value={location.id}
                                 />
                              </FormItem>
                           )}
                        />
                     ))}
                  </div>

                  <DialogFooter>
                     <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Guardar cambios
                     </Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
}
