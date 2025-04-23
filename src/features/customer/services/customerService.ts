import apiClient from "@/app/apiClient";
import { Customer } from "@/features/customer/types/customerTypes"; 


export const CustomerService = {
  getCustomers: async (): Promise<Customer[]> => {
    try{
      const response = await apiClient.get<Customer[]>("/customer/customers")
      return response.data
    }catch (error) {
      console.error("Error fetching clients:", error)
      throw new Error("Error fetching clients")
    }
  },

  getCustomerByDocument: async (document: string): Promise<Customer> => {
    try {
      const response = await apiClient.get<Customer>(`/customer/by-documnet/${document}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching client with ID ${document}:`, error)
      throw new Error(`Error fetching client with ID ${document}`)
    }
  },

  createCostumer: async (client: Customer): Promise<Customer> => {
    try {
      const response = await apiClient.post<Customer>("/customer/create-customer", client)
      return response.data
    } catch (error) {
      console.error("Error creating client:", error)
      throw new Error("Error creating client")
    }
  },

  updateCustomer: async (document: string, clientData: Customer): Promise<Customer> => {
    try {
      const response = await apiClient.put<Customer>(`/customer/update-customer/${document}`, clientData)
      return response.data
    } catch (error) {
      console.error(`Error updating client with ID ${document}:`, error)
      throw new Error(`Error updating client with ID ${document}`)
    }
  },

  inactivateCustomer: async (document: string): Promise<Customer> => {
    try {
      const response = await apiClient.patch<Customer>(`/customer/inactivate/${document}`)
      return response.data
    } catch (error) {
      console.error(`Error inactivating client with ID ${document}:`, error)
      throw new Error(`Error inactivating client with ID ${document}`)
    }
  },

  activateCustomer: async (document: string): Promise<Customer> => {
    try {
      const response = await apiClient.patch<Customer>(`/customer/activate/${document}`)
      return response.data
    } catch (error) {
      console.error(`Error activating client with ID ${document}:`, error)
      throw new Error(`Error activating client with ID ${document}`)
    }
  },

  toggleCostumerState: async (document: string, currentState?: boolean): Promise<Customer> => {
    try {
      if(currentState) {
        await CustomerService.inactivateCustomer(document)
      }else {
        await CustomerService.activateCustomer(document)
      }

      const updatedCostumer = await CustomerService.getCustomerByDocument(document)

      if(!updatedCostumer) {
        throw new Error(`Customer with Documnet ${document} not found after toggle`)
      }

      return updatedCostumer
    } catch (error) {
      console.error(`Error toggling state for client with ID ${document}:`, error)
      throw new Error(`Error toggling state for client with ID ${document}`)
    }
  }
}