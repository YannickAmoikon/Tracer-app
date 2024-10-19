import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit, MoreHorizontal, Trash2Icon } from "lucide-react";
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
    dateCommande: "2023-07-12 10:42",
  },
  {
    reference: "CMD-002",
    statut: "Acceptée",
    client: "Marie Martin",
    montant: 129.99,
    contact: "marie.martin@email.com",
    dateCommande: "2023-10-18 15:21",
  },
  {
    reference: "CMD-003",
    statut: "Livrée",
    client: "Pierre Durand",
    montant: 39.99,
    contact: "pierre.durand@email.com",
    dateCommande: "2023-11-29 08:15",
  },
  {
    reference: "CMD-004",
    statut: "Annulée",
    client: "Sophie Lefebvre",
    montant: 2.99,
    contact: "sophie.lefebvre@email.com",
    dateCommande: "2023-12-25 23:59",
  },
  {
    reference: "CMD-005",
    statut: "Acceptée",
    client: "Luc Moreau",
    montant: 59.99,
    contact: "luc.moreau@email.com",
    dateCommande: "2024-01-01 00:00",
  },
  {
    reference: "CMD-006",
    statut: "En cours",
    client: "Émilie Rousseau",
    montant: 89.99,
    contact: "emilie.rousseau@email.com",
    dateCommande: "2024-01-15 14:30",
  },
  {
    reference: "CMD-007",
    statut: "Livrée",
    client: "Thomas Bernard",
    montant: 149.99,
    contact: "thomas.bernard@email.com",
    dateCommande: "2024-01-20 09:45",
  },
  {
    reference: "CMD-008",
    statut: "Acceptée",
    client: "Claire Dubois",
    montant: 79.99,
    contact: "claire.dubois@email.com",
    dateCommande: "2024-02-01 11:20",
  },
  {
    reference: "CMD-009",
    statut: "En cours",
    client: "Antoine Leroy",
    montant: 199.99,
    contact: "antoine.leroy@email.com",
    dateCommande: "2024-02-10 16:55",
  },
];

interface OrdersTableProps {
  statusFilter: "all" | "En cours" | "Acceptée" | "Livrée" | "Annulée";
}

export default function OrdersTable({
  statusFilter,
}: OrdersTableProps): JSX.Element {
  const filteredCommandes = commandes.filter(
    (commande) => statusFilter === "all" || commande.statut === statusFilter,
  );

  console.log("Status Filter:", statusFilter);
  console.log("Filtered Commandes:", filteredCommandes);

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
        {filteredCommandes.map((commande) => (
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
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trash2Icon className="h-4 w-4 mr-2" />
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
