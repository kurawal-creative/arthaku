<script lang="ts">
  import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
  import SendIcon from "@lucide/svelte/icons/send";
  import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { client } from "$lib/orpc/client";
  import { onMount } from "svelte";

  let loading = $state(true);
  let telegramConnected = $state(false);

  let integrationData = $state({
    isConnected: false,
    whatsappNumber: null as string | null,
  });

  let pairingData = $state({
    code: "",
    botNumber: "",
    showPairing: false,
  });

  // Fungsi cek status (Polling)
  async function refreshStatus() {
    try {
      const res = await client.integration.checkIntegrationStatus();
      integrationData.isConnected = res.isConnected;
      integrationData.whatsappNumber = res.whatsappNumber;

      // Jika sudah connect, stop tampilan pairing
      if (res.isConnected) {
        pairingData.showPairing = false;
      }
    } catch (e) {
      console.error("Polling error:", e);
    } finally {
      loading = false;
    }
  }

  // Effect untuk Auto-Refresh setiap 5 detik saat sedang proses pairing
  $effect(() => {
    if (pairingData.showPairing && !integrationData.isConnected) {
      const interval = setInterval(refreshStatus, 5000); // Cek setiap 5 detik
      return () => clearInterval(interval);
    }
  });

  async function handleConnectWhatsapp() {
    try {
      const res = await client.integration.generatePairingCode();
      pairingData.code = res.code;
      pairingData.botNumber = res.botNumber;
      pairingData.showPairing = true;
    } catch (e: any) {
      alert(e.message || "Gagal");
    }
  }

  async function handleDisconnectWhatsapp() {
    try {
      loading = true;
      const res = await client.integration.disconnectWhatsapp();
      if (res.success) {
        integrationData.isConnected = false;
        integrationData.whatsappNumber = null;
        pairingData.showPairing = false;
        pairingData.code = "";
      }
    } catch (e: any) {
      alert(e.message || "Gagal disconnect");
    } finally {
      loading = false;
    }
  }

  // Perbaikan pada logic waLink agar nomornya bersih
  const waLink = $derived(() => {
    // Ambil data nomor dari status integrasi atau dari pairing data
    let rawNum = integrationData.isConnected
      ? integrationData.whatsappNumber
      : pairingData.botNumber;

    // Jika tidak ada nomor, kembalikan link kosong
    if (!rawNum) return "#";

    // BERSIHKAN NOMOR: hapus '@s.whatsapp.net' atau karakter non-digit lainnya
    const cleanNum = rawNum.split("@")[0].replace(/\D/g, "");

    const text = integrationData.isConnected
      ? encodeURIComponent("Aku mau menabung 10rb nih")
      : encodeURIComponent(pairingData.code);

    return `https://wa.me/${cleanNum}?text=${text}`;
  });

  onMount(refreshStatus);
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
  <div
    class="space-y-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <div class="rounded-lg bg-muted/60 p-2 text-foreground">
          <MessageCircleIcon class="h-4 w-4" />
        </div>
        <div>
          <p class="text-sm font-semibold text-foreground">WhatsApp</p>
          <p class="text-xs text-muted-foreground">
            {integrationData.isConnected
              ? `+${integrationData.whatsappNumber}`
              : "Belum tersambung"}
          </p>
        </div>
      </div>
      <Badge variant={integrationData.isConnected ? "default" : "secondary"}>
        {integrationData.isConnected ? "Connected" : "Disconnected"}
      </Badge>
    </div>

    {#if integrationData.isConnected}
      <div class="flex gap-2">
        <Button variant="outline" class="flex-1 rounded-xl" onclick={handleDisconnectWhatsapp} disabled={loading}>
          {loading ? "Disconnecting..." : "Disconnect"}
        </Button>
        <Button href={waLink()} target="_blank" class="flex-1 rounded-xl gap-2">
          Buka Chat <ExternalLinkIcon class="h-4 w-4" />
        </Button>
      </div>
    {:else if pairingData.showPairing}
      <div
        class="rounded-xl bg-primary/5 p-3 text-center space-y-3 border border-primary/20"
      >
        <div class="space-y-1">
          <p
            class="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter"
          >
            Kirim ke nomor bot:
          </p>
          <p class="text-lg font-bold text-primary">{pairingData.code}</p>
        </div>

        <Button
          href={waLink()}
          target="_blank"
          size="sm"
          class="w-full rounded-lg gap-2"
        >
          Kirim Kode Sekarang
          <ExternalLinkIcon class="h-3 w-3" />
        </Button>

        <div class="flex items-center justify-center gap-2">
          <div class="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"></div>
          <p class="text-[10px] text-muted-foreground italic">
            Menunggu konfirmasi bot...
          </p>
        </div>
      </div>
    {:else}
      <Button
        variant="default"
        class="w-full rounded-xl"
        disabled={loading}
        onclick={handleConnectWhatsapp}
      >
        {loading ? "Checking..." : "Connect WhatsApp"}
      </Button>
    {/if}
  </div>

  <div
    class="space-y-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-2.5">
        <div class="rounded-lg bg-muted/60 p-2 text-foreground">
          <SendIcon class="h-4 w-4" />
        </div>
        <div>
          <p class="text-sm font-semibold text-foreground">Telegram</p>
          <p class="text-xs text-muted-foreground">
            {telegramConnected ? "@arthaku_bot linked" : "Belum tersambung"}
          </p>
        </div>
      </div>
      <Badge variant={telegramConnected ? "default" : "outline"}>
        {telegramConnected ? "Connected" : "Disconnected"}
      </Badge>
    </div>
    <Button
      variant={telegramConnected ? "outline" : "default"}
      class="w-full rounded-xl text-white"
      onclick={() => (telegramConnected = !telegramConnected)}
    >
      {telegramConnected ? "Disconnect" : "Connect"}
    </Button>
  </div>
</div>
