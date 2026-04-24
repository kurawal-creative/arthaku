import z from "zod";
import { pub } from "../orpc-builder";
import crypto from "crypto";

const WhatsappWebhookSchema = z.record(z.string(), z.any());

export const whatsappWebhook = pub
  .route({ method: "POST", path: "/webhook/whatsapp" })
  .input(WhatsappWebhookSchema)
  .handler(async ({ input, context }) => {
    // 1. Ambil Header
    const signatureHeader = context.headers?.get("x-hub-signature-256");
    if (!signatureHeader) {
      console.error("Ditolak: Tidak ada header signature");
      return { success: false, reason: "Missing signature" };
    }

    // 2. Ambil Secret
    const secret = process.env.WHATSAPP_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Error: WHATSAPP_WEBHOOK_SECRET belum diset di .env");
      return { success: false, reason: "Server config error" };
    }

    // 3. Langsung ubah input oRPC jadi string (Tanpa rawBody)
    const payloadString = JSON.stringify(input);

    // 4. Bikin Hash untuk dicocokkan
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadString, "utf8")
      .digest("hex");

    const receivedSignature = signatureHeader.replace("sha256=", "");

    // 5. Bandingkan
    let isValid = false;
    try {
      isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(receivedSignature, "hex"),
      );
    } catch (error) {
      isValid = false;
    }

    if (!isValid) {
      console.error("Ditolak: Signature salah/tidak cocok");
      return { success: false, reason: "Invalid signature" };
    }

    // !==! ============================= !==!
    // !! LOLOS VALIDASI
    // !==! ============================= !==!

    console.log("✅ Webhook Valid! Event:", input);

    return { success: true };
  });
