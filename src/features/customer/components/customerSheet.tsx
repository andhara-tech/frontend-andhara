import { useCustumerStore } from "@/app/stores/customerStore";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { formaterDate } from "@/lib/utils";
import { Loader2 } from "lucide-react";


export const CustomerSheet = () => {
  const { sheetOpen, customerData, closeSheet, isLoading } = useCustumerStore()

  const isOpen = sheetOpen

  const handleOpenChange = (open: boolean) => {
    if (!open) closeSheet()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent className="overflow-y-scroll p-4">
        {isLoading && (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
        <SheetHeader className="text-center">
          <SheetTitle className="text-2xl font-bold">
            {customerData?.customer_first_name} {customerData?.customer_last_name}
          </SheetTitle>
          <SheetDescription >
            Compras realizadas
          </SheetDescription>
        </SheetHeader>
        <div className="w-full rounded shadow bg-primary text-center text-white">
          <span className="font-bold text-3xl">{formatCurrency(customerData?.total_historical_purchases ?? 0)}</span>
          <p>Total compras realizadas</p>
        </div>
        {customerData?.purchases.map((p) => (
          <div className="rounded text-sm shadow w-full p-4" key={p.id_purchase}>
            <h2 className="font-medium text-2xl text-center">Compra</h2>
            <div className="flex justify-between items-center">
              <span className="px-3 shadow rounded-2xl">{formaterDate(p.purchase_date)}</span>
              <span className="px-3 shadow bg-primary text-white rounded-2xl">{formaterDate(p.next_purchase_date)}</span>
            </div>
            <Separator className="my-2"/>
            <div className="flex items-center justify-between">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Nombre</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Subtotal (IVA)</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {p.products.map((pro) => (
                    <TableRow key={pro.id_product}>
                      <TableCell className="font-medium">{pro.product_name}</TableCell>
                        <TableCell>{pro.unit_quantity}</TableCell>
                        <TableCell>{formatCurrency(pro.subtotal_without_vat)}</TableCell>
                        <TableCell>{formatCurrency(pro.total_price_with_vat)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        ))}
      </SheetContent>
    </Sheet>
  )
}