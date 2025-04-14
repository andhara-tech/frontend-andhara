import AppSidebar from "@/components/appSidebar"
import SiteHeader from "@/components/siteHeader"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <section className="p-5">
          <Outlet />
        </section>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout