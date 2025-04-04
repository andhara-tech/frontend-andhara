import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Eye, EyeClosed } from 'lucide-react';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '../services/authService';
import { useState } from 'react';

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const formSchema = z.object({
    email:
      z.string()
        .email({ message: 'El correo debe tener un formato válido' })
        .refine((email => email.includes('@')), {
          message: 'El correo debe tener un formato válido',
        })
        .refine((email) => email.endsWith('.com'), {
          message: 'El correo debe tener un formato válido',
        }
        ),
    password: z.string().min(4, 'La contraseña debe tener al menos 4 caracteres')
      .max(20, 'La contraseña no puede tener más de 20 caracteres')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userData = await login(values.email, values.password);
      console.log("Login successful:", userData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  const handleShowPasswor = () => {
    setShowPassword(!showPassword);
  }

  return (


    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="p-10 flex flex-col justify-center lg:w-[30vw] gap-y-5 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl >

                <Input placeholder='Correo' {...field} />


              </FormControl>
              <FormDescription>
                Ingrese su correo electrónico.
              </FormDescription>
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
              <FormControl>
                <div className='relative w-full'>
                  <Input type={showPassword ? "text" : "password"} placeholder='Contraseña' {...field} />
                  {
                    showPassword ? (
                      <Eye onClick={handleShowPasswor} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
                    ) : (
                      <EyeClosed onClick={handleShowPasswor} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
                    )
                  }
                </div>
              </FormControl>
              <FormDescription>
                Ingrese su contraseña.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default AuthForm;

