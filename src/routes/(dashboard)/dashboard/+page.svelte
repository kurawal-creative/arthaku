<script>
  import AppTopbar from "$lib/components/AppTopbar.svelte";
  import DashboardStatsCard from "$lib/components/DashboardStatsCard.svelte";
  import FilterChartDashboard from "$lib/components/FilterChartDashboard.svelte";
  import HistoryTransactionDashboard from "$lib/components/HistoryTransactionDashboard.svelte";
  import IncomeAndExpenditureChartDashboard from "$lib/components/IncomeAndExpenditureChartDashboard.svelte";
</script>

<main class="p-4 md:p-6 space-y-4">
  <AppTopbar />

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <DashboardStatsCard />
    <IncomeAndExpenditureChartDashboard />
  </div>

  <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
    <div class="col-span-1 xl:col-span-7">
      <div class="grid grid-cols-1 space-y-4">
        <FilterChartDashboard />
        <div class="border">3</div>
      </div>
    </div>
    <div class="col-span-1 xl:col-span-5">
      <div class="grid grid-cols-1 space-y-4">
        <HistoryTransactionDashboard />
        <div class="border">4</div>
      </div>
    </div>
  </div>
</main>
