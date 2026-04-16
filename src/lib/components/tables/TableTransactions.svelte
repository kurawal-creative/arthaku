<script lang="ts">
  import { onMount } from "svelte";
  import * as Table from "$lib/components/ui/table/index";
  import * as Pagination from "$lib/components/ui/pagination/index";
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

  onMount(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (activeActionId === null) return;

      const target = event.target;

      if (!(target instanceof Node)) return;

      const activeRow = document.querySelector(`[data-transaction-action-row="${activeActionId}"]`);

      if (activeRow?.contains(target)) return;

      closeAction();
    };

    document.addEventListener("pointerdown", handlePointerDown, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
    };
  });

  let page = $state(1);
  const pageSize = 15;

  const totalPages = $derived(Math.max(1, Math.ceil(filteredInvoices.length / pageSize)));

  const paginatedInvoices = $derived(filteredInvoices.slice((page - 1) * pageSize, page * pageSize));

  $effect(() => {
    if (page > totalPages) {
      page = totalPages;
    }

    if (page < 1) {
      page = 1;
    }

    if (activeActionId !== null && !filteredInvoices.some((invoice) => invoice.id === activeActionId)) {
      closeAction();
    }
  });
</script>

<div class="rounded-2xl border bg-background shadow-sm overflow-hidden">
  {#if filteredInvoices.length === 0}
    <div class="grid min-h-60 place-items-center text-center p-6">
      <p class="text-sm text-muted-foreground">Tidak ada data ditemukan</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <Table.Root class="text-sm">
        <!-- HEADER -->
        <Table.Header class="bg-muted/40">
          <Table.Row class="border-b">
            <Table.Head class="pl-4">No.</Table.Head>
            <Table.Head>Tanggal</Table.Head>
            <Table.Head>Deskripsi</Table.Head>
            <Table.Head>Kategori</Table.Head>
            <Table.Head>Metode</Table.Head>
            <Table.Head>Jenis</Table.Head>
            <Table.Head class="text-end">Nominal</Table.Head>
            <Table.Head class="text-end pr-4">Aksi</Table.Head>
          </Table.Row>
        </Table.Header>

        <!-- BODY -->
        <Table.Body>
          {#each paginatedInvoices as invoice (invoice.id)}
            <Table.Row class={`group border-b last:border-none transition hover:bg-muted/30 ${activeActionId === invoice.id ? "bg-muted/30" : ""}`}>
              <!-- No, -->
              <Table.Cell class="pl-4.5 text-muted-foreground">
                {(page - 1) * pageSize + paginatedInvoices.indexOf(invoice) + 1}
                {"."}
              </Table.Cell>

              <!-- Tanggal -->
              <Table.Cell class="text-muted-foreground">
                {formatDate(invoice.date)}
              </Table.Cell>

              <!-- Deskripsi -->
              <Table.Cell>
                <div class="max-w-[18rem] space-y-1">
                  <p class="font-medium text-foreground leading-tight">
                    {invoice.description}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    #{invoice.id}
                  </p>
                </div>
              </Table.Cell>

              <!-- Kategori -->
              <Table.Cell>
                <span class="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  {invoice.category}
                </span>
              </Table.Cell>

              <!-- Metode -->
              <Table.Cell class="text-muted-foreground">
                {invoice.method}
              </Table.Cell>

              <!-- Jenis -->
              <Table.Cell>
                <span
                  class={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs rounded-full font-medium
                  ${typeClassMap[invoice.type]}`}
                >
                  {invoice.type}
                </span>
              </Table.Cell>

              <!-- Nominal -->
              <Table.Cell
                class={`text-end font-semibold tabular-nums
                ${invoice.type === "Masuk" ? "text-emerald-600" : "text-rose-600"}`}
              >
                {formatRupiah(invoice.totalAmount)}
              </Table.Cell>

              <!-- Aksi -->
              <Table.Cell class="relative overflow-visible text-end pr-4" data-transaction-action-row={invoice.id}>
                <div class="relative inline-flex justify-end">
                  <button type="button" class={`inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground ${activeActionId === invoice.id ? "bg-muted text-foreground" : ""}`} onclick={() => toggleAction(invoice.id)} aria-expanded={activeActionId === invoice.id} aria-haspopup="menu">
                    <MoreVertical class="h-4 w-4" />
                  </button>

                  {#if activeActionId === invoice.id}
                    <div class="absolute right-0 top-full z-20 mt-2 w-40 min-w-max overflow-hidden rounded-xl border border-border bg-background p-1 shadow-lg" role="menu">
                      <button class="flex w-full items-center rounded-lg px-3 py-2 text-sm hover:bg-muted" onclick={closeAction}> Edit </button>
                      <button class="flex w-full items-center rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10" onclick={closeAction}> Hapus </button>
                    </div>
                  {/if}
                </div>
              </Table.Cell>
            </Table.Row>
          {/each}
        </Table.Body>
      </Table.Root>
      <div class="flex items-center justify-end px-4 py-3 border-t">
        <Pagination.Root count={filteredInvoices.length} perPage={pageSize} bind:page class="mx-0 w-auto justify-end">
          {#snippet children({ pages, currentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton />
              </Pagination.Item>
              {#each pages as paginationPage (paginationPage.key)}
                {#if paginationPage.type === "ellipsis"}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link page={paginationPage} isActive={currentPage === paginationPage.value}>
                      {paginationPage.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.NextButton />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </div>
    </div>
  {/if}
</div>
