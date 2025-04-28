import { useCustumerStore } from "@/app/stores/customerStore"
import { useForm } from "react-hook-form"
import { customerEschema, CustomerFormValue } from "@/features/customer/schema/customerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { branchesStatic } from "@/shared/static"
import { useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DialogDescription } from "@radix-ui/react-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export const CustomerDialog = () =>{
  const {
    createCustomer,
    updateCustomer,
    isLoading,
    selectedCustomer,
    editDialogOpen,
    newCustomerDialogOpen,
    closeDeleteDialog,
    closeNewCustomerDialog,
    
  } = useCustumerStore()

  const isEditing = !!selectedCustomer
  const isOpen = editDialogOpen || newCustomerDialogOpen

  const hadleOpenChange = (open: boolean) =>{
    if(!open){
      if(editDialogOpen) closeDeleteDialog()
      if(newCustomerDialogOpen) closeNewCustomerDialog()
    }
  }

  const form = useForm<CustomerFormValue>({
    resolver: zodResolver(customerEschema),
    defaultValues:{
      customer_document: "",
      document_type: "CC",
      customer_first_name: "",
      customer_last_name: "",
      phone_number: "",
      email: "",
      home_address: "",
      customer_state: true,
      id_branch: branchesStatic[0].id_branch,
    }
  })

  useEffect(() => {
    if(selectedCustomer){
      form.reset({
        customer_document: selectedCustomer.customer_document,
        document_type: selectedCustomer.document_type,
        customer_first_name: selectedCustomer.customer_first_name,
        customer_last_name: selectedCustomer.customer_last_name,
        phone_number: selectedCustomer.phone_number,
        email: selectedCustomer.email,
        home_address: selectedCustomer.home_address,
        customer_state: selectedCustomer.customer_state,
        id_branch: typeof selectedCustomer.id_branch === "string" ? selectedCustomer.id_branch : selectedCustomer.id_branch?.id_branch ?? undefined

      })
    }else{
      form.reset()
    }
  }, [selectedCustomer, form, isOpen])

  const onSubmit = async (data: CustomerFormValue) => {
    try{
      if(isEditing && selectedCustomer){
        await updateCustomer({
          customer_document: selectedCustomer.customer_document,
          document_type: selectedCustomer.document_type,
          customer_first_name: data.customer_first_name,
          customer_last_name: data.customer_last_name,
          phone_number: data.phone_number,
          email: data.email,
          home_address: data.home_address,
          customer_state: data.customer_state ?? true,
          id_branch: data.id_branch,
        })
      }else {
        await createCustomer({
          customer_document: data.customer_document,
          document_type: data.document_type,
          customer_first_name: data.customer_first_name,
          customer_last_name: data.customer_last_name,
          phone_number: data.phone_number,
          email: data.email,
          home_address: data.home_address,
          customer_state: data.customer_state ?? true,
          id_branch: data.id_branch,
        })
      }
    }catch (error) {
      console.error("Error updating customer:", error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={hadleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditing ? "Editar Cliente" : "Crear Cliente"}
          </DialogTitle>
          <DialogDescription>
            {isEditing ? "Modifique los detalles del cliente." : "Ingrese los detalles del nuevo cliente."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {isEditing && selectedCustomer && (
              <FormField
                control={form.control}
                name="customer_document"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Documento</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        value={selectedCustomer.customer_document}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )

}