import apiClient from "@/app/apiClient";
import { Customer, CustomerByDocument, CustomerRequest } from "@/features/customer/types/customerTypes";
import { AxiosHeaders } from "axios";



export const CustomerService = {
  getCustomers: async ({ search = "", skip = 0, limit = 100 } = {}): Promise<Customer[]> => {
    try {
      const response = await apiClient.get<Customer[]>("/customer/customers", {
        params: {search,skip, limit},
        headers: new AxiosHeaders(),
      }
      )
      return response.data
    } catch (error) {
      console.error("Error fetching clients:", error)
      throw new Error("Error fetching clients")
    }
  },

  getCustomerByDocument: async (document: string): Promise<CustomerByDocument> => {
    try {
      const response = await apiClient.get<CustomerByDocument>(`/customer/by-document/${document}`)
      return response.data
    } catch (error) {
      console.error(`Error fetching client with ID ${document}:`, error)
      throw new Error(`Error fetching client with ID ${document}`)
    }
  },

  createCostumer: async (client: CustomerRequest): Promise<Customer> => {
    try {
      const response = await apiClient.post<Customer>("/customer/create-customer", client)
      return response.data
    } catch (error) {
      console.error("Error creating client:", error)
      throw new Error("Error creating client")
    }
  },

  updateCustomer: async (clientData: CustomerRequest): Promise<Customer> => {
    try {
      const response = await apiClient.patch<Customer>(`/customer/update-customer/${clientData.customer_document}`, clientData)
      return response.data
    } catch (error) {
      console.error(`Error updating client with ID ${clientData.customer_document}:`, error)
      throw new Error(`Error updating client with ID ${clientData.customer_document}`)
    }
  },

  toggleCustomer: async (document: string): Promise<number> => {
    try {
      const response = await apiClient.patch(`/customer/toggle-customer/${document}`)
      return response.status
    } catch (error) {
      console.error(`Error inactivating client with ID ${document}:`, error)
      throw new Error(`Error inactivating client with ID ${document}`)
    }
  },
}

