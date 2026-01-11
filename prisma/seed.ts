import { PrismaClient } from '@prisma/client'
import * as crypto from 'crypto'

const prisma = new PrismaClient()

async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')
    crypto.pbkdf2(password, salt, 1000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

async function main() {
  console.log('Seeding database...')

  // Create default admin user
  const adminPassword = await hashPassword('Admin@123')
  const admin = await prisma.user.upsert({
    where: { mobile: '9999999999' },
    update: {},
    create: {
      mobile: '9999999999',
      name: 'Admin User',
      email: 'admin@dishhobby.com',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })

  console.log('Created admin user:', admin)

  // Create sample packages
  const package1 = await prisma.package.upsert({
    where: { id: 'sample-package-1' },
    update: {},
    create: {
      id: 'sample-package-1',
      name: 'Basic Package',
      price: 500,
      recurringType: 'MONTHLY',
    },
  })

  const package2 = await prisma.package.upsert({
    where: { id: 'sample-package-2' },
    update: {},
    create: {
      id: 'sample-package-2',
      name: 'Premium Package',
      price: 1000,
      recurringType: 'BIMONTHLY',
    },
  })

  console.log('Created packages:', package1, package2)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

