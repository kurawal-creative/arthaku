import { createAuthClient } from "better-auth/svelte";

export const authClient = createAuthClient();

export async function signInWithGoogle(callbackURL = "/dashboard") {
  return authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
}
