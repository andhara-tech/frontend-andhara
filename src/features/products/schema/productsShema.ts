import { supplierStatic } from '@/shared/static';
import { z } from 'zod';

const validIds = supplierStatic.map(h => h.id);

export const productsEschema = z.object({
  product_name: z.string()
    .min(1, 'El nombre es requerido')
    .max(20, 'El nombre no puede tener más de 20 caracteres')
    .refine((val) => val.length >= 2, {
      message: 'El nombre debe tener al menos 2 caracteres',
    }),
  
  product_description: z.string()
    .min(1, 'La descripción es requerida')
    .max(100, 'La descripción no puede tener más de 100 caracteres')
    .refine((val) => val.length >= 6, {
      message: 'La descripción debe tener al menos 6 caracteres',
    }),

  purchase_price: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 1000000, {
      message: 'El precio de compra debe ser un número válido entre 1 y 1000000',
    }),

  product_discount: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100, {
      message: 'El descuento debe estar entre 0 y 100',
    }),

  sale_price: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 1000000, {
      message: 'El precio de venta debe ser un número válido entre 1 y 1000000',
    }),

  vat: z.string()
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) <= 100, {
      message: 'El IVA debe estar entre 1 y 100',
    }),

  supplier_id: z
    .number({
      required_error: 'El proveedor es requerido',
      invalid_type_error: 'El proveedor debe ser un número',
    })
    .refine((supplier_id) => validIds.includes(supplier_id), {
      message: 'El proveedor no es válido',
    }),
});
