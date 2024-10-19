"use client";

import React, { useState } from "react";
import { File, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import OrdersDialog from "@/components/features/dashboard/orders/OrdersDialog";
import OrdersTable from "@/components/features/dashboard/orders/OrdersTable";

type StatusFilter = "all" | "En cours" | "Acceptée" | "Livrée" | "Annulée";

export default function OrdersPage(): JSX.Element {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFilteredOrders, setTotalFilteredOrders] = useState(0);
  const [dateRange, setDateRange] = useState<{
    from: Date | null;
    to: Date | null;
  }>({
    from: null,
    to: null,
  });
  const ordersPerPage = 8;

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const updateTotalFilteredOrders = (total: number) => {
    setTotalFilteredOrders(total);
  };

  return (
    <>
      <Tabs
        defaultValue="all"
        onValueChange={(value) => handleStatusChange(value as StatusFilter)}
      >
        <div className="flex items-center">
          <TabsList className="mb-4">
            <TabsTrigger value="all">Toutes</TabsTrigger>
            <TabsTrigger value="En cours">En cours</TabsTrigger>
            <TabsTrigger value="Acceptée">Acceptées</TabsTrigger>
            <TabsTrigger value="Livrée">Livrées</TabsTrigger>
            <TabsTrigger value="Annulée">Annulées</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="space-x-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "P", { locale: fr })} -{" "}
                          {format(dateRange.to, "P", { locale: fr })}
                        </>
                      ) : (
                        format(dateRange.from, "P", { locale: fr })
                      )
                    ) : (
                      "Filtrer par dates"
                    )}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <CalendarComponent
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) =>
                    setDateRange(range || { from: null, to: null })
                  }
                  locale={fr}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button size="sm" variant="outline" className="space-x-2">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exporter
              </span>
            </Button>
            <OrdersDialog />
          </div>
        </div>
        {["all", "En cours", "Acceptée", "Livrée", "Annulée"].map((status) => (
          <TabsContent key={status} value={status}>
            <Card>
              <CardHeader>
                <CardTitle>Commandes</CardTitle>
                <CardDescription>
                  Gérez vos commandes et visualisez leurs performances
                  commerciales.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <OrdersTable
                  statusFilter={statusFilter}
                  dateRange={dateRange}
                  currentPage={currentPage}
                  ordersPerPage={ordersPerPage}
                  updateTotalFilteredOrders={updateTotalFilteredOrders}
                />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="text-xs text-muted-foreground">
                  Affichage{" "}
                  <strong>
                    {totalFilteredOrders > 0
                      ? (currentPage - 1) * ordersPerPage + 1
                      : 0}{" "}
                    -{" "}
                    {Math.min(currentPage * ordersPerPage, totalFilteredOrders)}
                  </strong>{" "}
                  de <strong>{totalFilteredOrders}</strong> commandes
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={
                      currentPage * ordersPerPage >= totalFilteredOrders
                    }
                  >
                    Suivant
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}
