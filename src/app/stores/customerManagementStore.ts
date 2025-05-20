import { customerManagementService } from "@/features/dashboard/service/customerService";
import { CustomerService } from "@/features/dashboard/types/purchaseTypes";
import { create } from "zustand";

interface CustomerManagementStore {
  customerManagementList: CustomerService[];
  isLoading: boolean;
  error: string | null;

  fetchCustomerManagementList: () => Promise<void>;
}

export const customerManagementStore = create<CustomerManagementStore>((set) => ({
  customerManagementList: [],
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
}))
	