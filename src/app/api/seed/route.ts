import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { secret } = await request.json()
    
    if (secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.prescription.deleteMany()
    await prisma.appointment.deleteMany()
    await prisma.patient.deleteMany()

    const patient1 = await prisma.patient.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: await bcrypt.hash('password123', 10),
        dateOfBirth: new Date('1985-05-15'),
        phone: '555-0101',
        address: '123 Main St, Springfield, IL 62701'
      }
    })

    const patient2 = await prisma.patient.create({
      data: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: await bcrypt.hash('password123', 10),
        dateOfBirth: new Date('1990-08-22'),
        phone: '555-0102',
        address: '456 Oak Ave, Springfield, IL 62702'
      }
    })

    await prisma.appointment.createMany({
      data: [
        {
          patientId: patient1.id,
          providerName: 'Dr. Sarah Johnson',
          dateTime: new Date('2024-12-20T10:00:00'),
          repeatSchedule: 'Monthly',
          endDate: new Date('2025-06-20'),
          reason: 'Regular checkup'
        },
        {
          patientId: patient2.id,
          providerName: 'Dr. Emily Rodriguez',
          dateTime: new Date('2024-12-22T09:00:00'),
          repeatSchedule: 'Weekly',
          endDate: new Date('2025-03-22'),
          reason: 'Physical therapy'
        }
      ]
    })

    await prisma.prescription.createMany({
      data: [
        {
          patientId: patient1.id,
          medicationName: 'Lisinopril',
          dosage: '10mg',
          quantity: 30,
          refillDate: new Date('2024-12-18'),
          refillSchedule: 'Monthly'
        },
        {
          patientId: patient2.id,
          medicationName: 'Levothyroxine',
          dosage: '75mcg',
          quantity: 30,
          refillDate: new Date('2024-12-19'),
          refillSchedule: 'Monthly'
        }
      ]
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
