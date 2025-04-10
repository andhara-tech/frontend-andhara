import { registerSchema, roles } from "../schema/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegisterStore } from "@/app/stores/registerStore";
import { toast } from "sonner"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const RegisterForm = () => {
  const {register, error, isLoading} = useRegisterStore()
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: roles[1],
    },
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const finalValues = {
      email: values.email,
      password: values.password,
      role: values.role,
    }
    try{
      await register(finalValues.email, finalValues.password, finalValues.role)
      form.reset()
      toast.success(
        `El usuario ${values.email} se registro correctamente`, {
          duration: 3000,
        }
      )
      if (error) {
        toast.error(
          error, {
            duration: 3000,
          }
        )
      }
      setIsOpen(false)
    }catch (error) {
      console.error("Register failed:", error);
      toast.error(
        "Register failed. Please check your credentials and try again.", {
          duration: 3000,
        }
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full lg:w-auto">
          Registar usuario
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registar un nuevo usuario</DialogTitle>
          <DialogDescription>
            Completa este formulario para agregar un nuevo usuario al sistema con su correo y contraseña de acceso.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl >
                    <Input placeholder="Correo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl >
                    <Input type="password" placeholder="Contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar contraseña</FormLabel>
                  <FormControl >
                    <Input type="password" placeholder="Confirmar contraseña" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {isLoading ? 'Cargando...' : 'Registrar'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  )
}

export default RegisterForm;