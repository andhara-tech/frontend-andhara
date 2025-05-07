import { z } from "zod";

export const purchaseSchema = z.object({
  customerDocument: z.string().min(1, "Customer document is required"),
  branchId: z.string().min(1, "Branch is required"),
  purchaseDuration: z.string().optional(),
  paymentType: z.string().min(1, "Payment type is required"),
  paymentStatus: z.string().min(1, "Payment status is required"),
  remainingBalance: z.coerce.number().min(0, "Remaining balance must be 0 or greater"),
  deliveryType: z.string().min(1, "Delivery type is required"),
  deliveryComment: z.string().optional(),
  deliveryCost: z.coerce.number().min(0, "Delivery cost must be 0 or greater"),
})

export type PurchaseFormValue = z.infer<typeof purchaseSchema>;