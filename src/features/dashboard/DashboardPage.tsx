import { usePurchaseStore } from "@/app/stores/purchaseStore";
import { useCustumerStore } from "@/app/stores/customerStore";
import { NewPurchaseModal } from "@/features/dashboard/components/newPurchaseModal";
import { CustomerDialog } from "@/features/customer/components/customerDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, ShoppingCart } from "lucide-react";


const DashboardPage = () => {
  const { openNewCustomerDialog } = useCustumerStore()
  const { setIsOpenModal } = usePurchaseStore()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Dashboard</CardTitle>
        <CardDescription className="text-sm">
          Aquí puedes gestionar tus ventas y clientes.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-end gap-2 py-4">
          <Button
            onClick={() => setIsOpenModal(true)}
            variant="default"
            className="gap-2">
            <ShoppingCart className="h-4 w-4" />
            Nueva Venta
          </Button>

          <Button variant="outline" onClick={openNewCustomerDialog}>
            <Plus className="mr-2 h-4 w-4" />
            Nuevo cliente
          </Button>
          <NewPurchaseModal />
          <CustomerDialog />
        </div >
      </CardContent>
    </Card>
  );
}

export default DashboardPage;