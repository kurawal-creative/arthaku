import { listPlanets } from "./planet";
import { whatsappWebhook } from "./webhook/whatsapp";

export const router = {
  planet: { list: listPlanets },
  webhook: {
    whatsapp: whatsappWebhook,
  },
};
