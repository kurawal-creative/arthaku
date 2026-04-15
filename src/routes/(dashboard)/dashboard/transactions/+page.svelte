<script lang="ts">
  import SummaryTransactions from "$lib/components/SummaryTransactions.svelte";
  import TableTransactions from "$lib/components/tables/TableTransactions.svelte";
  import TopbarTransactions from "$lib/components/topbars/TopbarTransactions.svelte";
  import type { Transaction } from "$lib/types/transaction";

  let search = $state("");
  let filterType = $state("all");
  let daysLimit = $state(30);

  const invoices: Transaction[] = [
    {
      id: "TRX001",
      date: "2026-04-05",
      type: "Keluar",
      description: "Makan siang di restoran dekat kantor",
      category: "Makan",
      method: "Cash",
      totalAmount: 250000,
    },
    {
      id: "TRX002",
      date: "2026-04-05",
      type: "Masuk",
      description: "Transfer gaji bulanan",
      category: "Menabung",
      method: "Transfer Bank",
      totalAmount: 1250000,
    },
    {
      id: "TRX003",
      date: "2026-04-05",
      type: "Keluar",
      description: "Belanja kebutuhan rumah tangga",
      category: "Belanja",
      method: "QRIS",
      totalAmount: 50000,
    },
    {
      id: "TRX004",
      date: "2026-04-05",
      type: "Keluar",
      description: "Makan malam bersama keluarga",
      category: "Makan",
      method: "Debit Card",
      totalAmount: 100000,
    },
  ];

  const isInLastDays = (value: string, days: number) => {
    const today = new Date();
    const cutoff = new Date();
    cutoff.setDate(today.getDate() - days);

    const trxDate = new Date(value);
    return trxDate >= cutoff && trxDate <= today;
  };

  const filteredInvoices = $derived(
    invoices.filter((item) => {
      const matchDate = isInLastDays(item.date, daysLimit);
      const matchSearch = item.category.toLowerCase().includes(search.toLowerCase());

      const matchType = filterType === "all" || item.type.toLowerCase() === filterType;

      return matchDate && matchSearch && matchType;
    }),
  );

  const totalAmount = $derived(filteredInvoices.reduce((total, item) => total + item.totalAmount, 0));
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarTransactions />

  <!-- Summary -->
  <SummaryTransactions {filteredInvoices} {totalAmount} />

  <!-- Table -->
  <TableTransactions {filteredInvoices} {totalAmount} />
</main>
