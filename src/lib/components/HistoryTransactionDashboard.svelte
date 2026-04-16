<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import * as Table from "$lib/components/ui/table/index";
  import Button from "./ui/button/button.svelte";

  const DAYS_LIMIT = 30;
  const MAX_ROWS = 15;

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
    today.setHours(23, 59, 59, 999);

    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - days);
    cutoff.setHours(0, 0, 0, 0);

    const trxDate = new Date(`${value}T00:00:00`);
    return trxDate >= cutoff && trxDate <= today;
  };

  const filteredInvoices = $derived(invoices.filter((item) => isInLastDays(item.date, DAYS_LIMIT)));
  const displayedInvoices = $derived(filteredInvoices.slice(0, MAX_ROWS));
  const totalAmount = $derived(filteredInvoices.reduce((total, item) => total + item.totalAmount, 0));
</script>

<div class="rounded-2xl shadow-sm overflow-hidden h-85">
  <Card.Root class="h-full flex flex-col">
    <Card.Header class="flex items-center justify-between">
      <div>
        <Card.Title>Riwayat Transaksi</Card.Title>
        <Card.Description>Menampilkan transaksi 30 hari terakhir</Card.Description>
      </div>
      <div>
        <Button href="/dashboard" class="border rounded-lg px-2 py-1.5 text-sm bg-primary text-white hover:bg-primary-hover font-normal">Lihat semua</Button>
      </div>
    </Card.Header>

    <Card.Content class="pt-0 flex-1 min-h-0 flex flex-col">
      {#if displayedInvoices.length === 0}
        <div class="rounded-xl border bg-linear-to-br from-background via-background to-muted/40 h-full grid place-items-center p-6 text-center">
          <div class="space-y-3 max-w-sm">
            <div class="mx-auto h-12 w-12 rounded-full bg-primary/10 text-primary grid place-items-center text-xl">✦</div>
            <p class="text-sm font-semibold text-foreground">Belum ada transaksi bulan ini</p>
            <p class="text-xs text-muted-foreground leading-relaxed">Mulai catat pemasukan dan pengeluaran pertama kamu agar insight keuangan bisa muncul di dashboard.</p>
          </div>
        </div>
      {:else}
        <div class="rounded-xl bg-background h-full overflow-hidden border flex flex-col">
          <div class="flex-1 min-h-0 overflow-y-auto overflow-x-auto">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head class="w-[30%]">Transaksi</Table.Head>
                  <Table.Head>Jenis</Table.Head>
                  <Table.Head>Kategori</Table.Head>
                  <Table.Head class="text-end">Nominal</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {#each displayedInvoices as invoice (invoice.id)}
                  <Table.Row class="hover:bg-muted/40 transition-colors">
                    <Table.Cell class="font-medium">
                      {formatDate(invoice.date)}
                    </Table.Cell>
                    <Table.Cell>
                      <span class={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${typeClassMap[invoice.type] ?? "bg-muted text-muted-foreground"}`}>
                        {invoice.type}
                      </span>
                    </Table.Cell>
                    <Table.Cell>{invoice.category}</Table.Cell>
                    <Table.Cell class="text-end font-medium">
                      {formatRupiah(invoice.totalAmount)}
                    </Table.Cell>
                  </Table.Row>
                {/each}
              </Table.Body>
            </Table.Root>
          </div>

          <div class="border-t bg-background">
            <Table.Root>
              <Table.Footer>
                <Table.Row>
                  <Table.Cell colspan={3}>Total</Table.Cell>
                  <Table.Cell class="text-end">{formatRupiah(totalAmount)}</Table.Cell>
                </Table.Row>
              </Table.Footer>
            </Table.Root>
          </div>
        </div>
      {/if}
    </Card.Content>
  </Card.Root>
</div>
