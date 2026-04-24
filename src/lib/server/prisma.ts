import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Ambil tipe data asli dari fungsi di atas
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Gunakan 'as' hanya saat mengakses globalThis agar tidak merusak tipe data export
const prisma: PrismaClientSingleton = (globalThis as any).prisma ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== 'production') {
  (globalThis as any).prisma = prisma;
}