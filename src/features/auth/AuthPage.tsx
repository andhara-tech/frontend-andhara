import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { login } from './services/authService';

const AuthPage = () => {
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

  const onSubmit = async (values: z.infer<typeof formSchema>)=> {
    try{
      const userData = await login(values.email, values.password);
      console.log("Login successful:", userData);
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
   <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField 
        control={form.control}
        name="email"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder='example@example.com' {...field}/>
          </FormControl>
          <FormDescription>
            Enter your email address. We will send you a confirmation link.
          </FormDescription>
         </FormItem>
        )}
      />
      <FormField 
        control={form.control}
        name="password"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder='********' {...field}/>
          </FormControl>
          <FormDescription>
            Enter your password. It must be at least 8 characters long.
          </FormDescription>
         </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
   </Form>
  );
}

export default AuthPage;

 