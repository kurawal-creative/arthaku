<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import * as Chart from '$lib/components/ui/chart/index.js'
  import { scaleBand } from 'd3-scale'
  import { BarChart } from 'layerchart'
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical'
  import { cubicInOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  const formatNumber = (value: number) => new Intl.NumberFormat('id-ID').format(value)

  const getLast7Days = () => {
    const now = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now)
      d.setDate(now.getDate() - (6 - i))
      d.setHours(0, 0, 0, 0)
      return d
    })
  }

  const generateData = () =>
    getLast7Days().map((date) => ({
      date,
      pemasukan: Math.floor(Math.random() * 5000000 + 3000000),
      pengeluaran: Math.floor(Math.random() * 3000000 + 1000000),
    }))

  let chartData = $state(generateData())

  onMount(() => {
    const now = new Date()
    const next = new Date()
    next.setHours(0, 1, 0, 0)
    if (now > next) next.setDate(next.getDate() + 1)

    setTimeout(() => {
      chartData = generateData()
      setInterval(
        () => {
          chartData = generateData()
        },
        24 * 60 * 60 * 1000,
      )
    }, next.getTime() - now.getTime())
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
    <!-- Header -->
    <Card.Header class="flex items-center justify-between">
      <div>
        <Card.Title>Statistik Keuangan</Card.Title>
        <Card.Description>7 Hari Terakhir</Card.Description>
      </div>

      <div class="flex items-center gap-4">
        <!-- Legend -->
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

    <!-- Chart -->
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-54 w-full">
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
              format: (d: Date) => d.toLocaleDateString('id-ID', { weekday: 'short' }),
            },
            yAxis: {
              format: (v: number) => formatNumber(v),
            },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip labelFormatter={(d: Date) => d.toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })} />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>
</div>
