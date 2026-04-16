<script lang="ts">
  import { onMount } from 'svelte'
  import * as Table from '$lib/components/ui/table/index'
  import * as Pagination from '$lib/components/ui/pagination/index'
  import MoreVertical from '@lucide/svelte/icons/more-vertical'
  import CalendarIcon from '@lucide/svelte/icons/calendar'
  import type { Target } from '$lib/types/target'

  type Props = {
    targets: Target[]
  }

  let { targets }: Props = $props()
  let activeActionId = $state<string | null>(null)

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  const formatDate = (value: string) =>
    new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value))

  const calcProgress = (current: number, target: number) => Math.min(Math.round((current / target) * 100), 100)

  const statusClassMap: Record<Target['status'], string> = {
    Tercapai: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    Berjalan: 'bg-primary/10 text-primary',
    'Hampir Tercapai': 'bg-lime-100 text-lime-700 dark:bg-lime-500/20 dark:text-lime-300',
    Gagal: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  }

  const progressBarClassMap: Record<Target['status'], string> = {
    Tercapai: 'bg-emerald-500',
    Berjalan: 'bg-primary',
    'Hampir Tercapai': 'bg-lime-500',
    Gagal: 'bg-rose-500',
  }

  function toggleAction(id: string) {
    activeActionId = activeActionId === id ? null : id
  }

  function closeAction() {
    activeActionId = null
  }

  onMount(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (activeActionId === null) return
      const target = event.target
      if (!(target instanceof Node)) return
      const activeRow = document.querySelector(`[data-target-action-row="${activeActionId}"]`)
      if (activeRow?.contains(target)) return
      closeAction()
    }

    document.addEventListener('pointerdown', handlePointerDown, true)
    return () => document.removeEventListener('pointerdown', handlePointerDown, true)
  })

  let currentPage = $state(1)
  const pageSize = 10

  const totalPages = $derived(Math.max(1, Math.ceil(targets.length / pageSize)))
  const paginatedTargets = $derived(targets.slice((currentPage - 1) * pageSize, currentPage * pageSize))

  $effect(() => {
    if (currentPage > totalPages) currentPage = totalPages
    if (currentPage < 1) currentPage = 1
    if (activeActionId !== null && !targets.some((t) => t.id === activeActionId)) closeAction()
  })
</script>

<div class="overflow-hidden rounded-2xl border bg-background shadow-sm">
  {#if targets.length === 0}
    <div class="grid min-h-60 place-items-center p-6 text-center">
      <p class="text-sm text-muted-foreground">Belum ada target yang dibuat</p>
    </div>
  {:else}
    <div class="overflow-x-auto">
      <Table.Root class="text-sm">
        <!-- HEADER -->
        <Table.Header class="bg-muted/40">
          <Table.Row class="border-b">
            <Table.Head class="pl-4">No.</Table.Head>
            <Table.Head>Nama Target</Table.Head>
            <Table.Head class="min-w-40">Progress</Table.Head>
            <Table.Head>Nominal</Table.Head>
            <Table.Head>Estimasi Waktu</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head class="pr-4 text-end">Aksi</Table.Head>
          </Table.Row>
        </Table.Header>

        <!-- BODY -->
        <Table.Body>
          {#each paginatedTargets as target, i (target.id)}
            {@const progress = calcProgress(target.currentAmount, target.targetAmount)}
            <Table.Row class={`group border-b last:border-none transition hover:bg-muted/30 ${activeActionId === target.id ? 'bg-muted/30' : ''}`}>
              <!-- No. -->
              <Table.Cell class="pl-4.5 text-muted-foreground">
                {(currentPage - 1) * pageSize + i + 1}.
              </Table.Cell>

              <!-- Nama Target -->
              <Table.Cell>
                <div class="space-y-0.5">
                  <p class="font-medium leading-tight text-foreground">{target.name}</p>
                  <p class="text-xs text-muted-foreground">#{target.id}</p>
                </div>
              </Table.Cell>

              <!-- Progress Bar -->
              <Table.Cell>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-full min-w-24 rounded-full bg-muted">
                    <div class="h-full rounded-full transition-all duration-500 {progressBarClassMap[target.status]}" style="width: {progress}%"></div>
                  </div>
                  <span class="w-9 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
                    {progress}%
                  </span>
                </div>
              </Table.Cell>

              <!-- Nominal Detail -->
              <Table.Cell>
                <div class="space-y-0.5">
                  <p class="font-semibold tabular-nums text-foreground">
                    {formatRupiah(target.targetAmount)}
                  </p>
                  <p class="text-xs text-muted-foreground">
                    Terkumpul: <span class="font-medium text-primary">{formatRupiah(target.currentAmount)}</span>
                  </p>
                </div>
              </Table.Cell>

              <!-- Estimasi Waktu -->
              <Table.Cell>
                {#if target.estimatedDate}
                  <div class="flex items-center gap-1.5 text-muted-foreground">
                    <CalendarIcon class="h-3.5 w-3.5 shrink-0" />
                    <span>{formatDate(target.estimatedDate)}</span>
                  </div>
                {:else}
                  <span class="text-muted-foreground/50">—</span>
                {/if}
              </Table.Cell>

              <!-- Status -->
              <Table.Cell>
                <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {statusClassMap[target.status]}">
                  {target.status}
                </span>
              </Table.Cell>

              <!-- Aksi -->
              <Table.Cell class="relative overflow-visible pr-4 text-end" data-target-action-row={target.id}>
                <div class="relative inline-flex justify-end">
                  <button type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition hover:bg-muted hover:text-foreground {activeActionId === target.id ? 'bg-muted text-foreground' : ''}" onclick={() => toggleAction(target.id)} aria-expanded={activeActionId === target.id} aria-haspopup="menu">
                    <MoreVertical class="h-4 w-4" />
                  </button>

                  {#if activeActionId === target.id}
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

      <!-- Pagination -->
      <div class="flex items-center justify-end border-t px-4 py-3">
        <Pagination.Root count={targets.length} perPage={pageSize} bind:page={currentPage} class="mx-0 w-auto justify-end">
          {#snippet children({ pages, currentPage: cp })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton />
              </Pagination.Item>
              {#each pages as paginationPage (paginationPage.key)}
                {#if paginationPage.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link page={paginationPage} isActive={cp === paginationPage.value}>
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
