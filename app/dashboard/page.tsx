"use client";
import {
  TrendingUp,
  ShoppingCart,
  Package,
  Users2,
  WalletMinimal,
} from "lucide-react";
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const chartData = [
  { mois: "Janvier", electronique: 4000, vetements: 2400, alimentation: 1800 },
  { mois: "Février", electronique: 3000, vetements: 1398, alimentation: 2200 },
  { mois: "Mars", electronique: 2000, vetements: 4800, alimentation: 2900 },
  { mois: "Avril", electronique: 2780, vetements: 3908, alimentation: 1500 },
  { mois: "Mai", electronique: 1890, vetements: 4800, alimentation: 2300 },
  { mois: "Juin", electronique: 2390, vetements: 3800, alimentation: 2500 },
];

export default function DashboardHome() {
  return (
    <div className="flex flex-col space-y-8 h-min w-full flex-1">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
            <WalletMinimal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">174 235 FCFA</div>
            <p className="text-xs text-muted-foreground">
              +15.3% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">137</div>
            <p className="text-xs text-muted-foreground">
              +22 par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              +8 par rapport au mois dernier
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              +3 depuis la dernière heure
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Graphique - Rendement / Catégories</CardTitle>
              <CardDescription className="text-xs">
                Janvier - Juin 2024
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis
                      dataKey="mois"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                        color: "hsl(var(--foreground))",
                      }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "20px",
                      }}
                    />
                    <Bar
                      dataKey="electronique"
                      fill="hsl(210, 80%, 55%)"
                      radius={[4, 4, 0, 0]}
                    />{" "}
                    {/* Bleu plus foncé */}
                    <Bar
                      dataKey="vetements"
                      fill="hsl(25, 80%, 55%)"
                      radius={[4, 4, 0, 0]}
                    />{" "}
                    {/* Orange plus foncé */}
                    <Bar
                      dataKey="alimentation"
                      fill="hsl(120, 60%, 55%)"
                      radius={[4, 4, 0, 0]}
                    />{" "}
                    {/* Vert plus foncé */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 font-medium text-xs leading-none">
                Tendance à la hausse de 7.8% ce mois-ci{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="leading-none text-xs  text-muted-foreground">
                Affichage du nombre total de visiteurs pour les 6 derniers mois
              </div>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Dernières commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Olivier Martin
                    </p>
                    <p className="text-sm text-muted-foreground">
                      olivier.martin@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge>En cours</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Julie Dubois
                    </p>
                    <p className="text-sm text-muted-foreground">
                      julie.dubois@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant="outline">Livrée</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                    <AvatarFallback>WL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      William Lefebvre
                    </p>
                    <p className="text-sm text-muted-foreground">
                      william.lefebvre@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge>En cours</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Sophie Berger
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sophie.berger@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant="outline">Livrée</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                    <AvatarFallback>TM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Thomas Mercier
                    </p>
                    <p className="text-sm text-muted-foreground">
                      thomas.mercier@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge>En cours</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/06.png" alt="Avatar" />
                    <AvatarFallback>CL</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Claire Laurent
                    </p>
                    <p className="text-sm text-muted-foreground">
                      claire.laurent@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge>En cours</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Sophie Berger
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sophie.berger@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant="outline">Livrée</Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                    <AvatarFallback>SB</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Sophie Berger
                    </p>
                    <p className="text-sm text-muted-foreground">
                      sophie.berger@example.com
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant="outline">Livrée</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
