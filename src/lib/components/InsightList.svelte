<script lang="ts">
  import AlertCircleIcon from '@lucide/svelte/icons/alert-circle'
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle'
  import InfoIcon from '@lucide/svelte/icons/info'
  import LightbulbIcon from '@lucide/svelte/icons/lightbulb'
  import PiggyBankIcon from '@lucide/svelte/icons/piggy-bank'
  import WalletIcon from '@lucide/svelte/icons/wallet'
  import TargetIcon from '@lucide/svelte/icons/target'
  import CalendarCheckIcon from '@lucide/svelte/icons/calendar-check'

  type InsightType = 'warning' | 'positive' | 'info'

  type Insight = {
    type: InsightType
    title: string
    description: string
    action: string
  }

  const insights: Insight[] = [
    {
      type: 'warning',
      title: 'Pengeluaran makan meningkat',
      description: 'Naik 25% dibanding minggu lalu dengan 12 transaksi.',
      action: 'Batasi makan di luar maksimal 3x/minggu.',
    },
    {
      type: 'positive',
      title: 'Tabungan berjalan konsisten',
      description: 'Kamu menabung selama 3 minggu berturut-turut.',
      action: 'Pertahankan kebiasaan ini untuk capai target lebih cepat.',
    },
    {
      type: 'info',
      title: 'Pengeluaran kecil cukup besar',
      description: 'Transaksi di bawah Rp 50.000 menyumbang 40% pengeluaran.',
      action: 'Perhatikan pengeluaran kecil agar lebih hemat.',
    },
  ]

  const typeConfig: Record<InsightType, { icon: any; bar: string; badge: string; badgeText: string }> = {
    warning: { icon: AlertCircleIcon, bar: 'bg-rose-400', badge: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300', badgeText: 'Perhatian' },
    positive: { icon: CheckCircleIcon, bar: '', badge: 'text-primary', badgeText: 'Positif' },
    info: { icon: InfoIcon, bar: 'bg-blue-400', badge: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300', badgeText: 'Info' },
  }

  type Factor = { label: string; value: number; icon: any }

  const factors: Factor[] = [
    { label: 'Tabungan', value: 80, icon: PiggyBankIcon },
    { label: 'Pengeluaran', value: 65, icon: WalletIcon },
    { label: 'Target', value: 70, icon: TargetIcon },
    { label: 'Konsistensi', value: 75, icon: CalendarCheckIcon },
  ]
</script>

<div class="overflow-hidden rounded-2xl border bg-card shadow-sm">
  <!-- Header -->
  <div class="flex items-center gap-2.5 border-b px-5 py-4">
    <div>
      <p class="text-base font-semibold text-foreground">Insight Keuangan</p>
      <p class="text-sm text-muted-foreground">Analisis otomatis minggu ini</p>
    </div>
  </div>

  <!-- Insight list -->
  <div class="divide-y">
    {#each insights as insight}
      {@const cfg = typeConfig[insight.type]}
      <div class="flex items-start gap-3 pr-4 py-4 transition-colors hover:bg-muted/30">
        <!-- Indicator bar -->
        <div class="mt-1.5 h-full w-0.5 self-stretch rounded-full {cfg.bar || ''}" style={insight.type === 'positive' ? 'background-color: var(--color-primary)' : ''}></div>

        <!-- Icon -->
        <div class="mt-0.5 shrink-0 rounded-lg p-2 {insight.type !== 'positive' ? cfg.badge.split(' ').slice(0, 2).join(' ') : ''}" style={insight.type === 'positive' ? 'background-color: var(--color-primary-light); color: var(--color-primary)' : ''}>
          <cfg.icon class="h-4 w-4" />
        </div>

        <!-- Konten -->
        <div class="min-w-0 flex-1">
          <div class="flex items-start justify-between gap-2">
            <p class="text-sm font-semibold leading-tight text-foreground">{insight.title}</p>
            <span class="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium {cfg.badge}" style={insight.type === 'positive' ? 'background-color: var(--color-primary-light); color: var(--color-primary)' : ''}>
              {cfg.badgeText}
            </span>
          </div>
          <p class="mt-1 text-sm text-muted-foreground">{insight.description}</p>
          <p class="mt-1.5 text-sm font-medium" style="color: var(--color-primary)">
            💡 {insight.action}
          </p>
        </div>
      </div>
    {/each}
  </div>

  <!-- Faktor Penilaian -->
  <div class="border-t px-5 py-4">
    <p class="mb-3 text-sm font-semibold text-foreground">Faktor Penilaian</p>
    <div class="grid grid-cols-2 gap-x-6 gap-y-3">
      {#each factors as factor}
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-1.5">
              <factor.icon class="h-3.5 w-3.5 text-muted-foreground" />
              <span class="text-sm text-muted-foreground">{factor.label}</span>
            </div>
            <span class="text-sm font-semibold" style="color: var(--color-primary)">{factor.value}</span>
          </div>
          <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div class="h-full rounded-full transition-all duration-700" style="width: {factor.value}%; background-color: var(--color-primary)"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
