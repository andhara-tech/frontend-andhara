import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react"
import CLientForm from "./ClientForm"


export const ClientDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus className="h-4 w-4" />
          Añadir cliente  
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Añadir Cliente</DialogTitle>
          <DialogDescription>Agrega la información básica de un nuevo cliente.</DialogDescription>
        </DialogHeader>
        <CLientForm/>
      </DialogContent>
    </Dialog>
  )
}