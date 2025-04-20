import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useProductStore } from "@/app/stores/productStore"
import { Loader2 } from "lucide-react"

/**
 * Diálogo de confirmación para inactivar un producto
 */
export function DeleteAlert() {
  const { inactivateProduct, isLoading, deleteDialogOpen, closeDeleteDialog, productIdToDelete } = useProductStore()

  const handleDelete = async () => {
    if (productIdToDelete !== null) {
      await inactivateProduct(productIdToDelete)
    }
  }

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={closeDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto inactivará permanentemente el producto en la base de datos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Inactivar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
