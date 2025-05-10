import { usePurchaseStore } from "@/app/stores/purchaseStore"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart } from "lucide-react"
import { PurchaseFormValue, purchaseSchema } from "@/features/dashboard/schema/purchaseSchema"
import { TabsContent } from "@radix-ui/react-tabs"
import { PurchaseFormDetails } from "@/features/dashboard/components/newPurchase/purchaseFormDetails"
// import { useCustumerStore } from "@/app/stores/customerStore"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PurchaseFormProducts } from "./newPurchase/purchaseProductSelector"

export const NewPurchaseModal = () => {
  const { isOpen, setIsOpenModal, activeTab, setActiveTab } = usePurchaseStore()
  // const { selectedCustomer } = useCustumerStore()

  const methods = useForm<PurchaseFormValue>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      customer_document: "",
      id_branch: "",
      purchase_duration: 0,
      payment_type: "",
      payment_status: "",
      remaining_balance: 0,
      delivery_type: "",
      delivery_comment: "",
      delivery_cost: 0,
    },
    mode: "onChange", // Validar al cambiar para detectar errores temprano
  })

  // const onSubmit = (data: PurchaseFormValue) => {
  //   console.log("Form data:", data)
  //   // Aquí puedes manejar el envío del formulario, como hacer una solicitud a la API
  // }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Nueva Venta
        </Button>
      </DialogTrigger>
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
                <TabsTrigger value="products">Productos</TabsTrigger>
                <TabsTrigger value="summary">Resumen</TabsTrigger>
              </TabsList>
              <FormProvider {...methods}>
                <form className="space-y-4">
                  <ScrollArea className="h-[500px] w-full p-1">

                    <TabsContent value="details">
                      <PurchaseFormDetails />
                    </TabsContent>
                    <TabsContent value="products">
                      <PurchaseFormProducts />
                    </TabsContent>
                    <TabsContent value="summary">
                      {/* <PurchaseFormSummary /> */}
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