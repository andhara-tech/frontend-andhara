import { Badge } from "@/components/ui/badge"
import { LOCATIONS, type Product } from "@/features/products/types/productTypes"

interface StockDisplayProps {
  product: Product
  compact?: boolean
}

export function StockDisplay({ product, compact = false }: StockDisplayProps) {
  if (compact) {
    // Versión compacta para mostrar en la tabla
    const totalStock = product.stock.reduce((sum, item) => sum + item.quantity, 0)
    return (
      <div className="flex flex-col">
        <span className="font-medium">Total: {totalStock}</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {product.stock.map((stockItem) => {
            const location = LOCATIONS.find((loc) => loc.id === stockItem.location)
            return (
              <Badge key={stockItem.location} variant="outline" className="text-xs">
                {location?.name.substring(0, 3)}: {stockItem.quantity}
              </Badge>
            )
          })}
        </div>
      </div>
    )
  }

  // Versión completa para mostrar en detalles
  return (
    <div className="space-y-2">
      {LOCATIONS.map((location) => {
        const stockItem = product.stock.find((item) => item.location === location.id)
        const quantity = stockItem ? stockItem.quantity : 0

        return (
          <div key={location.id} className="flex justify-between items-center">
            <span>{location.name}</span>
            <Badge variant={quantity > 50 ? "default" : quantity > 20 ? "secondary" : "destructive"}>{quantity}</Badge>
          </div>
        )
      })}
      <div className="flex justify-between items-center pt-1 border-t">
        <span className="font-medium">Total</span>
        <Badge variant="outline" className="font-medium">
          {product.stock.reduce((sum, item) => sum + item.quantity, 0)}
        </Badge>
      </div>
    </div>
  )
}
