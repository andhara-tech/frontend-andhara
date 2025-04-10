import { ContextMenu, ContextMenuContent, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Dialog } from "@/components/ui/dialog";

const RegisterForm = () => {
  return(
    <Dialog>
      <ContextMenu>
        <ContextMenuTrigger>Registar usuario</ContextMenuTrigger>
        <ContextMenuContent>
          
        </ContextMenuContent>
      </ContextMenu>
    </Dialog>
  )
}

export default RegisterForm;