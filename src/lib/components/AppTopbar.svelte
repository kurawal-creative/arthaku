<script>
  import CustomTrigger from "./CustomTrigger.svelte";
  import ButtonExportDashboard from "./dashboard/ButtonExportDashboard.svelte";
  import DateRangeDashboard from "./dashboard/DateRangeDashboard.svelte";

  import SearchDashboard from "./SearchDashboard.svelte";
</script>

<nav class="w-full mb-6">
  <div class="flex items-center justify-between gap-4">
    <!-- Left -->
    <div class="flex items-center">
      <CustomTrigger place="navbar" />
      <div class="w-120">
        <SearchDashboard />
      </div>
    </div>

    <!-- Right -->
    <div class="flex items-center gap-2">
      <!-- Date Range -->
      <DateRangeDashboard />

      <!-- Export -->
      <ButtonExportDashboard />
    </div>
  </div>
</nav>
