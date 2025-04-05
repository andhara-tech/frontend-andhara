import { House, LogOut, Store, Users } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu} from "./ui/sidebar";
import { Link } from "react-router-dom";
import NavMain from "./navMain";

const data = [
  {
    title: "Dashboard",
    icon: House,
    url: "/dashboard"
  },
  {
    title: "Clients",
    icon: Users,
    url: "/clients"
  },
  {
    title: "Products",
    icon: Store,
    url: "/products"
  }
]
const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <Link to={"/"}>
            <img src="./img/logo-negative.svg" alt="Andhara logo" className="h-10 w-10" />
          </Link>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data} />
      </SidebarContent>
      <SidebarFooter>
        <LogOut className="text-primary" />
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar