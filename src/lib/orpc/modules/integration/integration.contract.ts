import z from "zod";
import { authed } from "../../os";

export const generatePairingCodeContract = authed
  .route({ method: "POST", path: "/integration/whatsapp/generate-code" })
  .output(
    z.object({
      code: z.string(),
      botNumber: z.string(),
      expiresInMinutes: z.number(),
    })
  );

export const checkIntegrationStatusContract = authed
  .route({ method: "GET", path: "/integration/whatsapp/status" })
  .output(
    z.object({
      isConnected: z.boolean(),
      whatsappNumber: z.string().nullable(),
    })
  );

export const disconnectWhatsappContract = authed
  .route({ method: "POST", path: "/integration/whatsapp/disconnect" })
  .output(
    z.object({
      success: z.boolean(),
    })
  );

export const integrationContract = {
  generatePairingCode: generatePairingCodeContract,
  checkIntegrationStatus: checkIntegrationStatusContract,
  disconnectWhatsapp: disconnectWhatsappContract,
};