<script lang="ts">
  import ArrowDownRight from '@lucide/svelte/icons/arrow-down-right'
  import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right'
  import TrendingDown from '@lucide/svelte/icons/trending-down'
  import TrendingUp from '@lucide/svelte/icons/trending-up'
  import Wallet from '@lucide/svelte/icons/wallet'
  import type { Transaction } from '$lib/types/transaction'

  type Props = {
    filteredInvoices: Transaction[]
    totalAmount: number
  }

  let { filteredInvoices, totalAmount }: Props = $props()

  function filterByMonth(data: Transaction[], monthOffset: number) {
    const now = new Date()
    const targetMonth = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)

    return data.filter((t) => {
      const d = new Date(t.date)
      return d.getMonth() === targetMonth.getMonth() && d.getFullYear() === targetMonth.getFullYear()
    })
  }

  function sumAmount(data: Transaction[]) {
    return data.reduce((total, item) => total + item.totalAmount, 0)
  }

  function calculateChange(currentValue: number, previousValue: number) {
    if (previousValue === 0) return currentValue > 0 ? 100 : 0

    return Math.round(((currentValue - previousValue) / previousValue) * 100)
  }

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const currentMonthInvoices = $derived(filterByMonth(filteredInvoices, 0))
  const previousMonthInvoices = $derived(filterByMonth(filteredInvoices, -1))

  const currentMonthIncome = $derived(sumAmount(currentMonthInvoices.filter((item) => item.type === 'Masuk')))
  const previousMonthIncome = $derived(sumAmount(previousMonthInvoices.filter((item) => item.type === 'Masuk')))

  const currentMonthExpense = $derived(sumAmount(currentMonthInvoices.filter((item) => item.type === 'Keluar')))
  const previousMonthExpense = $derived(sumAmount(previousMonthInvoices.filter((item) => item.type === 'Keluar')))

  const currentMonthTotal = $derived(sumAmount(currentMonthInvoices))
  const previousMonthTotal = $derived(sumAmount(previousMonthInvoices))

  const incomeChange = $derived(calculateChange(currentMonthIncome, previousMonthIncome))
  const expenseChange = $derived(calculateChange(currentMonthExpense, previousMonthExpense))
  const totalChange = $derived(calculateChange(currentMonthTotal, previousMonthTotal))

  const incomeUp = $derived(incomeChange >= 0)
  const expenseUp = $derived(expenseChange >= 0)
  const totalUp = $derived(totalChange >= 0)

  const stats = $derived([
    {
      title: 'Pemasukan',
      value: currentMonthIncome,
      icon: ArrowUpRight,
      color: 'emerald',
      change: incomeChange,
      up: incomeUp,
      note: 'vs bulan lalu',
    },
    {
      title: 'Pengeluaran',
      value: currentMonthExpense,
      icon: ArrowDownRight,
      color: 'rose',
      change: expenseChange,
      up: expenseUp,
      note: 'vs bulan lalu',
    },
    {
      title: 'Total',
      value: totalAmount,
      icon: Wallet,
      color: 'primary',
      highlight: true,
      change: totalChange,
      up: totalUp,
      note: 'vs bulan lalu',
    },
  ])
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
  {#each stats as stat}
    <div class={`overflow-hidden rounded-2xl border p-4 shadow-sm ${stat.highlight ? 'border-primary/30 bg-primary text-white' : 'bg-card text-foreground'}`}>
      <div class="flex items-start justify-between gap-3">
        <div class="space-y-1">
          <p class={`text-sm font-medium ${stat.highlight ? 'opacity-90' : 'text-muted-foreground'}`}>
            {stat.title}
          </p>

          <h2 class="text-2xl font-semibold tracking-tight md:text-3xl">
            {formatRupiah(stat.value)}
          </h2>
        </div>

        <div class={`rounded-full p-2 ${stat.highlight ? 'bg-white/15' : 'bg-primary/10 text-primary'}`}>
          <stat.icon class="h-5 w-5" />
        </div>
      </div>

      <div class="mt-4 flex items-center gap-2 text-xs">
        <span class={`flex items-center gap-1 rounded-full px-2 py-1 ${stat.highlight ? 'bg-white/15' : 'bg-emerald-100 text-primary'}`}>
          {#if stat.up}
            <TrendingUp class="h-3 w-3" />
          {:else}
            <TrendingDown class="h-3 w-3" />
          {/if}
          {Math.abs(stat.change)}%
        </span>

        <span class={`${stat.highlight ? 'opacity-90' : 'text-muted-foreground'}`}>{stat.note}</span>
      </div>
    </div>
  {/each}
</div>
