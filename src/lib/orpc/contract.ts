import { planetContract } from "./modules/planet/planet.contract";
import { integrationContract } from "./modules/integration/integration.contract";
import { webhookContract } from "./modules/webhook/webhook.contract";

export const contract = {
  planet: planetContract,
  integration: integrationContract,
  webhook: webhookContract,
};