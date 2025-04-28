import { DocumentType } from "@/shared/static";

export interface Branch {
  id_branch: string;
  branch_name: string;
  manager_name: string;
  branch_address: string;
  city_name: string;
  department_name: string;
}

export interface Last_purchase{
  id_purchase: string;
  purchase_date: string; // Considera usar Date si lo conviertes
  purchase_duration: number;
  next_purchase_date: string; // Considera usar Date si lo conviertes
  total_purchase: number;
  products: any[];
}

export interface Customer {
  customer_document: string;
  document_type: DocumentType;
  customer_first_name: string;
  customer_last_name: string;
  phone_number: string;
  email: string;
  home_address: string;
  customer_state: boolean;
  branch: Branch;
  last_purchase: Last_purchase
}

export interface CustomerRequest{
  customer_document: string;
  document_type: string;
  customer_first_name: string;
  customer_last_name: string;
  phone_number: string;
  email: string;
  home_address: string;
  customer_state: boolean;
  id_branch: string | null;
}


export interface CustomerTableFilters {
  document_type: string | null;
  customer_document: string | null;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  customer_address: string | null;
  branch: Branch | null;
  customer_state: boolean | null;
  minPurchase: number | null;
  maxPurchase: number | null;
  minDuration: number | null;
  maxDuration: number | null;
}

export const types = ['CC', 'TI', 'CE', 'NIT', 'PASS'] as const; //Duplicado