import { env } from "$env/dynamic/private";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { configureNodeDns } from "./dns-config";

configureNodeDns();

function requireEnv(key: "DATABASE_URL" | "BETTER_AUTH_SECRET" | "GOOGLE_CLIENT_ID" | "GOOGLE_CLIENT_SECRET") {
  const value = env[key];
  if (!value) {
    throw new Error(`[auth] Missing required environment variable: ${key}`);
  }

  return value;
}

const databaseUrl = requireEnv("DATABASE_URL");
const betterAuthSecret = requireEnv("BETTER_AUTH_SECRET");
const betterAuthUrl = env.BETTER_AUTH_URL ?? "http://localhost:5173";

const client = new MongoClient(databaseUrl);
const db = client.db();

export { client, db };

export const auth = betterAuth({
  secret: betterAuthSecret,
  database: mongodbAdapter(db, { client }),
  baseURL: betterAuthUrl,
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: requireEnv("GOOGLE_CLIENT_ID"),
      clientSecret: requireEnv("GOOGLE_CLIENT_SECRET"),
    },
  },
  emailAndPassword: { enabled: true },
});
