import { authClient } from "./auth-client";

type AuthActionResult<TData = unknown> = {
  ok: boolean;
  error?: string;
  data?: TData;
};

function resolveErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function createRedirectHandler(callbackURL?: string) {
  return {
    onSuccess: () => {
      if (callbackURL && typeof window !== "undefined") {
        window.location.href = callbackURL;
      }
    },
  };
}

export async function signUpWithEmail(credentials: {
  email: string;
  password: string;
  name?: string;
  callbackURL?: string;
}): Promise<AuthActionResult> {
  try {
    const normalizedName = credentials.name?.trim() || credentials.email.split("@")[0];

    const result = await authClient.signUp.email(
      {
        email: credentials.email,
        password: credentials.password,
        name: normalizedName,
      },
      createRedirectHandler(credentials.callbackURL)
    );

    return {
      ok: !result.error,
      error: result.error?.message,
      data: result.data,
    };
  } catch (error: unknown) {
    const errorMsg = resolveErrorMessage(error, "Gagal membuat akun. Coba lagi.");
    return {
      ok: false,
      error: errorMsg,
    };
  }
}
