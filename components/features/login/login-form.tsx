"use client"

import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { CircleDashed } from "lucide-react"
import {
  AuthServiceError,
  login,
  type LoginCredentials,
} from "@/services/auth.service"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter()
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await login(loginForm)
      router.push("/dashboard/general-view")
      router.refresh()
      toast.success("Connexion réussie")
    } catch (err) {
      if (err instanceof AuthServiceError) {
        setError(err.message)
      } else {
        setError("Erreur réseau. Réessayez.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Connectez-vous à votre compte</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Saisissez votre e-mail ci-dessous pour vous connecter
          </p>
        </div>
        {error ? (
          <p className="text-center text-sm text-destructive" role="alert">
            {error}
          </p>
        ) : null}
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input
            value={loginForm.email}
            onChange={(event) =>
              setLoginForm({ ...loginForm, email: event.target.value })
            }
            id="email"
            type="email"
            placeholder="armadaAdmin@tracer.app"
            required
            autoComplete="email"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          </div>
          <Input
            value={loginForm.password}
            onChange={(event) =>
              setLoginForm({ ...loginForm, password: event.target.value })
            }
            id="password"
            type="password"
            required
            autoComplete="current-password"
          />
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <CircleDashed className="animate-spin" />
            ) : (
              "Se connecter"
            )}
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
