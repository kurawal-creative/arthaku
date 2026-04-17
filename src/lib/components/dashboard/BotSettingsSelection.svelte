<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
  import * as Select from "$lib/components/ui/select";

  let autoCategory = $state(true);
  let defaultType = $state("Pengeluaran");

  const typeOptions = ["Pengeluaran", "Pemasukan", "Tabungan"];

  const selectTriggerClass = "h-10 w-full rounded-xl border-border/70 bg-muted/30 px-3 text-sm focus:bg-background focus-visible:border-input focus-visible:ring-0 dark:bg-muted/25";

  const selectItemClass = "focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground";
</script>

<div class="space-y-4 overflow-hidden rounded-2xl bg-card p-4 shadow-sm">
  <div>
    <h2 class="text-base font-semibold text-foreground">Pengaturan Bot</h2>
    <p class="text-sm text-muted-foreground">Atur perilaku bot untuk otomatisasi transaksi yang lebih cerdas.</p>
  </div>

  <div class="space-y-4 border-t border-border/50 pt-4">
    <!-- Auto Category Toggle -->
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <p class="text-sm font-medium text-foreground">Auto Kategori</p>
        <p class="text-xs text-muted-foreground">Bot otomatis menentukan kategori transaksi</p>
      </div>
      <Switch bind:checked={autoCategory} />
    </div>

    <!-- Default Type - Conditional -->
    {#if !autoCategory}
      <div class="space-y-2 border-t border-border/50 pt-4">
        <p class="text-sm font-medium text-foreground">Tipe Default</p>
        <Select.Root type="single" bind:value={defaultType}>
          <Select.Trigger class={selectTriggerClass}>{defaultType}</Select.Trigger>
          <Select.Content>
            {#each typeOptions as option}
              <Select.Item value={option} label={option} class={selectItemClass} />
            {/each}
          </Select.Content>
        </Select.Root>
        <p class="text-xs text-muted-foreground">Digunakan jika bot tidak dapat mendeteksi tipe transaksi</p>
      </div>
    {/if}
  </div>
</div>
