<script>
  import Button from "./ui/button/button.svelte";
</script>

<div
  class="space-y-3 rounded-2xl bg-card p-4 shadow-sm"
>
  <h2 class="text-base font-semibold text-foreground">Langganan</h2>

  <div
    class="rounded-xl border border-border/70 bg-muted/30 p-3 dark:bg-muted/25"
  >
    <div class="flex items-center justify-between text-sm">
      <span class="text-muted-foreground">Status</span>
      <span
        class="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
        >Aktif</span
      >
    </div>

    <div class="mt-2 flex items-center justify-between text-sm">
      <span class="text-muted-foreground">Berlaku sampai</span>
      <span class="font-medium text-foreground">30 Mei 2026</span>
    </div>
  </div>

  <Button class="w-full rounded-xl text-white">Upgrade Paket</Button>
</div>
