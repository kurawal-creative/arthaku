import dns from "node:dns";

declare global {
  // Guard to avoid resetting DNS config multiple times across hot reloads.
  // eslint-disable-next-line no-var
  var __dnsConfigured: boolean | undefined;
}

function getDnsServersFromEnv(): [string, ...string[]] | null {
  const configured = process.env.DNS_SERVERS?.split(",")
    .map((server) => server.trim())
    .filter(Boolean);

  if (configured && configured.length > 0) {
    return configured as [string, ...string[]];
  }

  return null;
}

export function configureNodeDns(): void {
  if (globalThis.__dnsConfigured) {
    return;
  }

  dns.setDefaultResultOrder("ipv4first");

  // Production-safe: only override resolver when explicitly configured.
  const dnsServers = getDnsServersFromEnv();
  if (dnsServers) {
    dns.setServers(dnsServers);
  }

  globalThis.__dnsConfigured = true;
}
