import { notifications } from "@/shared/dataNotification"

import { SidebarTrigger } from "./ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./ui/button"
import { BellDot, Settings } from "lucide-react"

const SiteHeader = () => {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="flex items-center gap-2 lg:gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 data-[state=open]:bg-muted">
                <BellDot className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {
                notifications.data.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="data-[state=open]:bg-muted" asChild>
                    <div className="flex flex-col items-start">
                      <div className="flex text-center gap-x-2">
                        <h2 className="font-medium">{notification.title}</h2>
                        <span className="">{notification.timestamp}</span>
                      </div>
                      <p>{notification.message}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 p-2">
                <Settings />
                Ajustes
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ajustes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="data-[state=open]:bg-muted" asChild>
                <Button variant="ghost" className="w-full text-left">
                  Agregar usuario
                </Button>
              </DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
