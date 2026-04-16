<script lang="ts">
  import CheckCircle2Icon from '@lucide/svelte/icons/check-circle-2'
  import LightbulbIcon from '@lucide/svelte/icons/lightbulb'

  const recommendations = [
    'Batasi makan di luar maksimal 3x',
    'Alokasikan minimal 20% pemasukan ke tabungan',
    'Kurangi pengeluaran impulsif kecil',
  ]
</script>

<section class="rounded-2xl border border-border/70 bg-card p-4 shadow-sm sm:p-5">
  <div class="mb-4 flex items-start justify-between gap-3">
    <div>
      <p class="text-base font-semibold text-foreground">Rekomendasi Minggu Ini</p>
      <p class="text-sm text-muted-foreground">Langkah kecil yang bisa langsung kamu terapkan minggu ini.</p>
    </div>
    <div class="shrink-0 rounded-lg bg-primary/15 p-2 dark:bg-primary/20">
      <LightbulbIcon class="h-4 w-4 text-primary" />
    </div>
  </div>

  <ul class="space-y-2.5">
    {#each recommendations as recommendation, i}
      <li class="flex items-center gap-2.5 rounded-lg border border-border/60 bg-muted/35 px-3 py-2.5 dark:bg-muted/25">
        <div class="shrink-0 rounded-full bg-primary/15 p-0.5 dark:bg-primary/20">
          <CheckCircle2Icon class="h-6 w-6 text-primary" />
        </div>
        <div class="min-w-0">
          <p class="text-xs font-semibold text-primary">Aksi {i + 1}</p>
          <p class="text-sm text-muted-foreground">{recommendation}</p>
        </div>
      </li>
    {/each}
  </ul>
</section>