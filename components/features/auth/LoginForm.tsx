import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const description =
  "A login page with two columns. The first column has the login form with email and password. There's a Forgot your passwork link and a link to sign up if you do not have an account. The second column has a cover image.";

export default function LoginForm() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        <div className="w-full max-w-[350px] px-4">
          <div className="grid gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Connexion</h1>
              <p className="text-balance text-muted-foreground">
                Entrez votre email ci-dessous pour vous connecter à votre compte
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemple.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
              <Button variant="outline" className="w-full">
                Se connecter avec Google
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Vous n&apos;avez pas de compte ?{" "}
              <Link href="#" className="underline">
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-1/2 lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/images/login/Login.webp"
            alt="Image"
            layout="fill"
            objectFit="cover"
            className="dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
