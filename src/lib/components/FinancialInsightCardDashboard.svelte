<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import * as Popover from "$lib/components/ui/popover/index";
  import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
  import Badge from "./ui/badge/badge.svelte";

  const insights = [
    {
      id: "insight-1",
      title: "Pengeluaran makan meningkat",
      description: "Naik 25% dibanding minggu lalu. Pertimbangkan batasi makan di luar 3x/minggu.",
      colorClass: "bg-rose-500",
      progress: 25,
      progressClass: "bg-rose-500",
      label: "Perlu perhatian",
      labelClass: "bg-rose-100 text-rose-700",
    },
    {
      id: "insight-3",
      title: "Target Laptop berjalan baik",
      description: "Dana sudah mencapai 65%. Jika konsisten, target bisa tercapai 2 bulan lebih cepat.",
      colorClass: "bg-emerald-500",
      progress: 65,
      progressClass: "bg-emerald-500",
      label: "On track",
      labelClass: "bg-emerald-100 text-emerald-700",
    },
  ];
</script>

<div class="rounded-2xl shadow-sm overflow-hidden h-99.5 flex flex-col">
  <Card.Root class="h-full flex flex-col">
    <Card.Header class="flex gap-2 flex-row items-center justify-between py-2">
      <div>
        <Card.Title>Financial Insight</Card.Title>
        <Card.Description>Ringkasan cepat kondisi keuangan Anda minggu ini</Card.Description>
      </div>

      <Popover.Root>
        <Popover.Trigger>
          {#snippet child({ props })}
            <button {...props} type="button" class="rounded-full p-1 hover:bg-muted transition-colors" aria-label="Menu target">
              <EllipsisVertical class="w-4 h-4" />
            </button>
          {/snippet}
        </Popover.Trigger>

        <Popover.Content align="end" class="w-44 p-2">
          <div class="grid gap-1">
            <button type="button" class="rounded-md px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"> Lihat Semua </button>
          </div>
        </Popover.Content>
      </Popover.Root>
    </Card.Header>
    <Card.Content class="pt-0 flex-1 min-h-0">
      <div class="h-full overflow-hidden space-y-1.5">
        {#each insights as insight (insight.id)}
          <div class="rounded-lg border p-4 bg-card/70">
            <div class="flex items-start justify-between gap-2">
              <div class="flex items-start gap-2 min-w-0">
                <span class={`mt-1 inline-block h-2 w-2 rounded-full shrink-0 ${insight.colorClass}`}></span>
                <div class="min-w-0">
                  <p class="text-sm font-semibold text-foreground leading-tight">{insight.title}</p>
                  <p class="text-xs text-muted-foreground mt-2 leading-tight line-clamp-2">{insight.description}</p>
                </div>
              </div>
              <Badge class={`${insight.labelClass}`}>
                {insight.label}
              </Badge>
            </div>

            <div class="mt-4 h-1 w-full rounded-full bg-muted overflow-hidden">
              <div class={`h-full rounded-full ${insight.progressClass}`} style={`width: ${insight.progress}%`}></div>
            </div>
            <p class="mt-1 text-xs text-muted-foreground">Intensitas: {insight.progress}%</p>
          </div>
        {/each}
      </div>
    </Card.Content>
  </Card.Root>
</div>
