import { z } from 'zod';
export const types = ['CC', 'TI', 'CE', 'NIT', 'PASS'] as const;

export const clientEschema = z.object({
  clientDocument:
    z.string()
      .min(1, 'El documento es requerido')
      .max(20, 'El documento no puede tener más de 20 caracteres')
      .refine((clientDocument) => clientDocument.length >= 6, {
        message: 'El documento debe tener al menos 6 caracteres',
      }),
  clientTypeDocument:
    z.enum(types, {
      errorMap: () => ({ message: 'El tipo de documento es requerido' }),
    })
      .refine((clientTypeDocument) => clientTypeDocument.length >= 2, {
        message: 'El tipo de documento debe tener al menos 2 caracteres',
      }),
  clientName:
    z.string()
      .min(1, 'El nombre es requerido')
      .max(20, 'El nombre no puede tener más de 20 caracteres')
      .refine((clientName) => clientName.length >= 2, {
        message: 'El nombre debe tener al menos 2 caracteres',
      }),
  clientLastName:
    z.string()
      .min(1, 'El apellido es requerido')
      .max(20, 'El apellido no puede tener más de 20 caracteres')
      .refine((clientLastName) => clientLastName.length >= 2, {
        message: 'El apellido debe tener al menos 2 caracteres',
      }),
  clientPhoneNumber:
    z.string()
      .min(1, 'El teléfono es requerido')
      .max(20, 'El teléfono no puede tener más de 20 caracteres')
      .refine((clientPhoneNumber) => clientPhoneNumber.length >= 6, {
        message: 'El teléfono debe tener al menos 6 caracteres',
      }),
  clientEmail:
    z.string()
      .min(1, 'El correo es requerido')
      .max(50, 'El correo no puede tener más de 50 caracteres')
      .email({ message: 'El correo debe tener un formato válido' })
      .refine((clientEmail) => clientEmail.includes('@'), {
        message: 'El correo debe incluir un @',
      })
      .refine((clientEmail) => clientEmail.endsWith('.com'), {
        message: 'El correo debe terminar con .com',
      }),
  clientAddress:
    z.string()
      .min(1, 'La dirección es requerida')
      .max(50, 'La dirección no puede tener más de 50 caracteres')
      .refine((clientAddress) => clientAddress.length >= 6, {
        message: 'La dirección debe tener al menos 6 caracteres',
      }),
})