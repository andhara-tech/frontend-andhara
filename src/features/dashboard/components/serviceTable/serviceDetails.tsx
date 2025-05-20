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
  const selectedService = {
    id_customer_service: "a5f0f17a-4ab0-423f-ab81-b7f62af005b7",
    customer: {
      customer_document: "3121232313123",
      customer_first_name: "Santiago",
      customer_last_name: "Bulla",
      phone_number: "3204567890",
      email: "bulla.santiago@example.com",
      home_address: "Avenida 68 #5-23 Norte",
      branch_name: "Sede Bogota",
      customer_full_name: "Santiago Bulla"
    },
    purchase: {
      id_purchase: "d71f8f8b-86ac-425f-a389-4fe90decb6e1",
      purchase_date: "2025-05-18",
      payment_type: "Efectivo",
      payment_status: "Pago Completado",
      subtotal_without_vat: 127000,
      total: 151130,
      days_remaining: 9
    },
    last_purchases: {
      historical_purchases: 1392300,
      purchases: [
        {
          id_purchase: "315494fb-fca1-49a3-90bd-7bf4c66e5df1",
          purchase_date: "2025-05-18",
          purchase_duration: 25,
          next_purchase_date: "2025-06-12",
          total_purchase: 297500,
          products: [
            {
              id_product: "1b882971-2b70-40b6-a8ab-3af35819b1d7",
              product_name: "crema ",
              unit_quantity: 2,
              subtotal_without_vat: 86000,
              total_price_with_vat: 102340
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            }
          ]
        },
        {
          id_purchase: "d4c7a444-021a-4a7f-8f22-b13c5c96757b",
          purchase_date: "2025-05-18",
          purchase_duration: 25,
          next_purchase_date: "2025-06-12",
          total_purchase: 297500,
          products: [
            {
              id_product: "1b882971-2b70-40b6-a8ab-3af35819b1d7",
              product_name: "crema ",
              unit_quantity: 2,
              subtotal_without_vat: 86000,
              total_price_with_vat: 102340
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            }
          ]
        },
        {
          id_purchase: "4ddcedd9-8ee9-4ec1-80cf-0f98f08ea5ba",
          purchase_date: "2025-05-18",
          purchase_duration: 25,
          next_purchase_date: "2025-06-12",
          total_purchase: 297500,
          products: [
            {
              id_product: "1b882971-2b70-40b6-a8ab-3af35819b1d7",
              product_name: "crema ",
              unit_quantity: 2,
              subtotal_without_vat: 86000,
              total_price_with_vat: 102340
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            }
          ]
        },
        {
          id_purchase: "da9d4fac-13fc-439b-ad21-a2ed66c56aa9",
          purchase_date: "2025-05-18",
          purchase_duration: 25,
          next_purchase_date: "2025-06-12",
          total_purchase: 348670,
          products: [
            {
              id_product: "1b882971-2b70-40b6-a8ab-3af35819b1d7",
              product_name: "crema ",
              unit_quantity: 3,
              subtotal_without_vat: 129000,
              total_price_with_vat: 153510
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 4,
              subtotal_without_vat: 164000,
              total_price_with_vat: 195160
            }
          ]
        },
        {
          id_purchase: "d71f8f8b-86ac-425f-a389-4fe90decb6e1",
          purchase_date: "2025-05-18",
          purchase_duration: 15,
          next_purchase_date: "2025-06-02",
          total_purchase: 151130,
          products: [
            {
              id_product: "1b882971-2b70-40b6-a8ab-3af35819b1d7",
              product_name: "crema ",
              unit_quantity: 2,
              subtotal_without_vat: 86000,
              total_price_with_vat: 102340
            },
            {
              id_product: "6fde0a43-439d-47a8-98fa-f0ade5cc7182",
              product_name: "Pantodex",
              unit_quantity: 1,
              subtotal_without_vat: 41000,
              total_price_with_vat: 48790
            }
          ]
        }
      ]
    }
  };

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
      <div
        className={`col-span-2 sm:col-span-4 border-t-4 ${borderColor} rounded shadow h-full`}
      >
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
