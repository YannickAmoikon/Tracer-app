export type LoginCredentials = {
  email: string
  password: string
}

export type AuthUser = {
  id: string
  email: string
  name: string | null
  role: string
}

export type LoginResponse = {
  user: AuthUser
}

export class AuthServiceError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "AuthServiceError"
    this.status = status
  }
}

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new AuthServiceError(
      data.error ?? "Connexion impossible.",
      response.status
    )
  }

  return data as LoginResponse
}

export async function logout(): Promise<void> {
  const response = await fetch("/api/auth/logout", {
    method: "POST",
  })

  const data = await response.json()

  if (!response.ok) {
    throw new AuthServiceError(
      data.error ?? "Déconnexion impossible.",
      response.status
    )
  }
}