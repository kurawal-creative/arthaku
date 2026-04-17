<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import TrophyIcon from '@lucide/svelte/icons/trophy'
  import MedalIcon from '@lucide/svelte/icons/medal'
  import UtensilsIcon from '@lucide/svelte/icons/utensils'
  import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag'
  import CarIcon from '@lucide/svelte/icons/car'
  import TvIcon from '@lucide/svelte/icons/tv'
  import HeartPulseIcon from '@lucide/svelte/icons/heart-pulse'
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical'

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  type SpendingItem = {
    label: string
    category: string
    amount: number
    icon: any
    color: string
    bg: string
  }

  const items: SpendingItem[] = [
    { label: 'Makan (Total)', category: 'Makanan', amount: 1500000, icon: UtensilsIcon, color: 'text-emerald-600', bg: 'bg-emerald-500' },
    { label: 'Belanja Bulanan', category: 'Belanja', amount: 800000, icon: ShoppingBagIcon, color: 'text-teal-600', bg: 'bg-teal-500' },
    { label: 'Servis Kendaraan', category: 'Transport', amount: 450000, icon: CarIcon, color: 'text-cyan-600', bg: 'bg-cyan-500' },
    { label: 'Streaming & Games', category: 'Hiburan', amount: 320000, icon: TvIcon, color: 'text-lime-600', bg: 'bg-lime-500' },
    { label: 'Obat & Vitamin', category: 'Kesehatan', amount: 200000, icon: HeartPulseIcon, color: 'text-green-600', bg: 'bg-green-500' },
  ]

  // Urutkan terbesar ke terkecil
  const sorted = [...items].sort((a, b) => b.amount - a.amount)
  const max = sorted[0].amount

  // Progress bar relatif terhadap pengeluaran terbesar
  const pct = (amount: number) => Math.round((amount / max) * 100)

  // Badge ranking
  const rankBadge = (i: number) => {
    if (i === 0) return { icon: TrophyIcon, class: 'text-yellow-500' }
    if (i === 1) return { icon: MedalIcon, class: 'text-slate-400' }
    if (i === 2) return { icon: MedalIcon, class: 'text-amber-600' }
    return null
  }

  const total = items.reduce((sum, i) => sum + i.amount, 0)
</script>

<div class="overflow-hidden rounded-2xl border bg-card shadow-sm">
  <!-- Header -->
  <div class="flex items-center justify-between border-b px-5 py-4">
    <div>
      <p class="text-base font-semibold text-foreground">Pengeluaran Terbesar</p>
      <p class="text-sm text-muted-foreground">Bulan ini · top {sorted.length} transaksi</p>
    </div>
    <button class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <EllipsisVertical class="h-4 w-4" />
    </button>
  </div>

  <!-- List -->
  <div class="space-y-3 px-5 py-4">
    {#each sorted as item, i}
      {@const percent = pct(item.amount)}
      {@const rank = rankBadge(i)}
      <div class="space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            {#if rank}
              <rank.icon class="h-4 w-4 shrink-0 {rank.class}" />
            {:else}
              <span class="flex h-4 w-4 items-center justify-center text-xs font-medium text-muted-foreground">{i + 1}</span>
            {/if}

            <div class="rounded-lg p-1.5" style="background-color: var(--color-primary-light); color: var(--color-primary)">
              <item.icon class="h-3.5 w-3.5" />
            </div>

            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-foreground">{item.label}</p>
              <p class="text-xs text-muted-foreground">{item.category}</p>
            </div>
          </div>

          <span class="shrink-0 text-sm font-semibold tabular-nums" style="color: var(--color-primary)">
            {formatRupiah(item.amount)}
          </span>
        </div>

        <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div class="h-full rounded-full transition-all duration-700" style="width: {percent}%; background-color: color-mix(in srgb, var(--color-primary) {100 - i * 12}%, var(--color-secondary))"></div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Footer -->
  <div class="flex items-center justify-between border-t px-5 py-3">
    <span class="text-xs text-muted-foreground">Total Top {sorted.length}</span>
    <span class="text-sm font-semibold" style="color: var(--color-primary)">{formatRupiah(total)}</span>
  </div>
</div>
