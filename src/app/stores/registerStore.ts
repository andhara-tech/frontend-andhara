import { registerRequest } from "@/features/auth/services/registerService";
import { create } from "zustand";

interface RegisterState {
  isLoading: boolean;
  error: string | null;
  register: (email: string, password: string, role:string) => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  isLoading: false,
  error: null,
  register: async (email: string, password: string, role:string) => {
    set({ isLoading: true, error: null });
    await registerRequest(email, password, role);
    try {
      set({
        isLoading: false,
      });
    } catch (error) {
      set({
        error: "Register failed. Please check your credentials and try again.",
        isLoading: false,
      });
    }
  }
}))