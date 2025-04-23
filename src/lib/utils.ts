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
 * Represents a branch of the company.
 * 
 * @property {string} id_branch - Unique identifier for the branch.
 * @property {LocationName} name - The name of the branch, based on predefined locations.
 */
export interface Branch {
  id_branch: string
  name: LocationName
}

/**
 * List of registered branches within the company.
 */
export const BRANCHES: Branch[] = [
  { id_branch: "885d040f-272c-43f4-b5e3-33cbc7692fd0", name: "Sede Bogota" },
  { id_branch: "90a2fc99-1ada-4797-b6c0-b132c5430f90", name: "Sede Valledupar" },
  { id_branch: "fffe60df-52d8-4717-949e-58ed108f998e", name: "Sede Palmira" },
]

/**
 * Represents the possible names of company branches.
 */
export type LocationName = "Sede Valledupar" | "Sede Bogota" | "Sede Palmira"
