import { PrismaClient } from "@prisma/client";

declare global {
    // Add explicit typing for all models
    var db: PrismaClient<{
        log: ['query', 'info', 'warn', 'error']
    }> | undefined;
}

export const db = globalThis.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.db = db;
