<script lang="ts">
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";
  import type { Transaction } from "$lib/types/transaction";

  import ExpenditureCategoricalAnalytics from "$lib/components/dashboard/ExpenditureCategoricalAnalytics.svelte";
  import ExpenditureBiggestAnalytics from "$lib/components/dashboard/ExpenditureBiggestAnalytics.svelte";
  import ChartsAnalytics from "$lib/components/dashboard/ChartsAnalytics.svelte";
  import SummaryAnalytics from "$lib/components/dashboard/SummaryAnalytics.svelte";
  import MoneyInsight from "$lib/components/dashboard/MoneyInsight.svelte";

  const transactions: Transaction[] = [
    { id: "TRX001", date: new Date().toISOString(), type: "Masuk", description: "Gaji Bulanan", category: "Pendapatan", method: "Transfer", totalAmount: 5000000 },
    { id: "TRX002", date: new Date().toISOString(), type: "Keluar", description: "Makan", category: "Makanan", method: "Cash", totalAmount: 1500000 },
    { id: "TRX003", date: new Date().toISOString(), type: "Keluar", description: "Belanja Bulanan", category: "Belanja", method: "Debit", totalAmount: 800000 },
    { id: "TRX004", date: new Date().toISOString(), type: "Keluar", description: "Transport", category: "Transport", method: "Cash", totalAmount: 450000 },
    { id: "TRX005", date: new Date().toISOString(), type: "Keluar", description: "Hiburan", category: "Hiburan", method: "Debit", totalAmount: 500000 },
  ];
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarPageHeader title="Analisis" description="Analisis tabungan kamu dengan cara yang menyenangkan" showDatePicker />

  <!-- SummaryAnalytics -->
  <SummaryAnalytics {transactions} />

  <!-- Chart -->
  <ChartsAnalytics />

  <!-- Breakdown -->
  <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Expenditure -->
    <ExpenditureCategoricalAnalytics />

    <!-- Top ExpenditureCategoricalAnalytics -->
    <ExpenditureBiggestAnalytics />
  </section>

  <!-- Insight -->
  <MoneyInsight />
</main>
