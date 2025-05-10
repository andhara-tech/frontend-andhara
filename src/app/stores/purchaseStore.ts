import { ProductSelected } from "@/features/dashboard/types/purchaseTypes";
import { create } from "zustand";

interface saleSate {
  isOpen: boolean;
  activeTab: string;
  selectedProducts: ProductSelected[] | null;

  setSelectedProducts: (products: ProductSelected[]) => void;
  setActiveTab: (activeTab: string) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  closeModal: () => void;
}



export const usePurchaseStore = create<saleSate>((set) => ({
  isOpen: false,
  activeTab: "details",
  selectedProducts: null,


  setSelectedProducts: (products: ProductSelected[]) =>
    set((state) => ({
      selectedProducts: state.selectedProducts
        ? [...state.selectedProducts, ...products]
        : products,
    })),
  setIsOpenModal: (isOpen: boolean) => set({ isOpen }),
  setActiveTab: (activeTab: string) => set({ activeTab }),
  closeModal: () => set({ isOpen: false, activeTab: "details" }),
}))