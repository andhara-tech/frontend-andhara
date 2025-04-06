import { clientEschema, types } from '../schema/clientSchema';
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

const CLientForm = () => {
  const form = useForm<z.infer<typeof clientEschema>>({
    resolver: zodResolver(clientEschema),
    defaultValues: {
      clientDocument: '',
      clientTypeDocument: 'CC',
      clientName: '',
      clientLastName: '',
      clientPhoneNumber: '',
      clientEmail: '',
      clientAddress: ''
    },
  })
  const onSubmit = (data: z.infer<typeof clientEschema>) => {
    const transformData = {
      documento_cliente: data.clientDocument,
      id_tipo_documento: data.clientTypeDocument,
      nombre_cliente: data.clientName,
      apellido_cliente: data.clientLastName,
      numero_telefono: data.clientPhoneNumber,
      correo_electronico: data.clientEmail,
      direccion_residencia: data.clientAddress
    }
    console.log(transformData);
    toast.success(
      `El cliente ${data.clientName} se agrego correctamente`, {
      }
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className='flex gap-x-4 items-center'>
          <FormField
            control={form.control}
            name="clientTypeDocument"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Tipo de docuemento</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tipo de documento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      types.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientDocument"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Documento</FormLabel>
                <FormControl>
                  <Input placeholder="Número de documento" {...field} className='w-full' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex flex-col lg:flex-row gap-4 items-center'>
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientLastName"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Apellido</FormLabel>
                <FormControl>
                  <Input placeholder="Apellido del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className='flex gap-x-4 items-center'>
          <FormField
            control={form.control}
            name="clientPhoneNumber"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input placeholder="Teléfono del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="clientEmail"
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder="Correo del cliente" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="clientAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección</FormLabel>
              <FormControl>
                <Input placeholder="Dirección del cliente" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form >
  )
}

export default CLientForm;