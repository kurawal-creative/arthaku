import { authClient } from "./auth-client";

type AuthActionResult = {
  ok: boolean;
  error?: string;
};

function resolveErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export async function signOut(): Promise<AuthActionResult> {
  try {
    await authClient.signOut();
    return { ok: true };
  } catch (error: unknown) {
    const errorMsg = resolveErrorMessage(error, "Gagal keluar.");
    return {
      ok: false,
      error: errorMsg,
    };
  }
}
