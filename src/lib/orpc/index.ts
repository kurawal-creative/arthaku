import { planetRouter } from "./modules/planet/planet.router";
import { integrationRouter } from "./modules/integration/integration.router";
import { webhookRouter } from "./modules/webhook/webhook.router";

export const router = {
  planet: planetRouter,
  integration: integrationRouter,
  webhook: webhookRouter,
};

