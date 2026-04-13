<script>
  const fiturDummy = [
    {
      title: "Pencatatan Otomatis",
      description: "Semua transaksi harian kamu bisa tercatat otomatis sehingga kamu tidak perlu input manual berulang kali setiap hari.",
    },
    {
      title: "Analisis Pengeluaran",
      description: "Lihat pola pengeluaran bulanan dengan ringkasan yang jelas agar kamu bisa menentukan prioritas finansial lebih tepat.",
    },
    {
      title: "Target Keuangan",
      description: "Buat target tabungan berdasarkan kebutuhanmu lalu pantau progresnya secara berkala sampai tujuan tercapai.",
    },
    {
      title: "Laporan Ringkas",
      description: "Unduh laporan keuangan singkat dalam format yang mudah dibaca untuk evaluasi mingguan atau bulanan.",
    },
  ];
</script>

<section class="mx-auto w-full max-w-7xl py-8 md:py-12">
  <div class="text-left space-y-2 max-w-xl">
    <div class="inline-flex items-center gap-2 rounded-full bg-primary pl-1 pr-2 py-1 text-xs text-white">
      <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-semibold text-primary-dark"> 1 </span>
      <span>Fitur Unggulan</span>
    </div>

    <p class="mt-2 font-semibold text-3xl leading-tight text-primary">Buka seluruh potensi Kamu dengan fitur-fitur unggulan yang kami tawarkan.</p>
    <p class="text-lg text-secondary-dark leading-relaxed">Arthaku hadir dengan fitur-fitur cerdas</p>
  </div>
  <div class="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {#each fiturDummy as fitur}
      <article class="flex flex-col rounded-xs border border-primary/20 bg-white p-4">
        <div class="inline-flex h-8 w-8 items-center justify-center rounded-xs border border-primary/25 text-primary">
          <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5" aria-hidden="true">
            <path d="M5 12h14M12 5v14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </div>
        <div class="space-y-1 mt-4">
          <h3 class="text-lg font-semibold text-primary">{fitur.title}</h3>
          <p class="overflow-hidden text-sm leading-relaxed text-secondary-dark line-clamp-3">
            {fitur.description}
          </p>

          <a href="/features" class="pt-2 text-sm font-medium text-primary hover:underline">Lihat selengkapnya...</a>
        </div>
      </article>
    {/each}
  </div>
</section>
