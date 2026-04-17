<script>
  import InsightList from "$lib/components/dashboard/InsightList.svelte";
  import MoneyScores from "$lib/components/dashboard/MoneyScores.svelte";

  import RecommendationInsight from "$lib/components/RecommendationInsight.svelte";
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarPageHeader title="Insight" description="Insight keuangan Anda untuk bulan ini" />

  <!-- Financial Score -->
  <MoneyScores />

  <!-- Insight List -->
  <InsightList />

  <!-- Recommendation Block -->
  <RecommendationInsight />
</main>
