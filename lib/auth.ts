import { cookies } from "next/headers"
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/session"

export { SESSION_COOKIE_NAME, SESSION_MAX_AGE, createSessionToken } from "@/lib/session"
export type { SessionPayload } from "@/lib/session"

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value
  if (!token) return null

  try {
    return await verifySessionToken(token)
  } catch {
    return null
  }
}
