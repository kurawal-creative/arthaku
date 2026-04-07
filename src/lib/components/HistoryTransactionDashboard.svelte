<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Popover from "$lib/components/ui/popover/index";
  import * as Table from "$lib/components/ui/table/index";
  import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";

  const filters = [
    { label: "3 hari", days: 3 },
    { label: "7 hari", days: 7 },
    { label: "30 hari", days: 30 },
  ];

  let selectedDays = $state(7);

  const invoices = [
    {
      id: "TRX001",
      date: "2026-04-05",
      type: "Keluar",
      category: "Makan",
      totalAmount: 250000,
      daysAgo: 2,
    },
    {
      id: "TRX002",
      date: "2026-03-29",
      type: "Masuk",
      category: "Menabung",
      totalAmount: 150000,
      daysAgo: 9,
    },
    {
      id: "TRX003",
      date: "2026-03-24",
      type: "Keluar",
      category: "Belanja",
      totalAmount: 350000,
      daysAgo: 14,
    },
    {
      id: "TRX004",
      date: "2026-03-19",
      type: "Keluar",
      category: "Transport",
      totalAmount: 450000,
      daysAgo: 19,
    },
    {
      id: "TRX005",
      date: "2026-03-10",
      type: "Keluar",
      category: "Hiburan",
      totalAmount: 550000,
      daysAgo: 28,
    },
    {
      id: "TRX006",
      date: "2026-02-14",
      type: "Masuk",
      category: "Menabung",
      totalAmount: 200000,
      daysAgo: 52,
    },
    {
      id: "TRX007",
      date: "2026-01-10",
      type: "Keluar",
      category: "Makan",
      totalAmount: 300000,
      daysAgo: 87,
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
    Masuk: "bg-emerald-100 text-emerald-700",
    Keluar: "bg-rose-100 text-rose-700",
  };

  const filteredInvoices = $derived(invoices.filter((item) => item.daysAgo <= selectedDays));
  const displayedInvoices = $derived(filteredInvoices.slice(0, 15));
  const totalAmount = $derived(filteredInvoices.reduce((total, item) => total + item.totalAmount, 0));
</script>

<div class="rounded-2xl shadow-sm overflow-hidden">
  <Card.Root>
    <Card.Header class="flex gap-4 flex-row items-center justify-between">
      <div class="">
        <Card.Title>Riwayat Transaksi</Card.Title>
        <Card.Description>Filter berdasarkan rentang hari terakhir</Card.Description>
      </div>

      <Popover.Root>
        <Popover.Trigger>
          {#snippet child({ props })}
            <button {...props} type="button" class="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Filter riwayat transaksi">
              <EllipsisVertical class="w-4 h-4" />
            </button>
          {/snippet}
        </Popover.Trigger>

        <Popover.Content align="end" class="w-44 p-2">
          <p class="px-2 pb-2 text-xs font-medium text-muted-foreground">Pilih rentang hari</p>
          <div class="grid gap-1">
            {#each filters as filter (filter.days)}
              <button type="button" class="rounded-md px-2.5 py-2 text-left text-sm transition-colors" class:bg-muted={selectedDays === filter.days} class:text-foreground={selectedDays === filter.days} class:text-muted-foreground={selectedDays !== filter.days} onclick={() => (selectedDays = filter.days)}>
                {filter.label}
              </button>
            {/each}
          </div>
        </Popover.Content>
      </Popover.Root>
    </Card.Header>

    <Card.Content class="pt-0">
      <div class="rounded-xl overflow-hidden bg-background h-full overflow-x-auto">
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
            {#if displayedInvoices.length === 0}
              <Table.Row>
                <Table.Cell colspan={4} class="text-center text-muted-foreground">Belum ada transaksi untuk rentang ini</Table.Cell>
              </Table.Row>
            {:else}
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
                  <Table.Cell class="text-end font-medium">{formatRupiah(invoice.totalAmount)}</Table.Cell>
                </Table.Row>
              {/each}
            {/if}
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.Cell colspan={3}>Total</Table.Cell>
              <Table.Cell class="text-end">{formatRupiah(totalAmount)}</Table.Cell>
            </Table.Row>
          </Table.Footer>
        </Table.Root>
      </div>
    </Card.Content>
  </Card.Root>
</div>
