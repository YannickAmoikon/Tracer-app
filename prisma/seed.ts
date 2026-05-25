import "dotenv/config"
import { hash } from "bcryptjs"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../app/generated/prisma/client"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "armadaAdmin@tracer.app"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const ADMIN_NAME = process.env.ADMIN_NAME ?? "Admin Armada"

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL manquant dans .env")
  }
  if (!ADMIN_PASSWORD) {
    throw new Error("ADMIN_PASSWORD manquant dans .env")
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
  const prisma = new PrismaClient({ adapter })

  const hashedPassword = await hash(ADMIN_PASSWORD, 12)

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      password: hashedPassword,
      role: "ADMIN",
      name: ADMIN_NAME,
    },
    create: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
      name: ADMIN_NAME,
    },
  })

  console.log(`Admin créé ou mis à jour : ${admin.email} (${admin.role})`)

  await prisma.$disconnect()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
