<script lang="ts">
  import TopbarPageHeader from "$lib/components/TopbarPageHeader.svelte";

  import TableTargets from "$lib/components/tables/TableTargets.svelte";
  import type { Target } from "$lib/types/target";
  import SummaryTargets from "$lib/components/dashboard/SummaryTargets.svelte";

  const targets: Target[] = [
    { id: "TGT001", name: "Beli Laptop Baru", targetAmount: 15000000, currentAmount: 7500000, status: "Berjalan", estimatedDate: "2025-09-01" },
    { id: "TGT002", name: "Liburan ke Bali", targetAmount: 5000000, currentAmount: 5000000, status: "Tercapai", estimatedDate: "2025-03-15" },
    { id: "TGT003", name: "Dana Darurat", targetAmount: 20000000, currentAmount: 2000000, status: "Berjalan", estimatedDate: "2026-01-01" },
    { id: "TGT004", name: "Tabungan Nikah", targetAmount: 50000000, currentAmount: 45000000, status: "Hampir Tercapai", estimatedDate: "2025-12-31" },
    { id: "TGT005", name: "Beli Mobil", targetAmount: 80000000, currentAmount: 10000000, status: "Berjalan", estimatedDate: "2027-06-01" },
    { id: "TGT006", name: "Renovasi Rumah", targetAmount: 30000000, currentAmount: 0, status: "Gagal" },
  ];
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarPageHeader title="Target" description="Cantumkan target kamu dan buat diri kamu fokus!" />

  <!-- Summary -->
  <SummaryTargets {targets} />

  <!-- Table -->
  <TableTargets {targets} />
</main>
