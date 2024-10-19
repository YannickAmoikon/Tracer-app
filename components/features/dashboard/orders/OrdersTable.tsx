import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, ListCollapse, MoreHorizontal, Trash2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface Commande {
  reference: string;
  statut: "En cours" | "Acceptée" | "Livrée" | "Annulée";
  client: string;
  montant: number;
  contact: string;
  dateCommande: string;
}

const commandes: Commande[] = [
  {
    reference: "CMD-001",
    statut: "En cours",
    client: "Jean Dupont",
    montant: 499.99,
    contact: "jean.dupont@email.com",
    dateCommande: "2024-03-10 10:42",
  },
  {
    reference: "CMD-002",
    statut: "Acceptée",
    client: "Marie Martin",
    montant: 129.99,
    contact: "marie.martin@email.com",
    dateCommande: "2024-03-09 15:21",
  },
  {
    reference: "CMD-003",
    statut: "Livrée",
    client: "Pierre Durand",
    montant: 39.99,
    contact: "pierre.durand@email.com",
    dateCommande: "2024-03-08 08:15",
  },
  {
    reference: "CMD-004",
    statut: "Annulée",
    client: "Sophie Lefebvre",
    montant: 299.99,
    contact: "sophie.lefebvre@email.com",
    dateCommande: "2024-03-07 23:59",
  },
  {
    reference: "CMD-005",
    statut: "Acceptée",
    client: "Luc Moreau",
    montant: 59.99,
    contact: "luc.moreau@email.com",
    dateCommande: "2024-03-06 00:00",
  },
  {
    reference: "CMD-006",
    statut: "En cours",
    client: "Émilie Rousseau",
    montant: 89.99,
    contact: "emilie.rousseau@email.com",
    dateCommande: "2024-03-05 14:30",
  },
  {
    reference: "CMD-007",
    statut: "Livrée",
    client: "Thomas Bernard",
    montant: 149.99,
    contact: "thomas.bernard@email.com",
    dateCommande: "2024-03-04 09:45",
  },
  {
    reference: "CMD-008",
    statut: "Acceptée",
    client: "Claire Dubois",
    montant: 79.99,
    contact: "claire.dubois@email.com",
    dateCommande: "2024-03-03 11:20",
  },
  {
    reference: "CMD-009",
    statut: "En cours",
    client: "Antoine Leroy",
    montant: 199.99,
    contact: "antoine.leroy@email.com",
    dateCommande: "2024-03-02 16:55",
  },
  {
    reference: "CMD-010",
    statut: "Livrée",
    client: "Isabelle Girard",
    montant: 69.99,
    contact: "isabelle.girard@email.com",
    dateCommande: "2024-03-01 08:30",
  },
  {
    reference: "CMD-011",
    statut: "Acceptée",
    client: "François Lemaire",
    montant: 159.99,
    contact: "francois.lemaire@email.com",
    dateCommande: "2024-02-29 13:45",
  },
  {
    reference: "CMD-012",
    statut: "En cours",
    client: "Céline Petit",
    montant: 109.99,
    contact: "celine.petit@email.com",
    dateCommande: "2024-02-28 10:15",
  },
  {
    reference: "CMD-013",
    statut: "Annulée",
    client: "Julien Roux",
    montant: 49.99,
    contact: "julien.roux@email.com",
    dateCommande: "2024-02-27 17:30",
  },
  {
    reference: "CMD-014",
    statut: "Livrée",
    client: "Aurélie Fontaine",
    montant: 89.99,
    contact: "aurelie.fontaine@email.com",
    dateCommande: "2024-02-26 09:00",
  },
  {
    reference: "CMD-015",
    statut: "Acceptée",
    client: "Mathieu Blanc",
    montant: 129.99,
    contact: "mathieu.blanc@email.com",
    dateCommande: "2024-02-25 14:20",
  },
];

interface OrdersTableProps {
  statusFilter: "all" | "En cours" | "Acceptée" | "Livrée" | "Annulée";
  dateRange: { from: Date | undefined; to: Date | undefined };
  currentPage: number;
  ordersPerPage: number;
  updateTotalFilteredOrders: (total: number) => void;
}

export default function OrdersTable({
  statusFilter,
  dateRange,
  currentPage,
  ordersPerPage,
  updateTotalFilteredOrders,
}: OrdersTableProps): JSX.Element {
  const filteredCommandes = commandes.filter((commande) => {
    const dateCommande = new Date(commande.dateCommande);

    // Filtre par statut
    if (statusFilter !== "all" && commande.statut !== statusFilter) {
      return false;
    }

    // Filtre par plage de dates
    if (dateRange.from && dateRange.to) {
      return dateCommande >= dateRange.from && dateCommande <= dateRange.to;
    }

    return true;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredCommandes.slice(
    indexOfFirstOrder,
    indexOfLastOrder,
  );

  useEffect(() => {
    updateTotalFilteredOrders(filteredCommandes.length);
  }, [filteredCommandes.length, updateTotalFilteredOrders]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Montant</TableHead>
          <TableHead className="hidden md:table-cell">Contact</TableHead>
          <TableHead className="hidden md:table-cell">
            Date de commande
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentOrders.map((commande) => (
          <TableRow key={commande.reference}>
            <TableCell className="font-medium">{commande.reference}</TableCell>
            <TableCell>
              <Badge
                variant={
                  commande.statut === "En cours" ? "secondary" : "outline"
                }
              >
                {commande.statut}
              </Badge>
            </TableCell>
            <TableCell>{commande.client}</TableCell>
            <TableCell>{commande.montant.toFixed(2)} €</TableCell>
            <TableCell className="hidden md:table-cell">
              {commande.contact}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {commande.dateCommande}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <ListCollapse className="w-4 h-4 mr-2" />
                    Détails
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
