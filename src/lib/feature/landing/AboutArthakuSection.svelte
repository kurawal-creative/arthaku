<script lang="ts">
  import { onMount } from "svelte";
  import TextReveal from "$lib/components/TextReveal.svelte";

  let aboutSectionRef = $state<HTMLElement | null>(null);
  let spreadCards = $state(false);

  const aboutSegments = [
    { text: "Arthaku" },
    { text: "terintegrasi" },
    { text: "langsung" },
    { text: "dengan" },
    { text: "aplikasi", accent: true },
    { text: "chat", accent: true },
    { text: "favoritmu", accent: true },
    { text: "untuk" },
    { text: "membantu" },
    { text: "mencatat" },
    { text: "tabungan" },
    { text: "dan" },
    { text: "pengeluaran" },
    { text: "secara" },
    { text: "otomatis." },
    { text: "Lebih" },
    { text: "sederhana", accent: true },
    { text: "," },
    { text: "transparan", accent: true },
    { text: "," },
    { text: "dan" },
    { text: "mudah." },
  ];

  onMount(() => {
    if (!aboutSectionRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        spreadCards = entry.isIntersecting;
      },
      { threshold: 0.35 },
    );

    observer.observe(aboutSectionRef);

    return () => {
      observer.disconnect();
    };
  });
</script>

<section bind:this={aboutSectionRef} class="max-w-7xl w-full mx-auto relative py-8 md:py-12">
  <div class="flex flex-col justify-center">
    <div class="relative mt-8 text-center max-w-4xl w-full mx-auto md:mt-10">
      <div class="relative z-10">
        <TextReveal class="text-primary" scrollTargetRef={aboutSectionRef} segments={aboutSegments}>
          <!-- Cards -->
          <div class="relative z-50 h-40 w-full -top-45 max-w-3xl md:h-36">
            <!-- kiri -->
            <div
              class={`absolute left-1/2 top-1/2 z-10 flex w-[clamp(12.5rem,28vw,15rem)] justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-700 ease-out
          ${spreadCards ? "-translate-x-[calc(50%+4.5rem)] -translate-y-1/2 -rotate-12 md:-translate-x-[calc(50%+8.5rem)] lg:-translate-x-[calc(50%+11rem)]" : "-translate-x-1/2 -translate-y-1/2 -rotate-4"}`}
            >
              <div class="flex items-start gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">AK</div>
                <div class="flex flex-col">
                  <p class="text-[11px] font-semibold text-secondary-dark uppercase tracking-wide">Auto Track</p>
                  <p class="mt-1 text-sm font-semibold text-primary">Catat dari chat</p>
                  <p class="mt-1 text-xs text-secondary-dark">Masuk otomatis tanpa input manual.</p>
                  <p class="mt-1.5 inline-flex w-fit rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">Sinkron otomatis</p>
                </div>
              </div>
              <div class="pl-2 text-[11px] text-secondary-dark">2 mnt</div>
            </div>

            <!-- tengah -->
            <div
              class={`absolute left-1/2 top-1/2 z-20 flex w-[clamp(12.5rem,28vw,15rem)] justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-lg backdrop-blur-[1px] transition-all duration-700 ease-out
			${spreadCards ? "-translate-x-1/2 -translate-y-1/2 rotate-0" : "-translate-x-1/2 -translate-y-1/2 rotate-0"}`}
            >
              <div class="flex items-start gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">AK</div>
                <div class="flex flex-col">
                  <p class="text-[11px] font-semibold text-secondary-dark uppercase tracking-wide">Budget</p>
                  <p class="mt-1 text-sm font-semibold text-primary">Monitor mingguan</p>
                  <p class="mt-1 text-xs text-secondary-dark">Sisa budget terpantau real-time.</p>
                  <p class="mt-1.5 inline-flex w-fit rounded-full bg-yellow-50 px-2 py-0.5 text-[11px] font-medium text-yellow-700">Terkendali</p>
                </div>
              </div>
              <div class="pl-2 text-[11px] text-secondary-dark">5 jam</div>
            </div>

            <!-- kanan -->
            <div
              class={`absolute left-1/2 top-1/2 z-10 flex w-[clamp(12.5rem,28vw,15rem)] justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-700 ease-out
          ${spreadCards ? "translate-x-[calc(-50%+4.5rem)] -translate-y-1/2 rotate-12 md:translate-x-[calc(-50%+8.5rem)] lg:translate-x-[calc(-50%+11rem)]" : "-translate-x-1/2 -translate-y-1/2 rotate-4"}`}
            >
              <div class="flex items-start gap-2.5">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-[11px] font-semibold text-primary">AK</div>
                <div class="flex flex-col">
                  <p class="text-[11px] font-semibold text-secondary-dark uppercase tracking-wide">Insight</p>
                  <p class="mt-1 text-sm font-semibold text-primary">Laporan otomatis</p>
                  <p class="mt-1 text-xs text-secondary-dark">Ringkasan cashflow siap dibaca kapan saja.</p>
                  <p class="mt-1.5 inline-flex w-fit rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">Realtime</p>
                </div>
              </div>
              <div class="pl-2 text-[11px] text-secondary-dark">Baru</div>
            </div>
          </div>
        </TextReveal>
      </div>
    </div>
  </div>
</section>
