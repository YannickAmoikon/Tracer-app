"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Save, X } from "lucide-react";
import { useMemo } from "react";

const availableItems = [
  { id: "1", name: "Produit 1", price: 10 },
  { id: "2", name: "Produit 2", price: 20 },
  { id: "3", name: "Produit 3", price: 30 },
  { id: "4", name: "Produit 4", price: 40 },
  { id: "5", name: "Produit 5", price: 50 },
];

const formSchema = z.object({
  customerName: z
    .string()
    .min(2, { message: "Entrer au moins deux caractères." }),
  customerContact: z
    .string()
    .min(2, { message: "Entrer le contact du client." }),
  customerAddress: z
    .string()
    .min(2, { message: "Entrer l'adresse du client." }),
  itemsOrders: z
    .array(
      z.object({
        itemId: z.string().min(1, { message: "Sélectionner un produit" }),
        quantity: z
          .number()
          .min(1, { message: "La quantité doit être au moins 1" }),
      }),
    )
    .min(1, { message: "Sélectionner au moins 1 produit commandé" }),
});

export default function OrdersDialog() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerContact: "",
      customerAddress: "",
      itemsOrders: [{ itemId: "", quantity: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "itemsOrders",
  });

  const watchItemsOrders = useWatch({
    control: form.control,
    name: "itemsOrders",
    defaultValue: [],
  });

  const { totalPrice, itemAmounts } = useMemo(() => {
    let total = 0;
    const amounts = watchItemsOrders.map((item) => {
      const itemPrice =
        availableItems.find((i) => i.id === item?.itemId)?.price || 0;
      const amount = itemPrice * (item?.quantity || 0);
      total += amount;
      return amount.toFixed(2);
    });
    return { totalPrice: total, itemAmounts: amounts };
  }, [watchItemsOrders]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="space-x-2">
          <Plus className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">
            Enregistrer une commande
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle commande</DialogTitle>
          <DialogDescription>
            {"Renseigner le formulaire pour l'enregistrement de la commande"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du client</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Entrer le nom complet du client.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="customerContact"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Contact du client</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Entrer le contact du client.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customerAddress"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Adresse du client</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {" Entrer l'adresse de livraison."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormItem>
              <FormLabel>Produits commandés</FormLabel>
              <FormControl>
                <div className="space-y-4 mt-1.5">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="flex items-center space-x-2 group"
                    >
                      <Select
                        onValueChange={(value) =>
                          form.setValue(`itemsOrders.${index}.itemId`, value)
                        }
                        value={watchItemsOrders[index]?.itemId || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-grow">
                            <SelectValue placeholder="Sélectionner un produit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {availableItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        type="number"
                        placeholder="Quantité"
                        {...form.register(`itemsOrders.${index}.quantity`, {
                          valueAsNumber: true,
                          min: 0,
                          onChange: (e) => {
                            const value = parseInt(e.target.value);
                            if (isNaN(value) || value < 0) {
                              e.target.value = "0";
                            }
                          },
                        })}
                        onKeyDown={(e) => {
                          if (e.key === "-" || e.key === "e") {
                            e.preventDefault();
                          }
                        }}
                        className="w-20"
                        min="0"
                      />
                      <Input
                        type="number"
                        placeholder="Montant"
                        value={itemAmounts[index] || "0.00"}
                        className="w-24"
                        disabled
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="px-2"
                        onClick={() => {
                          if (fields.length > 1) {
                            remove(index);
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-4 border"
                onClick={() => append({ itemId: "", quantity: 0 })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un produit
              </Button>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Prix total de la commande</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={totalPrice.toFixed(2)}
                  className="w-32"
                  disabled
                />
              </FormControl>
            </FormItem>
          </form>
        </Form>
        <DialogFooter>
          <Button
            size="sm"
            onClick={form.handleSubmit(onSubmit)}
            className="space-x-2"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Enregistrer</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
