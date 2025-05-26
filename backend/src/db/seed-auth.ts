import { hashPassword } from "../utils/auth";

import { prisma } from ".";

async function main() {
  const adminPassword = await hashPassword("admin123");
  const admin = await prisma.user.upsert({
    where: { email: "admin@mobilemart.com" },
    update: {},
    create: {
      email: "admin@mobilemart.com",
      name: "Admin User",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  const userPassword = await hashPassword("user123");
  const user = await prisma.user.upsert({
    where: { email: "user@mobilemart.com" },
    update: {},
    create: {
      email: "user@mobilemart.com",
      name: "Test User",
      password: userPassword,
      role: "USER",
    },
  });

  console.log({ admin, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
