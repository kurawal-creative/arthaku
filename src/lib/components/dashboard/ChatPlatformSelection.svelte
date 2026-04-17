<script lang="ts">
  import MessageCircleIcon from "@lucide/svelte/icons/message-circle";
  import SendIcon from "@lucide/svelte/icons/send";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";

  let whatsappConnected = $state(true);
  let telegramConnected = $state(false);

  function toggleWhatsapp() {
    whatsappConnected = !whatsappConnected;
  }

  function toggleTelegram() {
    telegramConnected = !telegramConnected;
  }
</script>

<div class="space-y-4 overflow-hidden rounded-2xl bg-card p-4 shadow-sm">
  <div>
    <h2 class="text-base font-semibold text-foreground">Platform Chat</h2>
    <p class="text-sm text-muted-foreground">Pilih channel komunikasi yang ingin kamu hubungkan.</p>
  </div>

  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
    <!-- WhatsApp -->
    <div class="space-y-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="rounded-lg bg-muted/60 p-2 text-foreground">
            <MessageCircleIcon class="h-4 w-4" />
          </div>

          <div>
            <p class="text-sm font-semibold text-foreground">WhatsApp</p>
            <p class="text-xs text-muted-foreground">{whatsappConnected ? "+62 812-xxx" : "Belum tersambung"}</p>
          </div>
        </div>

        <Badge variant={whatsappConnected ? "default" : "secondary"}>
          {whatsappConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <Button variant={whatsappConnected ? "outline" : "default"} class="w-full rounded-xl" onclick={toggleWhatsapp}>
        {whatsappConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>

    <!-- Telegram -->
    <div class="space-y-4 rounded-2xl border border-border/70 bg-card p-4 shadow-sm">
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <div class="rounded-lg bg-muted/60 p-2 text-foreground">
            <SendIcon class="h-4 w-4" />
          </div>

          <div>
            <p class="text-sm font-semibold text-foreground">Telegram</p>
            <p class="text-xs text-muted-foreground">{telegramConnected ? "@arthaku_bot linked" : "Belum tersambung"}</p>
          </div>
        </div>

        <Badge variant={telegramConnected ? "default" : "outline"}>
          {telegramConnected ? "Connected" : "Disconnected"}
        </Badge>
      </div>

      <Button variant={telegramConnected ? "outline" : "default"} class="w-full rounded-xl text-white" onclick={toggleTelegram}>
        {telegramConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  </div>
</div>
