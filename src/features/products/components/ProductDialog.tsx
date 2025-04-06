import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import ProductForm from "./ProductForm";

const ProductDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="h-4 w-4" />
          Añadir producto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Producto</DialogTitle>
          <DialogDescription>Agrega la información básica de un nuevo producto.</DialogDescription>
        </DialogHeader>
        <ProductForm />
      </DialogContent>
    </Dialog>
  )
}

export default ProductDialog;