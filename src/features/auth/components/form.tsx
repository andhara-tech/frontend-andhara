import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from '../services/authService';

const AuthForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, 'Password must be at least 8 characters long'),
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

  return (


      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="p-10 flex flex-col justify-center md:w-[30vw] gap-y-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input placeholder='Correo' {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese su correo electrónico.
                </FormDescription>
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
                  <Input type="password" placeholder='Contraseña' {...field} />
                </FormControl>
                <FormDescription>
                  Ingrese su contraseña.
                </FormDescription>
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
  );
}

export default AuthForm;

