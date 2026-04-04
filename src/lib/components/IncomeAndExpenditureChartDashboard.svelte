<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";
  import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
  import { cubicInOut } from "svelte/easing";
  import { onMount } from "svelte";

  // Formatter
  const formatNumber = (value: number) => new Intl.NumberFormat("id-ID").format(value);

  // Generate 6 bulan terakhir
  const getLast6Months = () => {
    const now = new Date();
    const months: string[] = [];

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push(d.toLocaleString("id-ID", { month: "long" }));
    }

    return months;
  };

  // Dummy data realistis
  const generateData = () => {
    return getLast6Months().map((month) => ({
      month,
      pemasukan: Math.floor(Math.random() * 5000000 + 3000000),
      pengeluaran: Math.floor(Math.random() * 3000000 + 1000000),
    }));
  };

  let chartData = $state(generateData());

  onMount(() => {
    const now = new Date();
    const next = new Date();

    next.setHours(0, 1, 0, 0);
    if (now > next) next.setDate(next.getDate() + 1);

    const timeout = next.getTime() - now.getTime();

    setTimeout(() => {
      chartData = generateData();

      setInterval(
        () => {
          chartData = generateData();
        },
        24 * 60 * 60 * 1000,
      );
    }, timeout);
  });

  const chartConfig: Chart.ChartConfig = {
    pemasukan: {
      label: "Pemasukan",
      color: "#408a71",
    },
    pengeluaran: {
      label: "Pengeluaran",
      color: "#2f5d56",
    },
  };

  type ChartKey = keyof typeof chartConfig;
  const chartEntries = Object.entries(chartConfig) as [ChartKey, (typeof chartConfig)[ChartKey]][];

  let hoveredKey = $state<ChartKey | null>(null);

  const series = $derived(
    chartEntries
      .filter(([key]) => (hoveredKey ? key === hoveredKey : true))
      .map(([key, item]) => ({
        key,
        label: item.label,
        color: item.color ?? "var(--chart-1)",
      })),
  );
</script>

<div class="rounded-2xl shadow-sm overflow-hidden">
  <Card.Root>
    <!-- Header -->
    <Card.Header class="flex justify-between items-center">
      <div>
        <Card.Title>Statistik Keuangan</Card.Title>
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

        <button class="rounded-full p-2 hover:bg-gray-100 transition-colors">
          <EllipsisVertical class="w-4 h-4" />
        </button>
      </div>
    </Card.Header>

    <!-- Chart -->
    <Card.Content>
      <Chart.Container config={chartConfig} class="h-53 w-full">
        <BarChart
          data={chartData}
          x="month"
          axis="x"
          xScale={scaleBand().padding(0.3)}
          {series}
          props={{
            bars: {
              stroke: "none",
              radius: 6,
              rounded: "top",
              motion: {
                type: "tween",
                duration: 500,
                easing: cubicInOut,
              },
            },
            xAxis: {
              format: (d: string) => d.slice(0, 3),
            },
            yAxis: {
              format: (v: number) => formatNumber(v),
            },
          }}
        >
          {#snippet tooltip()}
            <Chart.Tooltip />
          {/snippet}
        </BarChart>
      </Chart.Container>
    </Card.Content>
  </Card.Root>
</div>
