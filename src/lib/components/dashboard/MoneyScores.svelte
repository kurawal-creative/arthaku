<script lang="ts">
  import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
  import ShieldCheckIcon from '@lucide/svelte/icons/shield-check'
  import CircleAlertIcon from '@lucide/svelte/icons/circle-alert'
  import StarIcon from '@lucide/svelte/icons/star'

  const score = 72
  const maxScore = 100
  const pct = Math.round((score / maxScore) * 100)

  const getStatus = (s: number) => {
    if (s >= 90) return { label: 'Sangat Sehat', icon: StarIcon, tip: 'Luar biasa! Keuangan kamu sangat terkontrol.' }
    if (s >= 75) return { label: 'Sehat', icon: ShieldCheckIcon, tip: 'Pertahankan pola ini untuk hasil optimal.' }
    if (s >= 55) return { label: 'Cukup Sehat', icon: TrendingUpIcon, tip: 'Bisa meningkat jika pengeluaran lebih terkontrol.' }
    return { label: 'Perlu Perbaikan', icon: CircleAlertIcon, tip: 'Segera evaluasi pengeluaran dan mulai menabung.' }
  }

  const status = getStatus(score)
</script>

<div class="overflow-hidden rounded-2xl shadow-sm" style="background-color: var(--color-primary)">
  <div class="flex items-center justify-between gap-4 px-6 py-6">
    <!-- Kiri: teks skor -->
    <div class="space-y-1.5">
      <p class="text-sm font-medium text-white/70">Skor Keuangan</p>
      <div class="flex items-end gap-2">
        <span class="text-5xl font-bold tracking-tight text-white">{score}</span>
        <span class="mb-1.5 text-xl font-medium text-white/60">/ {maxScore}</span>
      </div>
      <div class="flex items-center gap-1.5">
        <status.icon class="h-4 w-4 text-white/80" />
        <span class="text-sm font-semibold text-white/90">{status.label}</span>
      </div>
      <p class="max-w-48 text-xs leading-relaxed text-white/60">{status.tip}</p>
    </div>

    <!-- Kanan: SVG ring -->
    <div class="relative flex h-28 w-28 shrink-0 items-center justify-center">
      <svg class="absolute inset-0 -rotate-90" viewBox="0 0 96 96" fill="none">
        <circle cx="48" cy="48" r="40" stroke="white" stroke-opacity="0.15" stroke-width="8" />
        <circle cx="48" cy="48" r="40" stroke="white" stroke-opacity="0.9" stroke-width="8" stroke-linecap="round" stroke-dasharray={2 * Math.PI * 40} stroke-dashoffset={2 * Math.PI * 40 * (1 - pct / 100)} />
      </svg>
      <span class="text-2xl font-bold text-white">{pct}%</span>
    </div>
  </div>
</div>
