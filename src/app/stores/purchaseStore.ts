import { create } from "zustand";

interface saleSate {
  isOpen: boolean;
  activeTab: string;

  setActiveTab: (activeTab: string) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  closeModal: () => void;
}



export const usePurchaseStore = create<saleSate>((set) => ({
  isOpen: false,
  activeTab: "details",

  setIsOpenModal: (isOpen: boolean) => set({ isOpen }),
  setActiveTab: (activeTab: string) => set({ activeTab }),
  closeModal: () => set({ isOpen: false, activeTab: "details" }),
}))