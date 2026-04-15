<script>
  import ButtonExportDashboard from "./ButtonExportDashboard.svelte";
  import DateRangeDashboard from "./DateRangeDashboard.svelte";
  import SearchDashboard from "./SearchDashboard.svelte";
</script>

<nav class="w-full mb-6">
  <div class="flex items-center justify-between gap-4">
    <!-- Left -->
    <SearchDashboard />

    <!-- Right -->
    <div class="flex items-center gap-2">
      <!-- Date Range -->
      <DateRangeDashboard />

      <!-- Export -->
      <ButtonExportDashboard />
    </div>
  </div>
</nav>
