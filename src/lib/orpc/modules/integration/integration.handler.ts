import { prisma } from "$lib/prisma";
import { WhatsAppClient } from "$lib/services/whatsapp";
import {
  generatePairingCodeContract,
  checkIntegrationStatusContract,
  disconnectWhatsappContract,
} from "./integration.contract";

export const generatePairingCode = generatePairingCodeContract.handler(
  async ({ context }) => {
    const userId = context.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const waClient = new WhatsAppClient();
    const activeSession = await waClient.getRandomActiveSession();

    if (!activeSession) {
      throw new Error(
        "Maaf, layanan bot WhatsApp saat ini sedang tidak tersedia."
      );
    }

    const botNumber = activeSession.jid.split("@")[0];
    const randomString = Math.random()
      .toString(36)
      .substring(2, 7)
      .toUpperCase();
    const code = `ARTHA-${randomString}`;
    const expiresInMinutes = 10;

    await prisma.integration.upsert({
      where: { userId: userId },
      update: {
        type: "WHATSAPP",
        code: code,
        isActive: false,
        accountId: "PENDING",
        botId: botNumber,
      },
      create: {
        userId: userId,
        type: "WHATSAPP",
        botId: botNumber,
        accountId: "PENDING",
        code: code,
        isActive: false,
      },
    });

    return {
      code,
      botNumber,
      expiresInMinutes,
    };
  }
);

export const checkIntegrationStatus = checkIntegrationStatusContract.handler(
  async ({ context }) => {
    const userId = context.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const integration = await prisma.integration.findUnique({
      where: { userId: userId },
    });

    if (
      integration &&
      integration.isActive &&
      integration.type === "WHATSAPP"
    ) {
      return {
        isConnected: true,
        whatsappNumber: integration.accountId,
      };
    }

    return {
      isConnected: false,
      whatsappNumber: null,
    };
  }
);

export const disconnectWhatsapp = disconnectWhatsappContract.handler(
  async ({ context }) => {
    const userId = context.user?.id;

    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Cari integrasi yang aktif dan putuskan
    const integration = await prisma.integration.findUnique({
      where: {
        userId: userId,
      },
    });

    if (integration && integration.type === "WHATSAPP") {
      await prisma.integration.delete({
        where: { id: integration.id },
      });
    }

    return { success: true };
  }
);
