<script lang="ts">
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";

	const questions = [
		{
			id: "item-1",
			title: "Apakah Arthaku benar-benar gratis?",
			content:
				"Ya, Arthaku menyediakan paket gratis yang sudah cukup untuk mencatat pemasukan dan pengeluaran harian. Anda bisa mulai tanpa biaya dan upgrade kapan saja sesuai kebutuhan.",
		},
		{
			id: "item-2",
			title: "Perlu install aplikasi tambahan?",
			content:
				"Tidak perlu. Arthaku terintegrasi langsung dengan aplikasi chat yang Anda gunakan sehari-hari, sehingga Anda bisa langsung mencatat tanpa install aplikasi baru.",
		},
		{
			id: "item-3",
			title: "Bagaimana cara mencatat keuangan di Arthaku?",
			content:
				"Cukup kirim pesan seperti biasa di chat, misalnya 'makan 20 ribu' atau 'gaji 3 juta'. Arthaku akan otomatis mencatat dan mengelompokkan transaksi Anda.",
		},
		{
			id: "item-4",
			title: "Apakah data keuangan saya aman?",
			content:
				"Keamanan data adalah prioritas utama kami. Semua data disimpan dengan sistem yang aman dan tidak dibagikan ke pihak ketiga tanpa izin Anda.",
		},
		{
			id: "item-5",
			title: "Apakah saya bisa melihat ringkasan keuangan?",
			content:
				"Tentu. Arthaku menyediakan ringkasan keuangan secara otomatis, sehingga Anda bisa memantau pemasukan, pengeluaran, dan saldo dengan mudah.",
		},
		{
			id: "item-6",
			title: "Bisa digunakan di aplikasi chat apa saja?",
			content:
				"Arthaku dirancang untuk terintegrasi dengan aplikasi chat populer. Dukungan platform akan terus dikembangkan agar Anda bisa menggunakannya dengan lebih fleksibel.",
		},
		{
			id: "item-7",
			title: "Kapan saya perlu upgrade ke paket berbayar?",
			content:
				"Upgrade diperlukan jika Anda membutuhkan fitur lanjutan seperti analisis lebih detail atau penggunaan yang lebih intens. Anda bisa upgrade kapan saja tanpa batasan.",
		},
	];
</script>

<section class="mx-auto w-full max-w-7xl py-8 md:py-12">
	<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
		<div class="p-6 md:p-8">
			<p class="text-primary text-4xl font-bold leading-tight">
				Punya pertanyaan? <span class="text-accent">Kami punya jawabannya</span>
			</p>
			<p class="text-muted-foreground mt-4 leading-tight">
				Temukan jawaban atas pertanyaan yang paling sering diajukan tentang Arthaku. Kalau masih bingung, tim kami siap bantu kapan saja.
			</p>

			<div class="mt-8 flex flex-wrap items-center gap-2">
				<a
					href="/"
					class="rounded-xs border-2 border-primary bg-primary px-3 py-2 font-semibold text-white shadow-sm transition-all duration-300 hover:border-primary-hover hover:bg-primary-hover"
				>
					Hubungi Kami
				</a>
			</div>
		</div>

		<div class="space-y-4">
			<Accordion class="rounded-xs border" type="single">
				{#each questions as item}
					<AccordionItem class="px-4" value={item.id}>
						<AccordionTrigger class="py-4 text-primary-dark hover:no-underline focus-visible:underline focus-visible:ring-0">
							{item.title}
						</AccordionTrigger>
						<AccordionContent class="pb-4! text-secondary-dark">
							{item.content}
						</AccordionContent>
					</AccordionItem>
				{/each}
			</Accordion>

			<p class="text-secondary-dark">
				Tidak menemukan jawaban yang Anda cari? Hubungi
				<button class="text-primary hover:underline">tim dukungan kami</button>
			</p>
		</div>
	</div>
</section>
