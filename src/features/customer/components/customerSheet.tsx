import { useCustumerStore } from "@/app/stores/customerStore";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet"
import { Loader2 } from "lucide-react";


export const CustomerSheet = () => {
  const { sheetOpen, customerData, closeSheet, isLoading} = useCustumerStore()
  
  const isOpen = sheetOpen

  const handleOpenChange = (open: boolean) => {
    if(!open) closeSheet()
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent>
        {isLoading && (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
          <SheetHeader>
            <SheetTitle className="text-center text-2xl font-bold">
               {customerData?.customer_first_name} {customerData?.customer_last_name}
            </SheetTitle>
            <SheetDescription>
              
            </SheetDescription>
          </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}