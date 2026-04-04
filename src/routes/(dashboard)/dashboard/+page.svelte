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

  <div class="grid grid-cols-3 gap-4">
    <div class="col-span-2"><FilterChartDashboard /></div>
    <div class="row-span-2"><HistoryTransactionDashboard /></div>
    <div class="border col-span-2">4</div>
  </div>
</main>
