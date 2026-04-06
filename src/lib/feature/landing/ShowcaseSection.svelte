<script lang="ts">
  import { onMount } from "svelte";
  import mock from "../../assets/images/mock-iphone.png";

  let sectionRef: HTMLElement | null = null;
  let scrollYProgress = 0;
  let redContentY = $state(0);

  let showLeftTop = $state(false);
  let showRightTop = $state(false);
  let showLeftBottom = $state(false);
  let showRightBottom = $state(false);

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  function transformRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    const progress = clamp((value - inMin) / (inMax - inMin), 0, 1);
    return outMin + progress * (outMax - outMin);
  }

  function updateProgress() {
    if (!sectionRef) return;

    const rect = sectionRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height;
    const maxScroll = Math.max(sectionHeight - viewportHeight, 1);

    scrollYProgress = clamp((window.scrollY - sectionTop) / maxScroll, 0, 1);
    redContentY = transformRange(scrollYProgress, 0.2, 0.9, 0, -560);

    if (scrollYProgress >= 0.2) showLeftTop = true;
    if (scrollYProgress >= 0.3) showRightTop = true;
    if (scrollYProgress >= 0.4) showLeftBottom = true;
    if (scrollYProgress >= 0.5) showRightBottom = true;
  }

  onMount(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  });
</script>

<section bind:this={sectionRef} class="relative z-10 -mt-38 h-[200vh]">
  <div class="magicpattern relative h-full bg-fixed bg-bottom bg-no-repeat">
    <div class="pointer-events-none absolute inset-x-0 top-0 z-40 h-42 bg-linear-to-b from-white/95 via-white/40 to-transparent"></div>

    <div class="pointer-events-none sticky top-0 h-20 w-full"></div>

    <div class="sticky top-15 -mt-22 mx-auto flex h-[calc(100vh-3rem)] w-full items-end justify-center">
      <div class="relative w-[clamp(320px,35vw,440px)]">
        <enhanced:img src={mock} alt="mockup" draggable="false" class="relative left-[11%] z-30 h-auto w-full" />

        <div class="absolute left-[24%] top-[2.5%] z-20 h-[81%] w-[52%] overflow-hidden rounded-[2rem] bg-red-600 p-4">
          <div style={`transform: translateY(${redContentY}px);`} class="space-y-3 text-white">
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Pengeluaran Hari Ini: Rp 86.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Pemasukan: Rp 240.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Sisa Budget Mingguan: Rp 315.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Makan Siang - Rp 25.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Kopi Sore - Rp 18.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Transport - Rp 15.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Hiburan - Rp 22.000</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Target Nabung Bulan Ini: 68%</div>
            <div class="rounded-xl bg-white/15 p-3 text-sm font-medium">Semua transaksi tersinkron otomatis.</div>
          </div>
        </div>

        <!-- Left Top -->
        <div class="absolute z-40 -left-[clamp(10.5rem,16vw,16rem)] top-[12%] flex w-80 justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-450 ease-out" style={`opacity: ${showLeftTop ? 1 : 0}; transform: translateX(${showLeftTop ? 0 : -24}px);`}>
          <div class="flex items-start gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">AK</div>
            <div class="flex flex-col">
              <p class="text-primary-dark text-sm font-semibold">Transaksi baru tercatat</p>
              <p class="text-secondary-dark text-xs mt-1">Makan siang - Rp 25.000</p>
              <p class="mt-1.5 inline-flex w-fit rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700">Sinkron otomatis</p>
            </div>
          </div>
          <div class="text-secondary-dark text-xs">2 mnt lalu</div>
        </div>

        <!-- Left Bottom -->
        <div class="absolute z-40 -left-[clamp(13rem,19vw,19rem)] top-[58%] flex w-80 justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-450 ease-out" style={`opacity: ${showLeftBottom ? 1 : 0}; transform: translateX(${showLeftBottom ? 0 : -24}px);`}>
          <div class="flex items-start gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">AK</div>
            <div class="flex flex-col">
              <p class="text-primary-dark text-sm font-semibold">Budget mingguan aman</p>
              <p class="text-secondary-dark text-xs mt-1">Sisa Rp 315.000 dari target</p>
              <p class="mt-1.5 inline-flex w-fit rounded-full bg-yellow-50 px-2 py-0.5 text-[11px] font-medium text-yellow-700">Terkendali</p>
            </div>
          </div>
          <div class="text-secondary-dark text-xs">5 jam lalu</div>
        </div>

        <!-- Right Top -->
        <div class="absolute z-40 -right-[clamp(11.5rem,17vw,17rem)] top-[23%] flex w-80 justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-450 ease-out" style={`opacity: ${showRightTop ? 1 : 0}; transform: translateX(${showRightTop ? 0 : 24}px);`}>
          <div class="flex items-start gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">AK</div>
            <div class="flex flex-col">
              <p class="text-primary-dark text-sm font-semibold">Laporan arus kas</p>
              <p class="text-secondary-dark text-xs mt-1">Update otomatis setiap transaksi</p>
              <p class="mt-1.5 inline-flex w-fit rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700">Realtime</p>
            </div>
          </div>
          <div class="text-secondary-dark text-xs">Baru saja</div>
        </div>

        <!-- Right Bottom -->
        <div class="absolute z-40 -right-[clamp(9.5rem,15vw,15rem)] top-[70%] flex w-80 justify-between rounded-2xl border border-primary/20 bg-white/95 p-3 shadow-md backdrop-blur-[1px] transition-all duration-450 ease-out" style={`opacity: ${showRightBottom ? 1 : 0}; transform: translateX(${showRightBottom ? 0 : 24}px);`}>
          <div class="flex items-start gap-2.5">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">AK</div>
            <div class="flex flex-col">
              <p class="text-primary-dark text-sm font-semibold">Reminder evaluasi</p>
              <p class="text-secondary-dark text-xs mt-1 w-40">Cek progres & review pengeluaran mingguan</p>
              <p class="mt-1.5 inline-flex w-fit rounded-full bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700">Notifikasi aktif</p>
            </div>
          </div>
          <div class="text-secondary-dark text-xs">1 hari lalu</div>
        </div>
      </div>
    </div>
  </div>
</section>
