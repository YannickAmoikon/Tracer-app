"use client";

import React, { useState } from "react";
import { File, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrdersDialog from "@/components/features/dashboard/orders/OrdersDialog";
import OrdersTable from "@/components/features/dashboard/orders/OrdersTable";

type StatusFilter = "all" | "En cours" | "Acceptée" | "Livrée" | "Annulée";

export default function OrdersPage(): JSX.Element {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const handleStatusChange = (value: StatusFilter) => {
    setStatusFilter(value);
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="space-x-2">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filtrer
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrer par</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Actif
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Brouillon</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archivé</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="space-x-2">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Exporter
              </span>
            </Button>
            <OrdersDialog />
          </div>
        </div>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Gérez vos commandes et visualisez leurs performances
                commerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable statusFilter={statusFilter} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Affichage <strong>1 - 9</strong> de <strong>32</strong>{" "}
                commandes
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="En cours">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Gérez vos commandes et visualisez leurs performances
                commerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable statusFilter={statusFilter} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Acceptée">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Gérez vos commandes et visualisez leurs performances
                commerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable statusFilter={statusFilter} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Livrée">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Gérez vos commandes et visualisez leurs performances
                commerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable statusFilter={statusFilter} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Annulée">
          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Gérez vos commandes et visualisez leurs performances
                commerciales.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrdersTable statusFilter={statusFilter} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
