<script lang="ts">
  import ArrowUpRightIcon from '@lucide/svelte/icons/arrow-up-right'
  import ArrowDownRightIcon from '@lucide/svelte/icons/arrow-down-right'
  import ScaleIcon from '@lucide/svelte/icons/scale'
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
  import TrendingDownIcon from '@lucide/svelte/icons/trending-down'
  import type { Transaction } from '$lib/types/transaction'

  type Props = {
    transactions: Transaction[]
  }

  let { transactions }: Props = $props()

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  function filterByMonth(data: Transaction[], monthOffset: number) {
    const now = new Date()
    const target = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    return data.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === target.getMonth() && d.getFullYear() === target.getFullYear()
    })
  }

  function sumByType(data: Transaction[], type: Transaction['type']) {
    return data.filter((t) => t.type === type).reduce((sum, t) => sum + t.totalAmount, 0)
  }

  function calcChange(current: number, previous: number) {
    if (previous === 0) return current > 0 ? 100 : 0
    return Math.round(((current - previous) / previous) * 100)
  }

  // Bulan ini
  const currentMonth = $derived(filterByMonth(transactions, 0))
  const previousMonth = $derived(filterByMonth(transactions, -1))

  const income = $derived(sumByType(currentMonth, 'Masuk'))
  const expense = $derived(sumByType(currentMonth, 'Keluar'))
  const net = $derived(income - expense)

  const prevIncome = $derived(sumByType(previousMonth, 'Masuk'))
  const prevExpense = $derived(sumByType(previousMonth, 'Keluar'))
  const prevNet = $derived(prevIncome - prevExpense)

  const incomeChange = $derived(calcChange(income, prevIncome))
  const expenseChange = $derived(calcChange(expense, prevExpense))
  const netChange = $derived(calcChange(net, prevNet))

  const incomeUp = $derived(incomeChange >= 0)
  const expenseUp = $derived(expenseChange >= 0)
  const netUp = $derived(netChange >= 0)
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  <!-- Card 1: Pemasukan -->
  <div class="overflow-hidden rounded-2xl border bg-card p-4 text-foreground shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium text-muted-foreground">Pemasukan</p>
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
          {formatRupiah(income)}
        </h2>
      </div>
      <div class="rounded-full bg-primary/10 p-2 text-primary">
        <ArrowUpRightIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-primary">
        {#if incomeUp}
          <TrendingUpIcon class="h-3 w-3" />
        {:else}
          <TrendingDownIcon class="h-3 w-3" />
        {/if}
        {Math.abs(incomeChange)}%
      </span>
      <span class="text-muted-foreground">vs bulan lalu</span>
    </div>
  </div>

  <!-- Card 2: Pengeluaran -->
  <div class="overflow-hidden rounded-2xl border bg-card p-4 text-foreground shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium text-muted-foreground">Pengeluaran</p>
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
          {formatRupiah(expense)}
        </h2>
      </div>
      <div class="rounded-full bg-primary/10 p-2 text-primary">
        <ArrowDownRightIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-primary">
        {#if expenseUp}
          <TrendingUpIcon class="h-3 w-3" />
        {:else}
          <TrendingDownIcon class="h-3 w-3" />
        {/if}
        {Math.abs(expenseChange)}%
      </span>
      <span class="text-muted-foreground">vs bulan lalu</span>
    </div>
  </div>

  <!-- Card 3: Net (highlight, kanan) -->
  <div class="overflow-hidden rounded-2xl border border-primary/30 bg-primary p-4 text-white shadow-sm">
    <div class="flex items-start justify-between gap-3">
      <div class="space-y-1">
        <p class="text-sm font-medium opacity-90">Net Bulan Ini</p>
        <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
          {formatRupiah(net)}
        </h2>
      </div>
      <div class="rounded-full bg-white/15 p-2">
        <ScaleIcon class="h-5 w-5" />
      </div>
    </div>
    <div class="mt-4 flex items-center gap-2 text-xs">
      <span class="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1">
        {#if netUp}
          <TrendingUpIcon class="h-3 w-3" />
        {:else}
          <TrendingDownIcon class="h-3 w-3" />
        {/if}
        {Math.abs(netChange)}%
      </span>
      <span class="opacity-90">vs bulan lalu</span>
    </div>
  </div>
</div>
