<script lang="ts">
	import TextReveal from "$lib/components/TextReveal.svelte";

	let aboutSectionRef = $state<HTMLElement | null>(null);

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
</script>

<section bind:this={aboutSectionRef} class="max-w-7xl w-full mx-auto relative py-8 md:py-12">
	<div class="flex flex-col justify-center">
		<div class=""></div>

		<div class="text-center max-w-4xl w-full mx-auto">
			<TextReveal class="text-primary" scrollTargetRef={aboutSectionRef} segments={aboutSegments} />
		</div>

		<div class=""></div>
	</div>
</section>
