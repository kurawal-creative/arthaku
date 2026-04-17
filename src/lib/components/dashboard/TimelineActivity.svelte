<script lang="ts">
  import BotIcon from "@lucide/svelte/icons/bot";
  import PiggyBankIcon from "@lucide/svelte/icons/piggy-bank";
  import PlusCircleIcon from "@lucide/svelte/icons/plus-circle";

  type ActivityType = "transaksi" | "tabungan" | "bot";

  type ActivityItem = {
    type: ActivityType;
    title: string;
    description: string;
    time: string;
  };

  type ActivityGroup = {
    date: string;
    items: ActivityItem[];
  };

  const activities: ActivityGroup[] = [
    {
      date: "Hari Ini",
      items: [
        { type: "transaksi", title: "Menambahkan transaksi", description: '"Makan bakso" — Rp 25.000', time: "5 menit lalu" },
        { type: "tabungan", title: "Menambah tabungan", description: "Target Laptop + Rp 1.000.000", time: "2 jam lalu" },
      ],
    },
    {
      date: "Kemarin",
      items: [{ type: "bot", title: "Aktivitas bot", description: "Dicatat via WhatsApp", time: "Kemarin" }],
    },
  ];

  const typeMeta = {
    transaksi: {
      icon: PlusCircleIcon,
      badge: "Transaksi",
      isPrimary: true,
    },

    tabungan: {
      icon: PiggyBankIcon,
      badge: "Tabungan",
      isPrimary: true,
    },

    bot: {
      icon: BotIcon,
      badge: "Bot",
      isPrimary: false,
      iconClass: "text-violet-600 dark:text-violet-400",
      iconContainerClass: "bg-violet-100 dark:bg-violet-500/20",
      badgeClass: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    },
  } as const;
</script>

<div class="overflow-hidden rounded-2xl bg-card shadow-sm">
  <div class="px-5 py-4">
    {#each activities as group, gi}
      <!-- Date -->
      <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground {gi > 0 ? 'mt-6' : ''}">
        {group.date}
      </p>

      <!-- Items -->
      {#each group.items as item, ii}
        {@const meta = typeMeta[item.type]}
        {@const isLast = ii === group.items.length - 1}

        <div class="flex gap-3">
          <!-- Left: icon + line -->
          <div class="flex flex-col items-center">
            <div class={`flex h-8 w-8 items-center justify-center rounded-full ${meta.isPrimary ? "" : meta.iconContainerClass}`} style={meta.isPrimary ? "background-color: var(--color-primary-light)" : ""}>
              <meta.icon class={`h-4 w-4 ${meta.isPrimary ? "" : meta.iconClass}`} style={meta.isPrimary ? "color: var(--color-primary)" : ""} />
            </div>

            {#if !isLast}
              <div class="mt-1.5 w-px flex-1 bg-border"></div>
            {/if}
          </div>

          <!-- Right: content -->
          <div class="flex-1 {!isLast ? 'pb-4' : ''}">
            <div class="flex items-start justify-between gap-3 rounded-xl border bg-background px-4 py-3 transition hover:bg-muted/40">
              <div class="space-y-1">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>

                  <span class={`rounded-full px-2 py-0.5 text-xs font-medium ${meta.isPrimary ? "" : meta.badgeClass}`} style={meta.isPrimary ? "background-color: var(--color-primary-light); color: var(--color-primary)" : ""}>
                    {meta.badge}
                  </span>
                </div>

                <p class="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <span class="text-xs text-muted-foreground whitespace-nowrap">
                {item.time}
              </span>
            </div>
          </div>
        </div>
      {/each}
    {/each}
  </div>
</div>
