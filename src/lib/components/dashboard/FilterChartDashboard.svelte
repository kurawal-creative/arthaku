<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js'
  import * as Chart from '$lib/components/ui/chart/index.js'
  import { scaleUtc } from 'd3-scale'
  import { curveNatural } from 'd3-shape'
  import { Area, AreaChart, LinearGradient } from 'layerchart'
  import EllipsisVertical from '@lucide/svelte/icons/ellipsis-vertical'
  import { onMount } from 'svelte'

  const getLast6Months = () => {
    const now = new Date()
    const dates: Date[] = []

    for (let i = 5; i >= 0; i--) {
      dates.push(new Date(now.getFullYear(), now.getMonth() - i, 1))
    }

    return dates
  }

  const generateData = () => {
    return getLast6Months().map((date) => ({
      date,
      makan: Math.floor(Math.random() * 1500000 + 500000),
      belanja: Math.floor(Math.random() * 2000000 + 700000),
      transport: Math.floor(Math.random() * 800000 + 200000),
      hiburan: Math.floor(Math.random() * 1000000 + 300000),
    }))
  }

  let chartData = $state(generateData())

  onMount(() => {
    const now = new Date()
    const next = new Date()

    next.setHours(0, 1, 0, 0)
    if (now > next) next.setDate(next.getDate() + 1)

    const timeout = next.getTime() - now.getTime()

    setTimeout(() => {
      chartData = generateData()

      setInterval(
        () => {
          chartData = generateData()
        },
        24 * 60 * 60 * 1000,
      )
    }, timeout)
  })

  const chartConfig = {
    makan: { label: 'Makan', color: '#16a34a' },
    belanja: { label: 'Belanja', color: '#22c55e' },
    transport: { label: 'Transport', color: '#059669' },
    hiburan: { label: 'Hiburan', color: '#84cc16' },
  } satisfies Chart.ChartConfig

  type ChartKey = keyof typeof chartConfig
  const chartEntries = Object.entries(chartConfig) as [ChartKey, (typeof chartConfig)[ChartKey]][]

  let hoveredKey = $state<ChartKey | null>(null)

  const series = $derived(
    chartEntries
      .filter(([key]) => (hoveredKey ? key === hoveredKey : true))
      .map(([key, item]) => ({
        key,
        label: item.label,
        color: item.color ?? 'var(--chart-1)',
      })),
  )

  const formatAxisRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value)
</script>

<div class="rounded-2xl shadow-sm overflow-hidden">
  <Card.Root>
    <!-- Header -->
    <Card.Header class="flex justify-between items-center">
      <div>
        <Card.Title>Statistik Pengeluaran</Card.Title>
        <Card.Description>6 Bulan Terakhir</Card.Description>
      </div>

      <div class="flex items-center gap-4">
        {#each chartEntries as [key, item]}
          <button type="button" class="flex items-center gap-2 cursor-pointer transition-opacity" class:opacity-40={hoveredKey !== null && hoveredKey !== key} onmouseenter={() => (hoveredKey = key)} onmouseleave={() => (hoveredKey = null)}>
            <span class="w-3 h-3 rounded-sm" style="background-color: {item.color}"></span>
            <span class="text-muted-foreground text-sm">
              {item.label}
            </span>
          </button>
        {/each}

        <button class="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <EllipsisVertical class="w-4 h-4" />
        </button>
      </div>
    </Card.Header>

    <!-- Chart -->
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-64 w-full">
        <AreaChart
          data={chartData}
          x="date"
          xScale={scaleUtc()}
          yPadding={[0, 25]}
          {series}
          seriesLayout="stack"
          props={{
            xAxis: {
              format: (v: Date) => v.toLocaleDateString('id-ID', { month: 'short' }),
            },
            yAxis: {
              format: (v: number) => formatAxisRupiah(v),
            },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip
              indicator="dot"
              labelFormatter={(v: Date) =>
                v.toLocaleDateString('id-ID', {
                  month: 'long',
                  year: 'numeric',
                })}
            />
          {/snippet}

          {#snippet marks({ context })}
            {#each context.series.visibleSeries as s (s.key)}
              <LinearGradient stops={[s.color ?? '', 'color-mix(in lch, ' + s.color + ' 10%, transparent)']} vertical>
                {#snippet children({ gradient })}
                  <Area seriesKey={s.key} curve={curveNatural} fillOpacity={0.4} line={{ class: 'stroke-1' }} motion="tween" {...s.props} fill={gradient} />
                {/snippet}
              </LinearGradient>
            {/each}
          {/snippet}
        </AreaChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>
</div>
