<script lang="ts">
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
  import TrendingDownIcon from '@lucide/svelte/icons/trending-down'
  import AlertCircleIcon from '@lucide/svelte/icons/alert-circle'
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle'
  import LightbulbIcon from '@lucide/svelte/icons/lightbulb'
  import PiggyBankIcon from '@lucide/svelte/icons/piggy-bank'
  import UtensilsIcon from '@lucide/svelte/icons/utensils'
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check'

  type InsightType = 'warning' | 'success' | 'tip'

  type Insight = {
    type: InsightType
    icon: any
    title: string
    description: string
    badge?: string
  }

  const insights: Insight[] = [
    {
      type: 'warning',
      icon: UtensilsIcon,
      title: 'Pengeluaran makan meningkat',
      description: 'Naik 25% dibanding bulan lalu. Pertimbangkan untuk batasi makan di luar.',
      badge: '+25%',
    },
    {
      type: 'success',
      icon: PiggyBankIcon,
      title: 'Tabungan berjalan baik',
      description: 'Kamu konsisten menabung selama 3 minggu terakhir. Pertahankan!',
      badge: '3 minggu',
    },
    {
      type: 'tip',
      icon: LightbulbIcon,
      title: 'Tips bulan ini',
      description: 'Alokasikan minimal 20% pemasukan untuk tabungan darurat agar lebih aman.',
    },
    {
      type: 'success',
      icon: ShieldCheckIcon,
      title: 'Pengeluaran transport terkontrol',
      description: 'Transport bulan ini turun 10% dari target. Kamu berhasil hemat!',
      badge: '-10%',
    },
  ]

  const styles: Record<InsightType, { wrapper: string; icon: string; badge: string; indicator: string }> = {
    warning: {
      wrapper: 'bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20',
      icon: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
      badge: 'bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400',
      indicator: 'bg-rose-400',
    },
    success: {
      wrapper: 'border',
      icon: 'text-primary',
      badge: 'text-primary',
      indicator: 'bg-primary',
    },
    tip: {
      wrapper: 'bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20',
      icon: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
      badge: 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400',
      indicator: 'bg-amber-400',
    },
  }
</script>

<div class="overflow-hidden rounded-2xl bg-card shadow-sm">
  <!-- Header -->
  <div class="flex items-center gap-2.5 border-b px-5 py-4">
    <div>
      <p class="text-base font-semibold text-foreground">Insight Keuangan</p>
      <p class="text-sm text-muted-foreground">Analisis otomatis bulan ini</p>
    </div>
  </div>

  <!-- Insight list -->
  <div class="divide-y">
    {#each insights as insight}
      {@const s = styles[insight.type]}
      <div class="flex items-start md:items-center gap-3 pl-1 pr-5 py-4 transition-colors hover:bg-muted/30">
        <!-- Indicator bar kiri -->
        <div class="mt-1 h-full w-0.5 self-stretch rounded-full {s.indicator}"></div>

        <!-- Icon -->
        <div class="shrink-0 rounded-lg p-2 {s.icon}" style={insight.type === 'success' ? 'background-color: var(--color-primary-light)' : ''}>
          <insight.icon class="h-4.5 w-4.5" />
        </div>

        <!-- Konten -->
        <div class="min-w-0 flex-1 space-y-0.5 md:space-y-0">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-foreground">{insight.title}</p>
            {#if insight.badge}
              <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold {s.badge}" style={insight.type === 'success' ? 'background-color: var(--color-primary-light); color: var(--color-primary)' : ''}>
                {insight.badge}
              </span>
            {/if}
          </div>
          <p class="text-xs leading-relaxed text-muted-foreground">{insight.description}</p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Footer -->
  <div class="flex items-center gap-1.5 border-t px-5 py-3">
    <CheckCircleIcon class="h-3.5 w-3.5" style="color: var(--color-primary)" />
    <span class="text-xs text-muted-foreground">{insights.filter((i) => i.type === 'success').length} hal positif · {insights.filter((i) => i.type === 'warning').length} perlu perhatian</span>
  </div>
</div>
