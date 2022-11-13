import { PrismaClient } from "@prisma/client";
import Redis from "ioredis";

// add prisma to the NodeJS global type
declare global {
  var prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development

const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"]
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const redis = new Redis(process.env.REDIS_URL as string);

export default prisma;
