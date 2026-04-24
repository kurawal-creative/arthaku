import crypto from "crypto";
import { prisma } from "$lib/prisma";
import { whatsappWebhookContract } from "./webhook.contract";

export const whatsappWebhook = whatsappWebhookContract.handler(
  async ({ input, context }) => {
    const signatureHeader = context.headers?.get("x-hub-signature-256");
    if (!signatureHeader) {
      console.error("Ditolak: Tidak ada header signature");
      return { success: false, reason: "Missing signature" };
    }

    const secret = process.env.WHATSAPP_WEBHOOK_SECRET;
    if (!secret) {
      console.error("Error: WHATSAPP_WEBHOOK_SECRET belum diset di .env");
      return { success: false, reason: "Server config error" };
    }

    const payloadString = JSON.stringify(input);

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(payloadString, "utf8")
      .digest("hex");

    const receivedSignature = signatureHeader.replace("sha256=", "");

    let isValid = false;
    try {
      isValid = crypto.timingSafeEqual(
        Buffer.from(expectedSignature, "hex"),
        Buffer.from(receivedSignature, "hex")
      );
    } catch (error) {
      isValid = false;
    }

    if (!isValid) {
      console.error("Ditolak: Signature salah/tidak cocok");
      return { success: false, reason: "Invalid signature" };
    }

    const eventType = input.event;
    const payload = input.payload;

    if (eventType === "message" && payload && !payload.is_from_me) {
      const textMessage = payload.body?.trim().toUpperCase();
      const senderNumber = payload.from;

      if (textMessage && textMessage.startsWith("ARTHA-")) {
        const pendingIntegration = await prisma.integration.findUnique({
          where: { code: textMessage },
        });

        if (pendingIntegration && !pendingIntegration.isActive) {
          const createdAtTime = pendingIntegration.createdAt.getTime();
          const now = Date.now();
          const diffInMinutes = (now - createdAtTime) / (1000 * 60);

          if (diffInMinutes <= 10) {
            await prisma.integration.update({
              where: { id: pendingIntegration.id },
              data: {
                accountId: senderNumber,
                isActive: true,
              },
            });

            console.log(
              `✅ Sukses pairing WA ${senderNumber} untuk user ${pendingIntegration.userId}`
            );
          } else {
            console.log("❌ Kode pairing sudah kedaluwarsa.");
          }
        } else {
          console.log("❌ Kode tidak ditemukan atau sudah aktif.");
        }
      }
    }

    return { success: true };
  }
);
