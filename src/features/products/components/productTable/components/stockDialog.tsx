// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { StockDisplay } from "@/features/products/components/productTable/components/stockDisplay"
// // import { StockEditor } from "@/features/products/components/productTable/components/stockEditor"
// import type { Product } from "@/features/products/types/productTypes"

// interface StockDialogProps {
//   product: Product | null
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function StockDialog({ product, open, onOpenChange }: StockDialogProps) {
//   if (!product) return null

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Gestión de Stock</DialogTitle>
//           <DialogDescription>{product.product_name} - Ver y actualizar el stock por sede</DialogDescription>
//         </DialogHeader>

//         <Tabs defaultValue="view">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="view">Ver Stock</TabsTrigger>
//             <TabsTrigger value="edit">Editar Stock</TabsTrigger>
//           </TabsList>
//           <TabsContent value="view" className="pt-4">
//             <StockDisplay product={product} />
//           </TabsContent>
//           {/* <TabsContent value="edit" className="pt-4">
//             <StockEditor product={product} onClose={() => onOpenChange(false)} />
//           </TabsContent> */}
//         </Tabs>
//       </DialogContent>
//     </Dialog>
//   )
// }
