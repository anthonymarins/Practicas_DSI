import { PrismaClient } from '@prisma/client';
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');
  console.log('Cleaning existing data...');
  await prisma.user.deleteMany();
  console.log('Users deleted');
  await prisma.tenant.deleteMany();
  console.log('Tenants deleted');

  console.log('Creating tenants...');
  const hash = await bcrypt.hash('123456', 10);
  
  await prisma.tenant.create({
    data: {
      name: 'Tech Solutions',
      users: {
        create: {
          email: 'admin@techsolutions.com',
          name: 'Admin',
          password: hash
        }
      }
    }
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });