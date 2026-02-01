import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Add salt for better security
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Store as salt:hash
  return `${saltHex}:${hashHex}`;
}

async function main() {
  console.log("Seeding database...");

  // Create default admin user
  const adminPassword = await hashPassword("Admin@123");
  const admin = await prisma.user.upsert({
    where: { mobile: "9944459992" },
    update: {},
    create: {
      mobile: "9944459992",
      name: "Mukil Admin",
      email: "dishhobbycablevisions@gmail.com",
      passwordHash: adminPassword,
      role: "ADMIN",
    },
  });

  console.log("Created admin user:", admin);

  // Create sample packages
  // const package1 = await prisma.package.upsert({
  //   where: { id: 'sample-package-1' },
  //   update: {},
  //   create: {
  //     id: 'sample-package-1',
  //     name: 'Basic Package',
  //     price: 500,
  //     recurringType: 'MONTHLY',
  //   },
  // })

  // const package2 = await prisma.package.upsert({
  //   where: { id: 'sample-package-2' },
  //   update: {},
  //   create: {
  //     id: 'sample-package-2',
  //     name: 'Premium Package',
  //     price: 1000,
  //     recurringType: 'BIMONTHLY',
  //   },
  // })

  // console.log('Created packages:', package1, package2)

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
