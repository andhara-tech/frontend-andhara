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