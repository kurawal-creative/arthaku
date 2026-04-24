import { prisma } from "$lib/prisma";
import { WhatsAppClient } from "./whatsapp";

export class IntegrationService {
  // 1. Generate kode untuk user di dashboard
  static async createIntegrationCode(
    userId: string,
    type: "WHATSAPP" | "TELEGRAM",
  ) {
    // Generate random 5 digit code
    const waClient = new WhatsAppClient();
    const code = Math.floor(10000 + Math.random() * 90000).toString();

    return await prisma.integration.create({
      data: {
        userId: userId,
        type: type,
        botId: "PENDING",
        accountId: "PENDING",
        code: code,
        isActive: false,
      },
    });
  }

  // 2. Verifikasi saat pesan masuk dari WA/Telegram
  static async verifyCode(code: string, platformId: string, botId: string) {
    const integration = await prisma.integration.findUnique({
      where: { code: code },
    });

    if (!integration || integration.isActive) {
      throw new Error("Kode tidak valid atau sudah digunakan.");
    }

    // Update jadi aktif
    return await prisma.integration.update({
      where: { id: integration.id },
      data: {
        accountId: platformId,
        botId: botId,
        isActive: true,
      },
    });
  }
}
