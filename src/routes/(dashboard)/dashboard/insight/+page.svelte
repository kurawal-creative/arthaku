<script>
  import InsightList from '$lib/components/InsightList.svelte'
  import MoneyScores from '$lib/components/MoneyScores.svelte'
  import TopbarInsights from '$lib/components/topbars/TopbarInsights.svelte'

  const insights = [
    {
      type: 'warning',
      title: 'Pengeluaran makan meningkat',
      description: 'Naik 25% dibanding minggu lalu dengan 12 transaksi.',
      action: 'Batasi makan di luar maksimal 3x/minggu.',
    },
    {
      type: 'positive',
      title: 'Tabungan berjalan konsisten',
      description: 'Kamu menabung selama 3 minggu berturut-turut.',
      action: 'Pertahankan kebiasaan ini untuk capai target lebih cepat.',
    },
    {
      type: 'info',
      title: 'Pengeluaran kecil cukup besar',
      description: 'Transaksi di bawah Rp 50.000 menyumbang 40% pengeluaran.',
      action: 'Perhatikan pengeluaran kecil agar lebih hemat.',
    },
  ]

  const typeStyle = {
    warning: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600',
    positive: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600',
    info: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600',
  }
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarInsights />

  <!-- Financial Score -->
  <MoneyScores />

  <!-- Insight List -->
  <InsightList />

  <!-- Recommendation Block -->
  <section class="rounded-2xl border p-4 space-y-2">
    <h2 class="text-sm font-semibold">Rekomendasi Minggu Ini</h2>

    <ul class="text-sm text-muted-foreground list-disc pl-4 space-y-1">
      <li>Batasi makan di luar maksimal 3x</li>
      <li>Alokasikan minimal 20% pemasukan ke tabungan</li>
      <li>Kurangi pengeluaran impulsif kecil</li>
    </ul>
  </section>
</main>
