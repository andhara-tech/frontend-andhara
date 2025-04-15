import { createProductRequest } from "@/features/products/services/productService";
import { create } from "zustand";

interface ProductState {
  isLoading: boolean;
  error: string | null;
  createProduct: (
    supplier_id: number,
    product_name: string,
    product_description: string,
    purchase_price: number,
    product_discount: number,
    sale_price: number,
    vat: number
  ) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  isLoading: false,
  error: null,
  createProduct: async (
    supplier_id: number,
    product_name: string,
    product_description: string,
    purchase_price: number,
    product_discount: number,
    sale_price: number,
    vat: number
  ) => {
    set({ isLoading: true, error: null });
    try {
      await createProductRequest(
        supplier_id,
        product_name,
        product_description,
        purchase_price,
        product_discount,
        sale_price,
        vat
      );
      set({ isLoading: false });
    } catch (error) {
      set({
        error: "Product creation failed. Please check your credentials and try again.",
        isLoading: false,
      });
    }
  },
}));