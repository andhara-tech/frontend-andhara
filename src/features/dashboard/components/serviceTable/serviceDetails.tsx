import { customerManagementStore } from "@/app/stores/customerManagementStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";
import { formaterDate } from "@/lib/utils";

import {
  BanknoteArrowUp,
  BanknoteX,
  CreditCard,
  HandCoins,
  Mail,
  MapPinHouse,
  Phone,
  SquareUser,
  Wallet
} from "lucide-react";

export const ServiceDetails = () => {
  const { selectedService } = customerManagementStore();

  const borderColor =
    selectedService.purchase.days_remaining < 10
      ? "border-destructive"
      : "border-primary";

  const backgroundColor =
    selectedService.purchase.days_remaining < 10 ? "bg-destructive" : "bg-primary";
  return (
    <section className="grid grid-cols-2 sm:grid-cols-8 gap-5 w-full sm:h-[250px] h-[500px]">
      <div
        className={`col-span-2 max-w-[350px] border-t-4 ${borderColor} rounded shadow p-4`}
      >
        <div className="mb-4">
          <p className="text-xs text-muted-foreground">
            {selectedService.customer.branch_name}
          </p>
          <h2 className="font-medium text-lg">
            {selectedService.customer.customer_full_name}
          </h2>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-muted-foreground text-xs space-y-2">
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4" />Telfono
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4" />Correo
            </p>
            <p className="flex items-center gap-2">
              <MapPinHouse className="h-4 w-4" />Dirección
            </p>
            <p className="flex items-center gap-2">
              <SquareUser className="h-4 w-4" />Documento
            </p>
          </div>
          <div className="text-xs space-y-2 font-medium">
            <p className="flex items-center gap-2">
              {selectedService.customer.phone_number}
            </p>
            <p className="flex items-center gap-2 truncate">
              {selectedService.customer.email}
            </p>
            <p className="flex items-center gap-2 truncate">
              {selectedService.customer.home_address}
            </p>
            <p className="flex items-center gap-2">
              {selectedService.customer.customer_document}
            </p>
          </div>
        </div>
      </div>
      <div
        className={`col-span-2 max-w-[350px] border-t-4 ${borderColor} rounded shadow`}
      >
        <div className="mb-4 p-4 flex items-center justify-between">
          <div>
            <h2 className="font-bold text-lg">Seguimiento</h2>
            <p className="text-xs text-muted-foreground">
              Fecha: {formaterDate(selectedService.purchase.purchase_date)}
            </p>
          </div>
          <div
            className={`h-12 w-8 rounded text-center text-white ${backgroundColor}`}
          >
            <span className="text-xl">
              {selectedService.purchase.days_remaining}
            </span>
            <p className="text-xs">Días</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 p-4">
          <div className="text-muted-foreground text-xs space-y-2 text-nowrap">
            <p className="flex items-center gap-2">
              <HandCoins className="h-4 w-4" />Estado pago
            </p>
            <p className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />Tipo pago
            </p>
            <p className="flex items-center gap-2">
              <BanknoteX className="h-4 w-4" />Subtotal sin IVA
            </p>
            <p className="flex items-center gap-2">
              <BanknoteArrowUp className="h-4 w-4" />Total con IVA
            </p>
          </div>
          <div className="text-xs space-y-2 font-medium">
            <p className="flex items-center gap-2">
              {selectedService.purchase.payment_status}
            </p>
            <p className="flex items-center gap-2 truncate">
              {selectedService.purchase.payment_type}
            </p>
            <p className="flex items-center gap-2 truncate">
              {formatCurrency(selectedService.purchase.subtotal_without_vat)}
            </p>
            <p className="flex items-center gap-2">
              {formatCurrency(selectedService.purchase.total)}
            </p>
          </div>
        </div>
      </div>
      <div className={`col-span-2 sm:col-span-4 border-t-4 ${borderColor} rounded shadow`}>
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Ventas totales</h2>
            <Badge
              variant="outline"
              className="flex items-center justify-end gap-2 text-sm font-semibold"
            >
              <Wallet className="h-4 w-4" />
              {formatCurrency(selectedService.last_purchases.historical_purchases)}
            </Badge>
          </div>
          <ScrollArea className="h-[200px] px-2">
            <Accordion type="single" collapsible className="w-full">
              {selectedService.last_purchases.purchases.map(purchase =>
                <AccordionItem
                  key={purchase.id_purchase}
                  value={purchase.id_purchase}
                >
                  <AccordionTrigger className="flex items-center">
                    <p>
                      {formaterDate(purchase.purchase_date)}
                      <span className="ml-2 text-xs text-muted-foreground">
                        {formatCurrency(purchase.total_purchase)}
                      </span>
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-wrap gap-2">
                    {purchase.products.map(product =>
                      <Badge variant="outline" key={product.id_product}>
                        <p>
                          {product.product_name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {product.unit_quantity}
                          </span>
                        </p>
                      </Badge>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};
