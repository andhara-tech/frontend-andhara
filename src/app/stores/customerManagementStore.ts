import { customerManagementService } from "@/features/dashboard/service/customerService";
import { CustomerService, CustomerServiceById } from "@/features/dashboard/types/purchaseTypes";
import { create } from "zustand";

interface CustomerManagementStore {
  customerManagementList: CustomerService[];
  selectedService: CustomerServiceById;
  isLoading: boolean;
  error: string | null;

  fetchCustomerManagementList: () => Promise<void>;
  fetchCustomerManagementById: (id: string) => Promise<void>;
  clearSelectedService: () => void;
}

export const customerManagementStore = create<CustomerManagementStore>((set) => ({
  customerManagementList: [],
  selectedService: {} as CustomerServiceById,
  isLoading: false,
  error: null,

  fetchCustomerManagementList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await customerManagementService.customerManagementList();
      const sortedData = [...response.data].sort((a, b) => a.days_remaining - b.days_remaining);
      
      set({ customerManagementList: sortedData });
    } catch (error: any) {
      set({ error: error.message || "Error desconocido" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCustomerManagementById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await customerManagementService.customerManagementById(id);
      if (!response.data) {
        throw new Error("No se encontro el servicio")
      }
      set({ selectedService: response.data });
    } catch (error: any) {
      set({ error: error.message || "Error desconocido" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearSelectedService: () => {
    set({ selectedService: {} as CustomerServiceById });
  }
}))
	