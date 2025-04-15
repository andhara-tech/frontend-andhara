import { productsEschema} from '../schema/productsShema';
import { supplierStatic } from '@/shared/static';
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
import { useProductStore } from '@/app/stores/productStore';

const ProductForm = () => {
  const {error, createProduct, isLoading} = useProductStore()
  const form = useForm<z.infer<typeof productsEschema>>({
    resolver: zodResolver(productsEschema),
    defaultValues: {
      product_name: '',
      product_description: '',
      purchase_price: '',
      product_discount: '',
      sale_price: '',
      vat: '',
      supplier_id: 0,
    },
  })

  const onSubmit = async (data: z.infer<typeof productsEschema>) => {
    const finalValues = {
      supplier_id: data.supplier_id,
      product_name: data.product_name,
      product_description: data.product_description,
      purchase_price: Number(data.purchase_price),
      product_discount: Number(data.product_discount),
      sale_price: Number(data.sale_price),
      vat: Number(data.vat),
    }

    try {
      await createProduct(
        finalValues.supplier_id,
        finalValues.product_name,
        finalValues.product_description,
        finalValues.purchase_price,
        finalValues.product_discount,
        finalValues.sale_price,
        finalValues.vat
      )
      if (error) {
        toast.error(
          error, {
            duration: 3000,
          }
        )
      }
      form.reset()
    } catch (error) {
      console.error("Product creation failed:", error);
      toast.error(
        "Product creation failed. Please check your credentials and try again.", {
          duration: 3000,
        }
      )
    }
    toast.success(
      `El producto ${data.product_name} se agrego correctamente`, {
    }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div className='flex flex-col lg:flex-row gap-4 items-center'>
        <FormField
          control={form.control}
          name="product_name"
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
          name="product_description"
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
          name="purchase_price"
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
          name="product_discount"
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
          name="sale_price"
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
          name="vat"
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
          name="supplier_id"
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Sede</FormLabel>
              <Select onValueChange={(val) => field.onChange(Number(val))} defaultValue={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecciona una sede" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {supplierStatic.map((s) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.supplier_name}
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
          disabled={!form.formState.isValid || isLoading}
        >
          {isLoading ? "Cargando..." : "Crear producto"}
        </Button>
      </form>
    </Form>
  )
}

export default ProductForm