<script lang="ts">
  import TopbarTransactions from "$lib/components/topbar/TopbarTransactions.svelte";
  import * as Table from "$lib/components/ui/table/index.js";

  let search = $state("");
  let filterType = $state("all");
  let daysLimit = $state(30);

  const invoices = [
    {
      id: "TRX001",
      date: "2026-04-05",
      type: "Keluar",
      category: "Makan",
      totalAmount: 250000,
    },
    {
      id: "TRX002",
      date: "2026-04-05",
      type: "Masuk",
      category: "Menabung",
      totalAmount: 1250000,
    },
    {
      id: "TRX003",
      date: "2026-04-05",
      type: "Keluar",
      category: "Belanja",
      totalAmount: 50000,
    },
    {
      id: "TRX004",
      date: "2026-04-05",
      type: "Keluar",
      category: "Makan",
      totalAmount: 100000,
    },
  ];

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));

  const typeClassMap: Record<string, string> = {
    Masuk: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    Keluar: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  };

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

  const totalMasuk = $derived(filteredInvoices.filter((i) => i.type === "Masuk").reduce((t, i) => t + i.totalAmount, 0));

  const totalKeluar = $derived(filteredInvoices.filter((i) => i.type === "Keluar").reduce((t, i) => t + i.totalAmount, 0));
</script>

<main class="p-4 md:p-6 space-y-6">
  <!-- Header -->
  <TopbarTransactions />

  <!-- Filters -->
  <div class="flex flex-col md:flex-row gap-3">
    <input type="text" placeholder="Cari kategori..." bind:value={search} class="rounded-xl border px-3 py-2 text-sm w-full md:w-64" />

    <select bind:value={filterType} class="rounded-xl border px-3 py-2 text-sm">
      <option value="all">Semua</option>
      <option value="masuk">Masuk</option>
      <option value="keluar">Keluar</option>
    </select>

    <select bind:value={daysLimit} class="rounded-xl border px-3 py-2 text-sm">
      <option value={7}>7 Hari</option>
      <option value={30}>30 Hari</option>
      <option value={90}>3 Bulan</option>
    </select>
  </div>

  <!-- Summary -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="rounded-xl border p-4">
      <p class="text-xs text-muted-foreground">Pemasukan</p>
      <p class="font-semibold text-emerald-600">{formatRupiah(totalMasuk)}</p>
    </div>
    <div class="rounded-xl border p-4">
      <p class="text-xs text-muted-foreground">Pengeluaran</p>
      <p class="font-semibold text-rose-600">{formatRupiah(totalKeluar)}</p>
    </div>
    <div class="rounded-xl border p-4">
      <p class="text-xs text-muted-foreground">Total</p>
      <p class="font-semibold">{formatRupiah(totalAmount)}</p>
    </div>
  </div>

  <!-- Table -->
  <div class="rounded-2xl border bg-background shadow-sm overflow-hidden">
    {#if filteredInvoices.length === 0}
      <div class="grid min-h-60 place-items-center text-center p-6">
        <p class="text-sm text-muted-foreground">Tidak ada data ditemukan</p>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>Transaksi</Table.Head>
              <Table.Head>Jenis</Table.Head>
              <Table.Head>Kategori</Table.Head>
              <Table.Head class="text-end">Nominal</Table.Head>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {#each filteredInvoices as invoice (invoice.id)}
              <Table.Row class="hover:bg-muted/40 transition">
                <Table.Cell>{formatDate(invoice.date)}</Table.Cell>

                <Table.Cell>
                  <span class={`px-2 py-0.5 text-xs rounded-full ${typeClassMap[invoice.type]}`}>
                    {invoice.type}
                  </span>
                </Table.Cell>

                <Table.Cell>{invoice.category}</Table.Cell>

                <Table.Cell class={`text-end font-medium ${invoice.type === "Masuk" ? "text-emerald-600" : "text-rose-600"}`}>
                  {formatRupiah(invoice.totalAmount)}
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.Cell colspan={3}>Total</Table.Cell>
              <Table.Cell class="text-end font-semibold">
                {formatRupiah(totalAmount)}
              </Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </div>
    {/if}
  </div>
</main>
