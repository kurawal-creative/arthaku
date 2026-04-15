<script lang="ts">
  import PlusIcon from "@lucide/svelte/icons/plus";
  import Badge from "../ui/badge/badge.svelte";
  import TopbarBreadcrumb from "../TopbarBreadcrumb.svelte";
</script>

<div class="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
  <div class="space-y-1">
    <TopbarBreadcrumb />

    <!-- Title -->
    <div class="space-y-1">
      <h1 class="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">Transaksi</h1>

      <p class="max-w-xl text-sm leading-relaxed text-muted-foreground">Kelola pemasukan, pengeluaran, dan riwayat transaksi dalam satu tampilan yang bersih dan fokus.</p>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="flex items-center gap-2">
    <!-- Optional: Secondary action -->
    <button class="hidden rounded-xl border border-border px-4 py-2 text-sm text-muted-foreground transition hover:bg-muted md:inline-flex"> Export </button>

    <!-- Primary CTA -->
    <button type="button" class="group inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow-md active:scale-[0.98]">
      <PlusIcon class="h-4 w-4 transition-transform group-hover:rotate-90" />
      Tambah Transaksi
    </button>
  </div>
</div>
