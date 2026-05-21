"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { CircleDashed } from "lucide-react"

interface CredentialsLoginForm{
  email: string
  password : string
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const [loginForm, setLoginForm] = useState<CredentialsLoginForm>({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    console.log(loginForm)
    setTimeout(() => {
      setLoginForm({
        email: "",
        password: ""
      })
      setIsSubmitting(false)
    }, 2500)
    
  }
  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Connectez-vous à votre compte</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Saisissez votre e-mail ci-dessous pour vous connecter
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">E-mail</FieldLabel>
          <Input value={loginForm.email} onChange={(event) => setLoginForm({...loginForm, email: event.target.value})} id="email" type="email" placeholder="m@example.com" required />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          </div>
          <Input value={loginForm.password} onChange={(event) => setLoginForm({...loginForm, password: event.target.value})} id="password" type="password" required />
        </Field>
        <Field>
          <Button disabled={isSubmitting} type="submit">{isSubmitting ? <CircleDashed className="animate-spin"/> : "Se connecter"}</Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
