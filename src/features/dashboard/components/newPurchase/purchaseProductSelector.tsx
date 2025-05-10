import { useCustumerStore } from "@/app/stores/customerStore"
import { useProductStore } from "@/app/stores/productStore"
import { usePurchaseStore } from "@/app/stores/purchaseStore"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { Package } from "lucide-react"
import { useEffect } from "react"

export const PurchaseFormProducts = () => {
  const { selectedCustomer } = useCustumerStore()
  const { fetchProducts, allProducts, isLoading } = useProductStore()
  const { setSelectedProducts } = usePurchaseStore()

  const selectedBranch = selectedCustomer?.branch.id_branch

  const getStockByBranch = (product: { stock: { id_branch: string; quantity: number }[] }) => {
    const branchStock = product.stock.find((s) => s.id_branch === selectedBranch);
    return branchStock ? branchStock.quantity : 0;
  };

  const handleProductSelect = (product: { id_product: string; unit_quantity: number }) => {
    setSelectedProducts([product])
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
    }
    fetchData()
  }, [])


  return (
    <>
      <div className="grid gap-4 md:grid-cols-[3fr_2fr]">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
            <Package className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            Productos Disponibles en {selectedCustomer?.branch.branch_name}
          </h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-medium">Poducto</TableHead>
                  <TableHead className="text-right font-medium">Precio</TableHead>
                  <TableHead className="text-center font-medium">Stock</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-sm text-muted-foreground">
                      {isLoading ? "Cargando..." : "No hay productos disponibles"}
                    </TableCell>
                  </TableRow>
                ) : (
                  allProducts.map((product) => (
                    <TableRow key={product.id_product}>
                      <TableCell className="font-medium text-sm">
                        <div>
                          <h2>{product.product_name}</h2>
                          <span className="text-sm font-extralight text-muted-foreground">{product.product_description}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(Number(product.sale_price))}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStockByBranch(product) > 0 ? (
                          <Badge variant={
                            getStockByBranch(product) > 5 ? "default" : "destructive"
                          } >{getStockByBranch(product)}</Badge>
                        ) : (
                          <Badge className="text-sm text-red-500">Sin Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}