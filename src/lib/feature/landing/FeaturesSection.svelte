<script>
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";

</script>
<section class="mx-auto w-full max-w-7xl py-8 md:py-12">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      
        <!-- Left Column -->
        <div class="grid min-h-130 grid-cols-2 gap-3">
          <div class="row-span-2 rounded-xs bg-gray-100 p-6">
            <p class="text-sm/5 uppercase tracking-wide ">Smart Tracking</p>
            <h3 class="mt-2 text-2xl font-semibold">Catat Pengeluaran Harian</h3>
            <p class="mt-3 text-sm/6 ">Semua transaksi masuk otomatis ke ringkasan harian supaya kamu cepat tahu pengeluaran terbesar.</p>
          </div>

          <div class="rounded-xs bg-gray-100 p-5">
            <p class="text-xs uppercase tracking-wide ">Budget Alert</p>
            <p class="mt-2 text-lg font-semibold">Batas Belanja</p>
            <p class="mt-1 text-sm ">Notifikasi saat mendekati limit.</p>
          </div>

          <div class="rounded-xs bg-gray-100 p-5">
            <p class="text-xs uppercase tracking-wide ">Weekly Goal</p>
            <p class="mt-2 text-lg font-semibold">Target Nabung</p>
            <p class="mt-1 text-sm ">Pantau progres menabung tiap minggu.</p>
          </div>

          <div class="col-span-2 rounded-xs bg-gray-100 p-6">
            <p class="text-sm uppercase tracking-wide ">Insight Otomatis</p>
            <h3 class="mt-2 text-xl font-semibold">Laporan Keuangan Bulanan</h3>
            <p class="mt-2 text-sm/6 ">Grafik pemasukan vs pengeluaran tampil otomatis agar keputusan finansial lebih cepat dan tepat.</p>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6 max-w-3xl mx-auto w-full">
          <p class="text-4xl text-primary max-w-xl leading-tight font-bold">
            Fitur cerdas yang membuat <span class="text-accent">Arthaku</span> lebih unggul
          </p>

          <Accordion type="single" class="text-primary-dark">
            <AccordionItem value="item-1">
              <AccordionTrigger>Pencatatan Otomatis</AccordionTrigger>
              <AccordionContent>
                <p>Catat pemasukan dan pengeluaran langsung dari chat tanpa ribet. Semua tercatat otomatis dan rapi.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Ringkasan Keuangan Real-time</AccordionTrigger>
              <AccordionContent>
                <p>Pantau kondisi keuangan Anda kapan saja dengan ringkasan yang jelas dan mudah dipahami.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Terintegrasi dengan Chat Favorit</AccordionTrigger>
              <AccordionContent>
                <p>Gunakan Arthaku langsung dari aplikasi chat yang Anda gunakan sehari-hari, tanpa perlu aplikasi tambahan.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <a href="/" class="inline-flex items-center gap-1 rounded-xs bg-primary px-3 py-2 font-semibold text-white hover:bg-primary-hover transition-colors duration-300">
            Coba Sekarang <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>