import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Represents sorting options for a list of products.
 * 
 * @property {string} field - Field name to sort by.
 * @property {"asc" | "desc"} direction - Sorting direction, either ascending or descending.
 */
export interface SortOption {
  field: string
  direction: "asc" | "desc"
}


/**
 * Represents the possible names of company branches.
 */

export const formaterDate = (date: string): string  =>{
  if(!date) return ""
  const months = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];

  const [age, month, day] = date.split("-");

  const numeroMes = parseInt(month, 10);
  if (numeroMes < 1 || numeroMes > 12) {
    throw new Error("Mes inválido en la fecha");
  }

  const nameMonth = months[numeroMes - 1];

  return `${day}/${nameMonth}/${age}`;
}