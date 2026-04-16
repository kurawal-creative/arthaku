<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import * as Chart from '$lib/components/ui/chart/index.js'
  import { IsMobile } from '$lib/hooks/is-mobile.svelte.js'
  import { scaleBand } from 'd3-scale'
  import { BarChart } from 'layerchart'
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical'
  import { cubicInOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  const formatNumber = (value: number) => new Intl.NumberFormat('id-ID').format(value)

  const isMobile = new IsMobile()

  const getLastMonths = (count: number) => {
    const now = new Date()
    return Array.from({ length: count }, (_, i) => {
      return new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1)
    })
  }

  const chartMonthCount = $derived(isMobile.current ? 6 : 12)

  const generateData = (monthCount: number) =>
    getLastMonths(monthCount).map((date) => ({
      date,
      pemasukan: Math.floor(Math.random() * 5000000 + 3000000),
      pengeluaran: Math.floor(Math.random() * 3000000 + 1000000),
    }))

  type ChartPoint = {
    date: Date
    pemasukan: number
    pengeluaran: number
  }

  let chartData = $state<ChartPoint[]>([])

  $effect(() => {
    chartData = generateData(chartMonthCount)
  })

  onMount(() => {
    const now = new Date()
    const next = new Date()
    next.setHours(0, 1, 0, 0)
    if (now > next) next.setDate(next.getDate() + 1)

    let intervalId: ReturnType<typeof setInterval> | undefined
    const timeoutId = setTimeout(() => {
      chartData = generateData(chartMonthCount)
      intervalId = setInterval(() => {
        chartData = generateData(chartMonthCount)
      }, 24 * 60 * 60 * 1000)
    }, next.getTime() - now.getTime())

    return () => {
      clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  })

  const chartConfig: Chart.ChartConfig = {
    pemasukan: { label: 'Pemasukan', color: '#408a71' },
    pengeluaran: { label: 'Pengeluaran', color: '#2f5d56' },
  }

  type ChartKey = keyof typeof chartConfig
  const chartEntries = Object.entries(chartConfig) as [ChartKey, (typeof chartConfig)[ChartKey]][]

  let hoveredKey = $state<ChartKey | null>(null)

  const series = $derived(chartEntries.filter(([key]) => (hoveredKey ? key === hoveredKey : true)).map(([key, item]) => ({ key, label: item.label, color: item.color ?? 'var(--chart-1)' })))
</script>

<div class="overflow-hidden rounded-2xl shadow-sm">
  <Card.Root>
    <Card.Header class="flex items-center justify-between">
      <div>
        <Card.Title>Tren Keuangan</Card.Title>
        <Card.Description>{#if isMobile.current} 6 Bulan Terakhir {:else} 1 Tahun Terakhir {/if}</Card.Description>
      </div>

      <div class="flex items-center gap-4">
        {#each chartEntries as [key, item]}
          <button type="button" class="flex cursor-pointer items-center gap-2 transition-opacity" class:opacity-40={hoveredKey !== null && hoveredKey !== key} onmouseenter={() => (hoveredKey = key)} onmouseleave={() => (hoveredKey = null)}>
            <span class="h-3 w-3 rounded-sm" style="background-color: {item.color}"></span>
            <span class="text-sm text-muted-foreground">{item.label}</span>
          </button>
        {/each}

        <button class="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <EllipsisVertical class="h-4 w-4" />
        </button>
      </div>
    </Card.Header>

    <Card.Content>
      <Chart.Container config={chartConfig} class="h-60 w-full">
        <BarChart
          data={chartData}
          x="date"
          axis="x"
          xScale={scaleBand().padding(0.3)}
          {series}
          props={{
            bars: {
              stroke: 'none',
              radius: 6,
              rounded: 'top',
              motion: { type: 'tween', duration: 500, easing: cubicInOut },
            },
            xAxis: {
              format: (d: Date) => d.toLocaleDateString('id-ID', { month: 'short' }),
            },
            yAxis: {
              format: (v: number) => formatNumber(v),
            },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip labelFormatter={(d: Date) => d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })} />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>
</div>
