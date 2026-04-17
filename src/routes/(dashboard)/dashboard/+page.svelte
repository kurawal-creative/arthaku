<script>
  import AppTopbar from "$lib/components/AppTopbar.svelte";
  import DashboardStatsCard from "$lib/components/dashboard/DashboardStatsCard.svelte";
  import FilterChartDashboard from "$lib/components/dashboard/FilterChartDashboard.svelte";
  import FinancialInsightCardDashboard from "$lib/components/dashboard/FinancialInsightCardDashboard.svelte";
  import HistoryTransactionDashboard from "$lib/components/dashboard/HistoryTransactionDashboard.svelte";
  import IncomeAndExpenditureChartDashboard from "$lib/components/dashboard/IncomeAndExpenditureChartDashboard.svelte";
  import ManageTargetTableDashboard from "$lib/components/dashboard/ManageTargetTableDashboard.svelte";
</script>

<main class="p-4 md:p-6 space-y-4">
  <AppTopbar />

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <DashboardStatsCard />
    <IncomeAndExpenditureChartDashboard />
  </div>

  <div class="grid grid-cols-1 gap-4 xl:grid-cols-12 items-stretch md:min-h-0">
    <div class="col-span-1 xl:col-span-7 min-h-0">
      <div class="flex flex-col gap-4 h-full min-h-0">
        <FilterChartDashboard />
        <ManageTargetTableDashboard />
      </div>
    </div>
    <div class="col-span-1 xl:col-span-5 md:h-full min-h-0">
      <div class="flex flex-col gap-4 md:h-full min-h-0">
        <HistoryTransactionDashboard />
        <div class="md:flex-2 min-h-0">
          <FinancialInsightCardDashboard />
        </div>
      </div>
    </div>
  </div>
</main>
