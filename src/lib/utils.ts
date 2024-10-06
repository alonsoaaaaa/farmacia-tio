import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
//export in lib/db.ts
import { PrismaClient } from "@prisma/client";
const prismaClientSingleton = () => {
  return new PrismaClient();
};
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
export default prisma;

if (process.env.NODE_ENV == "production") globalForPrisma.prisma = prisma;

interface MedicineItem {
  id: string;
  name: string;
  make: string;
  description: string;
  price: number;
  price2: number;
  price3: number;
  stock: number;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}
