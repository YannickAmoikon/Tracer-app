"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  LineChart,
  Monitor,
  Package,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ModeToggle from "@/components/features/app/Theme";

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        <div className=" flex items-center justify-center">
          <Image
            className="border"
            alt=""
            src="/images/logo/logo.png"
            width={150}
            height={150}
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Monitor className="h-5 w-5" />
                <span className="sr-only">Tableau de bord</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Tableau de bord</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/orders"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard/orders"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Commandes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Commandes</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/products"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard/products"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Package className="h-5 w-5" />
                <span className="sr-only">Produits</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Produits</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/customers"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard/customers"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Users2 className="h-5 w-5" />
                <span className="sr-only">Clients</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clients</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/analytics"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard/analytics"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <LineChart className="h-5 w-5" />
                <span className="sr-only">Statistiques</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Statistiques</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/settings"
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                  pathname === "/dashboard/settings"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Paramètres</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Paramètres</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ModeToggle />
      </nav>
    </aside>
  );
}
