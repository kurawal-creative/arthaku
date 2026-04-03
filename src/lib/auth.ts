import { betterAuth } from 'better-auth';
import { PrismaClient } from '@prisma/client';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { getRequestEvent } from '$app/server';

function requireEnv(
  key:
    | "DATABASE_URL"
    | "BETTER_AUTH_SECRET"
    | "GOOGLE_CLIENT_ID"
    | "GOOGLE_CLIENT_SECRET",
) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`[auth] Missing required environment variable: ${key}`);
  }

  return value;
}

const betterAuthSecret = requireEnv("BETTER_AUTH_SECRET");
// Menggunakan process.env alih-alih env dari SvelteKit
const betterAuthUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:5173";

const prisma = new PrismaClient();

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
    plugins: [sveltekitCookies(getRequestEvent)],
});
