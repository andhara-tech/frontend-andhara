import { productsEschema, headquearters} from '../schema/productsShema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner"

const ProductForm = () => {
  const form = useForm<z.infer<typeof productsEschema>>({
    resolver: zodResolver(productsEschema),
    defaultValues: {
      productName: '',
      productDescription: '',
      productBuyPrice: 0,
      productDiscount: 0,
      productSellPrice: 0,
      productProfitMargin: 0,
      productIva: 0,
      productStock: 0,
      productHeadquarter: headquearters[0],
    },
  })

  const onSubmit = (data: z.infer<typeof productsEschema>) => {
    const transformData = {
      nombre_producto: data.productName,
      descripcion_producto: data.productDescription,
      precio_compra: data.productBuyPrice,
      descuento_producto: data.productDiscount,
      precio_venta: data.productSellPrice,
      margen_ganancia: data.productProfitMargin,
      iva: data.productIva,
      stock: data.productStock
    }
    console.log(transformData);
    toast.success(
      `El producto ${data.productName} se agrego correctamente`, {
    }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex flex-col lg:flex-row gap-4 items-center'>
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Nombre del producto</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Descripción del producto</FormLabel>
              <FormControl>
                <Input placeholder="Descripción del producto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex flex-col lg:flex-row gap-4 items-center'>
        <FormField
          control={form.control}
          name="productBuyPrice"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Precio de compra</FormLabel>
              <FormControl>
                <Input type='number' placeholder="Precio de compra" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productDiscount"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Descuento</FormLabel>
              <FormControl>
                <Input type='number' placeholder="Descuento" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex gap-4 items-end'>
        <FormField
          control={form.control}
          name="productSellPrice"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Precio de venta</FormLabel>
              <FormControl>
                <Input type='number'placeholder="Precio de venta" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productProfitMargin"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Margen de ganancia</FormLabel>
              <FormControl>
                <Input type='number' placeholder="Margen de ganancia" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productIva"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>IVA</FormLabel>
              <FormControl>
                <Input type='number' placeholder="IVA" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className='flex flex-col lg:flex-row gap-4 items-center'>
        <FormField
          control={form.control}
          name="productStock"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type='number' placeholder="Stock" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productHeadquarter"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Sede</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una sede" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {headquearters.map((headquarter) => (
                    <SelectItem key={headquarter} value={headquarter}>
                      {headquarter}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
        <Button 
          type="submit" 
          disabled={!form.formState.isValid}
        >
          Enviar
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm