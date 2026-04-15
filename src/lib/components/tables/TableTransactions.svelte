<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";
  import MoreVertical from "@lucide/svelte/icons/more-vertical";
  import type { Transaction } from "$lib/types/transaction";

  type Props = {
    filteredInvoices: Transaction[];
    totalAmount: number;
  };

  let { filteredInvoices, totalAmount }: Props = $props();
  let activeActionId = $state<string | null>(null);

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

  const typeClassMap: Record<Transaction["type"], string> = {
    Masuk: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    Keluar: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300",
  };

  function toggleAction(id: string) {
    activeActionId = activeActionId === id ? null : id;
  }

  function closeAction() {
    activeActionId = null;
  }
</script>

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
            <Table.Head>Tanggal</Table.Head>
            <Table.Head>Deskripsi</Table.Head>
            <Table.Head>Kategori</Table.Head>
            <Table.Head>Metode</Table.Head>
            <Table.Head>Jenis</Table.Head>
            <Table.Head class="text-end">Nominal</Table.Head>
            <Table.Head class="text-end">Aksi</Table.Head>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {#each filteredInvoices as invoice (invoice.id)}
            <Table.Row class="hover:bg-muted/40 transition">
              <Table.Cell>{formatDate(invoice.date)}</Table.Cell>

              <Table.Cell>
                <div class="max-w-[18rem] space-y-0.5">
                  <p class="font-medium leading-none text-foreground">{invoice.description}</p>
                  <p class="text-xs text-muted-foreground">ID {invoice.id}</p>
                </div>
              </Table.Cell>

              <Table.Cell>
                <span class="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                  {invoice.category}
                </span>
              </Table.Cell>

              <Table.Cell>{invoice.method}</Table.Cell>

              <Table.Cell>
                <span class={`px-2 py-0.5 text-xs rounded-full ${typeClassMap[invoice.type]}`}>
                  {invoice.type}
                </span>
              </Table.Cell>

              <Table.Cell class={`text-end font-medium ${invoice.type === "Masuk" ? "text-emerald-600" : "text-rose-600"}`}>
                {formatRupiah(invoice.totalAmount)}
              </Table.Cell>

              <Table.Cell class="relative text-end">
                <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground" aria-label={`Aksi transaksi ${invoice.id}`} aria-haspopup="menu" aria-expanded={activeActionId === invoice.id} onclick={() => toggleAction(invoice.id)}>
                  <MoreVertical class="h-4 w-4" />
                </button>

                {#if activeActionId === invoice.id}
                  <div class="absolute right-0 top-full z-10 mt-2 w-36 overflow-hidden rounded-xl border border-border bg-background p-1 shadow-lg" role="menu">
                    <button
                      type="button"
                      class="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-foreground transition hover:bg-muted"
                      role="menuitem"
                      onclick={() => {
                        closeAction();
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      class="flex w-full items-center rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                      role="menuitem"
                      onclick={() => {
                        closeAction();
                      }}
                    >
                      Hapus
                    </button>
                  </div>
                {/if}
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.Cell colspan={6}>Total</Table.Cell>
            <Table.Cell class="text-end font-semibold">
              {formatRupiah(totalAmount)}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </div>
  {/if}
</div>
