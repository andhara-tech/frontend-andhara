import { ProductSelected } from "@/features/dashboard/types/purchaseTypes";
import { create } from "zustand";

interface saleSate {
  isOpen: boolean;
  activeTab: string;
  selectedProducts: ProductSelected[];

  addOrUpdateProduct: (productId: string) => void;
  removeUnitFromProduct: (productId: string) => void;
  removeProductCompletely: (productId: string) => void;

  setActiveTab: (activeTab: string) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  closeModal: () => void;
}



export const usePurchaseStore = create<saleSate>((set) => ({
  isOpen: false,
  activeTab: "details",
  selectedProducts: [],


  addOrUpdateProduct: (productId: string) =>
    set((state) => {
      const existingProduct = state.selectedProducts?.find(p => p.id_product === productId);
      if (existingProduct) {
        return {
          selectedProducts: state.selectedProducts?.map(p =>
            p.id_product === productId
              ? { ...p, unit_quantity: p.unit_quantity + 1 }
              : p
          )
        }
      } else {
        return {
          selectedProducts: [
            ...state.selectedProducts,
            { id_product: productId, unit_quantity: 1 }
          ]
        }
      }
    }),

  removeUnitFromProduct: (productId: string) =>
    set((state) => {
      const existingProduct = state.selectedProducts?.find(
        p => p.id_product === productId
      )

      if (!existingProduct) return {}

      if (existingProduct.unit_quantity > 1) {
        return {
          selectedProducts: state.selectedProducts?.map(p =>
            p.id_product === productId
              ? { ...p, unit_quantity: p.unit_quantity - 1 }
              : p
          )
        }
      } else {
        return {
          selectedProducts: state.selectedProducts?.filter(
            p => p.id_product !== productId
          )
        }
      }
    }),

  removeProductCompletely: (productId: string) =>
    set((state) => ({
      selectedProducts: state.selectedProducts.filter(
        (product) => product.id_product !== productId
      ),
    })),


  setIsOpenModal: (isOpen: boolean) => set({ isOpen }),
  setActiveTab: (activeTab: string) => set({ activeTab }),
  closeModal: () => set({ isOpen: false, activeTab: "details" }),
}))