import { useState, useEffect, useCallback } from "react"
import type { Table } from "@tanstack/react-table"
import type { Product } from "@/features/products/types/productTypes"

// Define the type for column visibility state
export type ColumnVisibilityState = Record<string, boolean>

// Define the column metadata for better display
export interface ColumnMeta {
  id: string
  label: string
  description?: string
  defaultVisible: boolean
  canHide: boolean
}

// Define the column metadata for our product table
export const PRODUCT_COLUMNS: ColumnMeta[] = [
  { id: "id_product", label: "ID", defaultVisible: true, canHide: true },
  { id: "product_name", label: "Producto", defaultVisible: true, canHide: false },
  { id: "product_description", label: "Descripción", defaultVisible: true, canHide: true },
  { id: "id_supplier", label: "Proveedor", defaultVisible: true, canHide: true },
  { id: "purchase_price", label: "Precio Compra", defaultVisible: true, canHide: true },
  { id: "product_discount", label: "Descuento", defaultVisible: true, canHide: true },
  { id: "sale_price", label: "Precio Venta", defaultVisible: true, canHide: true },
  { id: "profit_margin", label: "Margen", defaultVisible: true, canHide: true },
  { id: "vat", label: "IVA", defaultVisible: false, canHide: true },
  { id: "product_state", label: "Estado", defaultVisible: true, canHide: true },
  { id: "stock", label: "Stock", defaultVisible: true, canHide: true },
  { id: "actions", label: "Acciones", defaultVisible: true, canHide: false },
]

// Storage key for persisting column visibility
const STORAGE_KEY = "product-table-column-visibility"

/**
 * Custom hook to manage column visibility with persistence
 */
export function useColumnVisibility(table: Table<Product>) {
  // Initialize state from localStorage or defaults
  const [columnVisibility, setColumnVisibility] = useState<ColumnVisibilityState>(() => {
    // Try to load from localStorage
    try {
      const savedVisibility = localStorage.getItem(STORAGE_KEY)
      if (savedVisibility) {
        return JSON.parse(savedVisibility)
      }
    } catch (error) {
      console.error("Error loading column visibility from localStorage:", error)
    }

    // Fall back to defaults if localStorage fails or is empty
    return PRODUCT_COLUMNS.reduce((acc, column) => {
      acc[column.id] = column.defaultVisible
      return acc
    }, {} as ColumnVisibilityState)
  })

  // Apply column visibility to the table when it changes
  useEffect(() => {
    table.setColumnVisibility(columnVisibility)
  }, [table, columnVisibility])

  // Save to localStorage when visibility changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(columnVisibility))
    } catch (error) {
      console.error("Error saving column visibility to localStorage:", error)
    }
  }, [columnVisibility])

  // Toggle a single column's visibility
  const toggleColumnVisibility = useCallback((columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }))
  }, [])

  // Reset all columns to their default visibility
  const resetColumnVisibility = useCallback(() => {
    const defaultVisibility = PRODUCT_COLUMNS.reduce((acc, column) => {
      acc[column.id] = column.defaultVisible
      return acc
    }, {} as ColumnVisibilityState)

    setColumnVisibility(defaultVisibility)
  }, [])

  // Show all columns
  const showAllColumns = useCallback(() => {
    const allVisible = PRODUCT_COLUMNS.reduce((acc, column) => {
      if (column.canHide) {
        acc[column.id] = true
      }
      return acc
    }, {} as ColumnVisibilityState)

    setColumnVisibility((prev) => ({
      ...prev,
      ...allVisible,
    }))
  }, [])

  // Hide all hideable columns
  const hideAllColumns = useCallback(() => {
    const allHidden = PRODUCT_COLUMNS.reduce((acc, column) => {
      if (column.canHide) {
        acc[column.id] = false
      }
      return acc
    }, {} as ColumnVisibilityState)

    setColumnVisibility((prev) => ({
      ...prev,
      ...allHidden,
    }))
  }, [])

  return {
    columnVisibility,
    setColumnVisibility,
    toggleColumnVisibility,
    resetColumnVisibility,
    showAllColumns,
    hideAllColumns,
  }
}
