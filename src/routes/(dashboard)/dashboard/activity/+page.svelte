<script>
  import TimelineActivity from "$lib/components/dashboard/TimelineActivity.svelte";
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";
</script>

<main class="p-4 md:p-6 space-y-6">
  <TopbarPageHeader title="Aktifitas" description="Lihat riwayat aktivitas akun dan keuangan kamu" />
  <TimelineActivity />
</main>
