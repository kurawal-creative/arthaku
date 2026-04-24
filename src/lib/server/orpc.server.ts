import { createJsonifiedRouterClient } from "@orpc/openapi";
import { getRequestEvent } from "$app/server";
import { auth } from "./auth"; // better-auth instance
import { router } from "./router";

if (typeof window !== "undefined") {
  throw new Error("This file should only be imported on the server");
}

globalThis.$client = createJsonifiedRouterClient(router, {
  context: async () => {
    const event = getRequestEvent();
    const authSession = await auth.api.getSession({
      headers: event.request.headers,
    });

    return {
      user: authSession?.user ?? undefined,
      session: authSession?.session ?? undefined,
    };
  },
});
