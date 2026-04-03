import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { configureNodeDns } from './dns-config';
import { PrismaClient } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';

configureNodeDns();

function requireEnv(key: 'DATABASE_URL' | 'BETTER_AUTH_SECRET' | 'GOOGLE_CLIENT_ID' | 'GOOGLE_CLIENT_SECRET') {
    const value = process.env[key];
    if (!value) {
        throw new Error(`[auth] Missing required environment variable: ${key}`);
    }

    return value;
}

const databaseUrl = requireEnv('DATABASE_URL');
const betterAuthSecret = requireEnv('BETTER_AUTH_SECRET');
// Menggunakan process.env alih-alih env dari SvelteKit
const betterAuthUrl = process.env.BETTER_AUTH_URL ?? 'http://localhost:5173';

const client = new MongoClient(databaseUrl);
const db = client.db();
const prisma = new PrismaClient();

export { client, db };

export const auth = betterAuth({
    baseURL: betterAuthUrl,
    secret: betterAuthSecret,
    database: prismaAdapter(prisma, {
        provider: 'mongodb',
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            prompt: 'select_account',
            clientId: requireEnv('GOOGLE_CLIENT_ID'),
            clientSecret: requireEnv('GOOGLE_CLIENT_SECRET'),
        },
    },
});
