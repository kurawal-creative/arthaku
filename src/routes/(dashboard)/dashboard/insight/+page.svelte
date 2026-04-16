<script>
  import InsightList from '$lib/components/InsightList.svelte'
  import MoneyScores from '$lib/components/MoneyScores.svelte'
  import RecommendationInsight from '$lib/components/RecommendationInsight.svelte';
  import TopbarInsights from '$lib/components/topbars/TopbarInsights.svelte'
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarInsights />

  <!-- Financial Score -->
  <MoneyScores />

  <!-- Insight List -->
  <InsightList />

  <!-- Recommendation Block -->
  <RecommendationInsight />
</main>
