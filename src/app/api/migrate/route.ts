import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Patient" (
        "id" TEXT PRIMARY KEY,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "email" TEXT UNIQUE NOT NULL,
        "password" TEXT NOT NULL,
        "dateOfBirth" TIMESTAMP NOT NULL,
        "phone" TEXT NOT NULL,
        "address" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL
      )
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Appointment" (
        "id" TEXT PRIMARY KEY,
        "patientId" TEXT NOT NULL,
        "providerName" TEXT NOT NULL,
        "dateTime" TIMESTAMP NOT NULL,
        "repeatSchedule" TEXT,
        "endDate" TIMESTAMP,
        "reason" TEXT,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL,
        FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE
      )
    `)

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Prescription" (
        "id" TEXT PRIMARY KEY,
        "patientId" TEXT NOT NULL,
        "medicationName" TEXT NOT NULL,
        "dosage" TEXT NOT NULL,
        "quantity" INTEGER NOT NULL,
        "refillDate" TIMESTAMP NOT NULL,
        "refillSchedule" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        "updatedAt" TIMESTAMP NOT NULL,
        FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE
      )
    `)

    return NextResponse.json({ message: 'Tables created successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
