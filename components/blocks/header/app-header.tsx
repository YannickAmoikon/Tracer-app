"use client"

import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
  import {SidebarTrigger} from "@/components/ui/sidebar"
  import { Separator } from "@/components/ui/separator"

function formatSegment(segment: string) {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export default function Header() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const rootSegment = segments[0]
  const pageSegment = segments.length > 1 ? segments.at(-1) : null

  return (
        <>
         <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  {rootSegment ? (
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbPage>
                        {formatSegment(rootSegment  === "dashboard" ? "Tableau de bord" : "")}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : null}
                  {pageSegment ? (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {formatSegment(pageSegment  === "general-view" ? "Vue générale" : "")}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  ) : null}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
        </>
    )
}