// script/test-user.tsx
import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

async function main() {
  // Create tenant user
// Create tenant user
const tenantPassword = await bcrypt.hash('password123', 10);
await prisma.user.create({
  data: {
    roomNumber: '101',
    adminId: 'tenant-101', // Add this - schema expects it
    password: tenantPassword,
    role: 'tenant',
  }
});

// Create admin user  
const adminPassword = await bcrypt.hash('admin123', 10);
await prisma.user.upsert({ // Use upsert to avoid conflicts
  where: { adminId: 'admin' },
  update: {},
  create: {
    roomNumber: 'admin-room', // Add this
    adminId: 'admin',
    password: adminPassword,
    role: 'admin',
  }
});

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());