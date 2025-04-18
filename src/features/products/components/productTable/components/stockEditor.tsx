// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { LOCATIONS, type LocationName, type Product } from "@/features/products/types/productTypes"
// import { useProductStore } from "@/app/stores/productStore"
// import { Loader2 } from "lucide-react"

// interface StockEditorProps {
//   product: Product
//   onClose?: () => void
// }

// export function StockEditor({ product, onClose }: StockEditorProps) {
//   const { updateStock, isLoading } = useProductStore()

//   // Estado local para los valores de stock
//   const [stockValues, setStockValues] = useState<Record<LocationName, number>>(
//     LOCATIONS.reduce(
//       (acc, location) => {
//         const stockItem = product.stock.find((item) => item.id_branch === location.id)
//         return {
//           ...acc,
//           [location.id]: stockItem ? stockItem.quantity : 0,
//         }
//       },
//       {} as Record<LocationName, number>,
//     ),
//   )

//   const handleStockChange = (location: LocationName, value: string) => {
//     const numValue = Number.parseInt(value, 10) || 0
//     setStockValues((prev) => ({
//       ...prev,
//       [location]: numValue,
//     }))
//   }

//   const handleSave = async () => {
//     try {
//       // Actualizar el stock para cada ubicación
//       for (const location of LOCATIONS) {
//         await updateStock(product.product_id, location.id, stockValues[location.id])
//       }
//       if (onClose) onClose()
//     } catch (error) {
//       console.error("Error al actualizar stock:", error)
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <div className="grid gap-4">
//         {LOCATIONS.map((location) => (
//           <div key={location.id} className="grid grid-cols-2 items-center gap-4">
//             <Label htmlFor={`stock-${location.id}`}>{location.name}</Label>
//             <Input
//               id={`stock-${location.id}`}
//               type="number"
//               min="0"
//               value={stockValues[location.id]}
//               onChange={(e) => handleStockChange(location.id, e.target.value)}
//               disabled={isLoading}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-end space-x-2">
//         {onClose && (
//           <Button variant="outline" onClick={onClose} disabled={isLoading}>
//             Cancelar
//           </Button>
//         )}
//         <Button onClick={handleSave} disabled={isLoading}>
//           {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//           Guardar
//         </Button>
//       </div>
//     </div>
//   )
// }
