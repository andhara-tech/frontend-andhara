import { usePurchaseStore } from "@/app/stores/purchaseStore"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart } from "lucide-react"
import { PurchaseFormValue, purchaseSchema } from "@/features/dashboard/schema/purchaseSchema"
import { TabsContent } from "@radix-ui/react-tabs"
import { PurchaseFormDetails } from "@/features/dashboard/components/newPurchase/purchaseFormDetails"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PurchaseFormProducts } from "./newPurchase/purchaseProductSelector"
import { useCustumerStore } from "@/app/stores/customerStore"
import { PurchaseSumary } from "./newPurchase/purchaseSumary"
import { toast } from "sonner"
import { PurchaseRequest } from "../types/purchaseTypes"

export const NewPurchaseModal = () => {
  const { isOpen, setIsOpenModal, activeTab, setActiveTab, selectedProducts, createPurchase, isLoading} = usePurchaseStore()
  const { selectedCustomer, clearFilters, } = useCustumerStore()

  const form = useForm<PurchaseFormValue>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      purchase_duration: "",
      payment_type: "",
      payment_status: "",
      remaining_balance: "",
      delivery_type: "",
      delivery_comment: "",
      delivery_cost: "0",
    },
    mode: "onChange",
  })

  const isSelectCustomer = selectedCustomer?.branch.id_branch ? false : true

  const onSubmit = async (data: PurchaseFormValue) => {
    try {
      const finalData: PurchaseRequest = {
        customer_document: selectedCustomer?.customer_document || "",
        id_branch: selectedCustomer?.branch.id_branch || "",
        purchase_duration: Number(data.purchase_duration),
        payment_type: data.payment_type,
        payment_status: data.payment_status,
        remaining_balance: Number(data.remaining_balance),
        delivery_type: data.delivery_type,
        delivery_comment: data.delivery_comment,
        delivery_cost: Number(data.delivery_cost),
        products: selectedProducts,
      }
      await createPurchase(finalData)
      toast.success("Venta creada con éxito")
      setIsOpenModal(false)
      clearFilters()
      form.reset()
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al crear la venta"
      toast.error(errorMessage || "Error al crear la venta")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenModal}>
      <DialogContent className="sm:max-w-[1100px]">
        <DialogTitle> </DialogTitle>
        <DialogDescription> </DialogDescription>
        <Card className="border-none shadow-none p-0 w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-slate-700" />
              <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-200">Nueva Venta</CardTitle>
            </div>
            <CardDescription>Crear una nueva venta con detalles de cliente y productos</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="details">Detalle</TabsTrigger>
                <TabsTrigger disabled={isSelectCustomer} value="products">Productos</TabsTrigger>
                <TabsTrigger disabled={isSelectCustomer} value="summary">Resumen</TabsTrigger>
              </TabsList>
              <FormProvider {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <ScrollArea className="h-[500px] w-full p-1">

                    <TabsContent value="details">
                      <PurchaseFormDetails />
                    </TabsContent>
                    <TabsContent value="products">
                      <PurchaseFormProducts />
                    </TabsContent>
                    <TabsContent value="summary">
                      <PurchaseSumary />
                      <Button 
                        type="submit" 
                        className="w-full mt-4" 
                        disabled={
                          !form.formState.isValid
                          || isLoading
                        }>
                        {isLoading ? "Cargando..." : "Crear Venta"}
                      </Button>
                    </TabsContent>
                  </ScrollArea>
                </form>
              </FormProvider>
            </Tabs>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}