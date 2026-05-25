"use client"

import * as React from "react"
import {
  UsersRound,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  Monitor
} from "lucide-react"

import { NavMain } from "@/components/blocks/sidebar/nav-main"
import { NavUser } from "@/components/blocks/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Vue générale",
      url: "#",
      icon: Monitor,
      isActive: true,
    },
    {
      title: "Clients",
      url: "#",
      icon: UsersRound,
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Équipe",
          url: "#",
        },
        {
          title: "Facturation",
          url: "#",
        },
        {
          title: "Limites",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Assistance",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Commentaires",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Ingénierie design",
      url: "#",
      icon: Frame,
    },
    {
      name: "Ventes et marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Voyages",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Tracer App</span>
                  <span className="truncate text-xs">ARMADA CORP Entreprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
