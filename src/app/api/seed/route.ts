import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const hashedPassword = await bcrypt.hash('password123', 10)

    await prisma.patient.createMany({
      data: [
        {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          password: hashedPassword,
          dateOfBirth: new Date('1985-05-15'),
          phone: '555-0101',
          address: '123 Main St, Springfield, IL 62701'
        },
        {
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@example.com',
          password: hashedPassword,
          dateOfBirth: new Date('1990-08-22'),
          phone: '555-0102',
          address: '456 Oak Ave, Springfield, IL 62702'
        }
      ],
      skipDuplicates: true
    })

    return NextResponse.json({ message: 'Database seeded successfully!' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
