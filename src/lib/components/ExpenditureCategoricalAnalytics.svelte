<script lang="ts">
  import ShoppingBagIcon from '@lucide/svelte/icons/shopping-bag'
  import UtensilsIcon from '@lucide/svelte/icons/utensils'
  import CarIcon from '@lucide/svelte/icons/car'
  import TvIcon from '@lucide/svelte/icons/tv'
  import HeartPulseIcon from '@lucide/svelte/icons/heart-pulse'
  import TagIcon from '@lucide/svelte/icons/tag'
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical'

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  type Category = {
    label: string
    amount: number
    icon: any
  }

  const categories: Category[] = [
    { label: 'Makan', amount: 1500000, icon: UtensilsIcon },
    { label: 'Belanja', amount: 800000, icon: ShoppingBagIcon },
    { label: 'Transport', amount: 450000, icon: CarIcon },
    { label: 'Hiburan', amount: 320000, icon: TvIcon },
    { label: 'Kesehatan', amount: 200000, icon: HeartPulseIcon },
    { label: 'Lainnya', amount: 180000, icon: TagIcon },
  ]

  const total = categories.reduce((sum, c) => sum + c.amount, 0)
  const sortedCategories = [...categories].sort((a, b) => b.amount - a.amount)
  const pct = (amount: number) => Math.round((amount / total) * 100)
</script>

<div class="overflow-hidden rounded-2xl border bg-card shadow-sm">
  <!-- Header -->
  <div class="flex items-center justify-between border-b px-5 py-4">
    <div>
      <p class="text-base font-semibold text-foreground">Pengeluaran per Kategori</p>
      <p class="text-sm text-muted-foreground">Bulan ini · {formatRupiah(total)} total</p>
    </div>
    <button class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
      <EllipsisVertical class="h-4 w-4" />
    </button>
  </div>

  <!-- List -->
  <div class="space-y-3 px-5 py-4">
    {#each sortedCategories as cat, i}
      {@const percent = pct(cat.amount)}
      <div class="space-y-1.5">
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2.5">
            <div class="rounded-lg p-1.5" style="background-color: var(--color-primary-light); color: var(--color-primary)">
              <cat.icon class="h-3.5 w-3.5" />
            </div>
            <span class="text-sm font-medium text-foreground">{cat.label}</span>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="tabular-nums text-muted-foreground">{formatRupiah(cat.amount)}</span>
            <span class="w-8 text-right font-semibold tabular-nums" style="color: var(--color-primary)">{percent}%</span>
          </div>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div class="h-full rounded-full transition-all duration-700" style="width: {percent}%; background-color: color-mix(in srgb, var(--color-primary) {100 - i * 12}%, var(--color-secondary))"></div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Footer -->
  <div class="flex items-center justify-between border-t px-5 py-3">
    <span class="text-xs text-muted-foreground">Total Pengeluaran</span>
    <span class="text-sm font-semibold" style="color: var(--color-primary)">{formatRupiah(total)}</span>
  </div>
</div>
