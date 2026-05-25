import { SignJWT, jwtVerify } from "jose"

export const SESSION_COOKIE_NAME = "tracer_session"
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 jours

export type SessionPayload = {
  userId: string
  email: string
  role: string
}

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET
  if (!secret) {
    throw new Error("AUTH_SECRET manquant dans .env")
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getAuthSecret())
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getAuthSecret())
  return payload as SessionPayload
}
