import type { JsonifiedClient } from "@orpc/openapi-client";
import { OpenAPILink } from "@orpc/openapi-client/fetch";
import { createORPCClient } from "@orpc/client";
import type { router } from "./index";
import type { RouterClient } from "@orpc/server";
import { contract } from "./contract";

declare global {
  var $client: JsonifiedClient<RouterClient<typeof router>> | undefined;
}

const link = new OpenAPILink(contract, {
  url: () => {
    if (typeof window === "undefined") {
      throw new Error("OpenAPILink is not allowed on the server side.");
    }
    return `${window.location.origin}/api`;
  },
});

export const client: JsonifiedClient<RouterClient<typeof router>> =
  globalThis.$client ?? createORPCClient(link);