<script>
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";
  import AsideDocumentation from "$lib/components/AsideDocumentation.svelte";
  import DocsContent from "$lib/components/DocsContent.svelte";
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarPageHeader />

  <!-- Main Content -->
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start mt-12">
    <DocsContent />

    <AsideDocumentation />
  </div>
</main>
