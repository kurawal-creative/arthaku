import z from "zod";
import { pub } from "../../os";

export const WhatsappWebhookSchema = z.record(z.string(), z.any());

export const whatsappWebhookContract = pub
  .route({ method: "POST", path: "/webhook/whatsapp" })
  .input(WhatsappWebhookSchema);

export const webhookContract = {
  whatsapp: whatsappWebhookContract,
};