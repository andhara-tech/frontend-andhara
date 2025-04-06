import { z } from 'zod';

export const headquearters = ['Bogotá', 'Palmira', 'Valledupar'] as const;

export const productsEschema = z.object({
  productName:
    z.string()
      .min(1, 'El nombre es requerido')
      .max(20, 'El nombre no puede tener más de 20 caracteres')
      .refine((productName) => productName.length >= 2, {
        message: 'El nombre debe tener al menos 2 caracteres',
      }),
  productDescription:
    z.string()
      .min(1, 'La descripción es requerida')
      .max(50, 'La descripción no puede tener más de 50 caracteres')
      .refine((productDescription) => productDescription.length >= 6, {
        message: 'La descripción debe tener al menos 6 caracteres',
      }),
  productBuyPrice:
    z.coerce.number()
      .min(1, 'El precio de compra es requerido')
      .max(1000000, 'El precio de compra no puede ser mayor a 1000000')
      .refine((productBuyPrice) => productBuyPrice > 0, {
        message: 'El precio de compra debe ser mayor a 0',
      }),
  productDiscount:
    z.coerce.number()
      .min(0, 'El descuento es requerido')
      .max(100, 'El descuento no puede ser mayor a 100')
      .refine((productDiscount) => productDiscount >= 0, {
        message: 'El descuento debe ser mayor o igual a 0',
      }),
  productSellPrice:
    z.coerce.number()
      .min(1, 'El precio de venta es requerido')
      .max(1000000, 'El precio de venta no puede ser mayor a 1000000'),
  productProfitMargin:
    z.coerce.number()
      .min(1, 'El margen de ganancia es requerido')
      .max(100, 'El margen de ganancia no puede ser mayor a 100')
      .refine((productProfitMargin) => productProfitMargin > 0, {
        message: 'El margen de ganancia debe ser mayor a 0',
      }),
  productIva:
    z.coerce.number()
      .min(1, 'El IVA es requerido')
      .max(100, 'El IVA no puede ser mayor a 100')
      .refine((productIva) => productIva > 0, {
        message: 'El IVA debe ser mayor a 0',
      }),
  productStock:
    z.coerce.number()
      .min(1, 'El stock es requerido')
      .max(1000000, 'El stock no puede ser mayor a 1000000')
      .refine((productStock) => productStock > 0, {
        message: 'El stock debe ser mayor a 0',
      }),
      productHeadquarter:
    z.enum(headquearters, {
      errorMap: () => ({ message: 'La sede es requerida' }),
    })
      .refine((productHeadquarter) => productHeadquarter.length >= 2, {
        message: 'La sede debe tener al menos 2 caracteres',
      }),
})