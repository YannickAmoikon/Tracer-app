import { ReactNode } from "react";
import { AppSidebar } from "@/components/blocks/sidebar/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import Header from "@/components/blocks/header/app-header";

export default function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>

  )

}