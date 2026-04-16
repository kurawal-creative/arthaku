<script lang="ts">
  import TargetIcon from '@lucide/svelte/icons/target'
  import PiggyBankIcon from '@lucide/svelte/icons/piggy-bank'
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
  import CheckCircleIcon from '@lucide/svelte/icons/check-circle'
  import type { Target } from '$lib/types/target'

  type Props = {
    targets: Target[]
  }

  let { targets }: Props = $props()

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const calcProgress = (current: number, target: number) => Math.min(Math.round((current / target) * 100), 100)

  // Card 1
  const totalTarget = $derived(targets.length)
  const totalTercapai = $derived(targets.filter((t) => t.status === 'Tercapai').length)

  // Card 2
  const totalTerkumpul = $derived(targets.reduce((sum, t) => sum + t.currentAmount, 0))
  const totalAmount = $derived(targets.reduce((sum, t) => sum + t.targetAmount, 0))
  const overallProgress = $derived(totalAmount > 0 ? Math.round((totalTerkumpul / totalAmount) * 100) : 0)

  // Card 3
  const targetTerdekat = $derived(
    targets
      .filter((t) => t.status === 'Berjalan')
      .reduce<Target | null>((closest, t) => {
        if (!closest) return t
        return calcProgress(t.currentAmount, t.targetAmount) > calcProgress(closest.currentAmount, closest.targetAmount) ? t : closest
      }, null),
  )
  const terdekatProgress = $derived(targetTerdekat ? calcProgress(targetTerdekat.currentAmount, targetTerdekat.targetAmount) : 0)
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  <!-- Card 1 -->
  <div class="overflow-hidden rounded-2xl border bg-card p-4 shadow-sm text-foreground">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium text-muted-foreground">Total Target</p>
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">{totalTarget} Target</h2>
      </div>
      <div class="rounded-full bg-primary/10 p-2 text-primary">
        <TargetIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-primary">
        <CheckCircleIcon class="h-3 w-3" />
        {totalTercapai} Tercapai
      </span>
      <span class="text-muted-foreground">dari {totalTarget} target</span>
    </div>
  </div>

  <!-- Card 2 -->
  <div class="overflow-hidden rounded-2xl border bg-card p-4 shadow-sm text-foreground">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium text-muted-foreground">Target Terdekat</p>
        <h2 class="truncate text-2xl font-semibold tracking-tight md:text-3xl">
          {targetTerdekat?.name ?? '—'}
        </h2>
      </div>
      <div class="rounded-full bg-primary/10 p-2 text-primary">
        <TrendingUpIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      {#if targetTerdekat}
        <span class="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-primary">
          {terdekatProgress}%
        </span>
        <span class="text-muted-foreground">menuju pencapaian</span>
      {:else}
        <span class="text-muted-foreground">Tidak ada target aktif</span>
      {/if}
    </div>
  </div>

  <!-- Card 3 -->
  <div class="overflow-hidden rounded-2xl border border-primary/30 bg-primary p-4 text-white shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium opacity-90">Total Terkumpul</p>
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
          {formatRupiah(totalTerkumpul)}
        </h2>
      </div>
      <div class="rounded-full bg-white/15 p-2">
        <PiggyBankIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
        <TrendingUpIcon class="h-3 w-3" />
        {overallProgress}%
      </span>
      <span class="opacity-90">dari total target</span>
    </div>
  </div>
</div>
