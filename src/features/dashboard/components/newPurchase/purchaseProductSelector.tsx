import { useCustumerStore } from "@/app/stores/customerStore"
import { useProductStore } from "@/app/stores/productStore"
import { usePurchaseStore } from "@/app/stores/purchaseStore"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/format"
import { MinusCircle, Package, PlusCircle, X } from "lucide-react"
import { useEffect } from "react"
import { PurchaseFormValue } from "../../schema/purchaseSchema"
import { useFormContext } from "react-hook-form"

export const PurchaseFormProducts = () => {
  const { selectedCustomer } = useCustumerStore()
  const { fetchProducts, allProducts, isLoading } = useProductStore()
  const { addOrUpdateProduct, removeUnitFromProduct, selectedProducts, removeProductCompletely } = usePurchaseStore()
  const { watch} = useFormContext<PurchaseFormValue>()
  const deliveryCost = watch("delivery_cost")

  const selectedBranch = selectedCustomer?.branch.id_branch

  const getStockByBranch = (product: { stock: { id_branch: string; quantity: number }[] }) => {
    const branchStock = product.stock.find((s) => s.id_branch === selectedBranch);
    return branchStock ? branchStock.quantity : 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts()
    }
    fetchData()
  }, [])

  const getSelectedProductDetails = () => {
    return selectedProducts
      .map((selected) => {
        const fullProduct = allProducts.find(p => p.id_product === selected.id_product);
        if (!fullProduct) return null;

        return {
          ...fullProduct,
          quantity: selected.unit_quantity,
          subtotal: Number(fullProduct.sale_price) * selected.unit_quantity
        };
      })
      .filter(Boolean); // elimina nulls
  };

  const selectedDetails = getSelectedProductDetails();


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
                          <Badge className="text-sm">Sin Stock</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        {
                          selectedProducts.some((p) => p.id_product === product.id_product) && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => removeUnitFromProduct(product?.id_product || "")}
                            >
                              <MinusCircle className="h-3 w-3" />
                              <span className="sr-only">Disminuir</span>
                            </Button>
                          )
                        }
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => addOrUpdateProduct(product?.id_product || "")}
                        >
                          <PlusCircle className="h-3 w-3 text-slate-600" />
                          <span className="sr-only">Aumentar</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium"> Productos seleccionados</h3>
          {selectedProducts.length === 0 ? (
            <div className="text-center py-6 border border-dashed rounded-md">
              <p className="text-slate-500 text-sm">
                No hay productos seleccionados
              </p>
              <p className="text-slate-500 text-sm">
                Selecciona productos para agregar a la venta
              </p>
            </div>
          ) : (
            <div className="space-y-2 mr-2">
              {selectedDetails.map((product) => (
                <Card key={product?.id_product}>
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-sm">{product?.product_name}</h4>
                        <p className="text-sm text-slate-600">{formatCurrency(Number(product?.purchase_price))}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => removeUnitFromProduct(product?.id_product || "")}
                        >
                          <MinusCircle className="h-3 w-3" />
                          <span className="sr-only">Disminuir</span>
                        </Button>
                        <span className="text-sm font-medium">{product?.quantity}</span>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => addOrUpdateProduct(product?.id_product || "")}
                        >
                          <PlusCircle className="h-3 w-3 text-slate-600" />
                          <span className="sr-only">Aumentar</span>
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-slate-600">
                        Subtotal: {formatCurrency(Number(product?.subtotal))}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 px-1 text-xs"
                        onClick={() => removeProductCompletely(product?.id_product || "")}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Eliminar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <div className="bg-slate-50 rounded-lg mt-3">
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="font-medium">Total: Productos</span>
                  <span>{selectedDetails.reduce((sum, p) => sum + (p?.quantity || 0), 0)}</span>
                </div>
                <div className="flex justify-between items-center mt-1 text-sm">
                  <span className="font-medium">
                    Subtotal:
                  </span>
                  <span>
                    {
                      formatCurrency(selectedDetails.reduce((sum, p) => sum + (p?.subtotal || 0), 0))
                    }
                  </span>
                </div>
                {
                  deliveryCost > 0 && (
                    <div className="flex justify-between items-center mt-1 text-sm">
                      <span className="font-medium">Costo de envio:</span>
                      <span>{formatCurrency(Number(deliveryCost))}</span>
                    </div>
                  )
                }
                <Separator className="my-2"/>
                <div className="flex justify-between items-center font-medium">
                  <span>Total:</span>
                  <span>
                    {
                      formatCurrency(selectedDetails.reduce((sum, p) => sum + (p?.subtotal || 0), 0) + Number(deliveryCost))
                    }
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}