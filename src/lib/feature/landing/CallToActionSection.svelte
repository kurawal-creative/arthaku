<script lang="ts">
	import { onMount } from "svelte";
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

	let sectionRef = $state<HTMLElement | null>(null);
	let contentVisible = $state(false);
	let contentProgress = $state(0);
	let cardProgress = $state(0);

	function clamp(value: number, min: number, max: number): number {
		return Math.min(Math.max(value, min), max);
	}

	function updateProgress() {
		if (typeof window === "undefined" || !sectionRef) return;

		const rect = sectionRef.getBoundingClientRect();
		const viewportHeight = window.innerHeight;
		const sectionTop = window.scrollY + rect.top;
		const sectionHeight = rect.height;
		const maxScroll = Math.max(sectionHeight - viewportHeight, 1);
		const progress = clamp((window.scrollY - sectionTop) / maxScroll, 0, 1);

		contentProgress = progress;
		cardProgress = progress;
		contentVisible = rect.top < viewportHeight * 0.8 && rect.bottom > viewportHeight * 0.2;
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

<section bind:this={sectionRef} class="relative w-full pt-12 md:pt-24">
	<div
		class="relative w-full overflow-hidden py-8 md:py-12 transition-all duration-700 ease-out"
		style={`opacity: ${contentVisible ? 1 : 0}; transform: translateY(${contentVisible ? 0 : 20}px) translateY(${(1 - contentProgress) * -12}px);`}
	>
		<div aria-hidden="true" class="pointer-events-none absolute left-40 top-1/4 h-12 w-12 rounded-xs border-2 border-primary/70 bg-primary/15 cta-float-1"></div>
		<div aria-hidden="true" class="pointer-events-none absolute left-80 top-3/4 h-8 w-8 rounded-xs border-2 border-accent/70 bg-accent/15 cta-float-2"></div>
		<div aria-hidden="true" class="pointer-events-none absolute left-24 top-1/2 h-7 w-7 rounded-xs border-2 border-primary/65 bg-primary/12 cta-float-3"></div>
		<div aria-hidden="true" class="pointer-events-none absolute left-72 top-16 h-5 w-5 rounded-xs border-2 border-accent/80 bg-accent/20 cta-float-4"></div>

		<div aria-hidden="true" class="pointer-events-none absolute right-60 top-1/3 h-10 w-10 rounded-xs border-2 border-primary/65 bg-primary/12 cta-float-5"></div>
		<div aria-hidden="true" class="pointer-events-none absolute right-80 bottom-1/4 h-6 w-6 rounded-xs border-2 border-accent/70 bg-accent/15 cta-float-6"></div>
		<div aria-hidden="true" class="pointer-events-none absolute right-32 top-20 h-7 w-7 rounded-xs border-2 border-primary/75 bg-primary/18 cta-float-7"></div>
		<div aria-hidden="true" class="pointer-events-none absolute right-44 bottom-16 h-5 w-5 rounded-xs border-2 border-accent/80 bg-accent/20 cta-float-8"></div>

		<div class="mx-auto max-w-7xl px-6 md:px-10">
			<div class="flex flex-col items-center justify-center space-y-4 text-center">
				<div
					class="relative max-w-2xl rounded-xs border-2 border-dashed border-primary bg-background/80 p-6 backdrop-blur transition-transform duration-300 ease-out"
					style={`transform: translateY(${26 - cardProgress * 46}px) rotate(${(-0.5 + cardProgress) }deg);`}
				>
					<span aria-hidden="true" class="absolute -left-2 -top-2 h-3.5 w-3.5 border-2 border-primary bg-background"></span>
					<span aria-hidden="true" class="absolute -right-2 -top-2 h-3.5 w-3.5 border-2 border-primary bg-background"></span>
					<span aria-hidden="true" class="absolute -bottom-2 -left-2 h-3.5 w-3.5 border-2 border-primary bg-background"></span>
					<span aria-hidden="true" class="absolute -bottom-2 -right-2 h-3.5 w-3.5 border-2 border-primary bg-background"></span>

					<p class="text-4xl font-bold leading-tight text-primary">
						Mulai kelola <span class="italic text-accent">keuangan Anda</span> dengan lebih cerdas
					</p>
				</div>

				<p
					class="text-muted-foreground max-w-xl transition-all duration-500 ease-out"
					style={`opacity: ${contentVisible ? 1 : 0}; transform: translateY(${18 - contentProgress * 30}px);`}
				>
					Catat, pantau, dan pahami keuangan Anda dengan cara yang lebih sederhana. Tanpa ribet, langsung dari chat.
				</p>

				<div
					class="mt-4 flex items-center gap-2 transition-all duration-500 ease-out"
					style={`opacity: ${contentVisible ? 1 : 0}; transform: translateY(${14 - contentProgress * 24}px);`}
				>
					<a
						href="/"
						class="rounded-xs border-2 border-primary px-3 py-2 font-semibold text-primary shadow-sm transition-colors duration-200 hover:border-primary-hover hover:bg-primary/5"
					>
						Dokumentasi
					</a>

					<a
						href="/"
						class="group flex items-center gap-1 rounded-xs border-2 border-primary bg-primary px-3 py-2 font-semibold text-white shadow-sm shadow-primary/20 transition-[background-color,border-color,box-shadow] duration-200 hover:border-primary-hover hover:bg-primary-hover hover:shadow-md hover:shadow-primary/25"
					>
						Mulai Gratis
						<ArrowUpRightIcon class="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	@keyframes ctaFloat1 {
		0%,
		100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-20px) rotate(5deg); }
	}

	@keyframes ctaFloat2 {
		0%,
		100% { transform: translateY(0); opacity: 0.5; }
		50% { transform: translateY(15px); opacity: 0.95; }
	}

	@keyframes ctaFloat3 {
		0%,
		100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(10px) rotate(-6deg); }
	}

	@keyframes ctaFloat4 {
		0%,
		100% { transform: translateY(0); opacity: 0.55; }
		50% { transform: translateY(-12px); opacity: 1; }
	}

	@keyframes ctaFloat5 {
		0%,
		100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(12px) rotate(-4deg); }
	}

	@keyframes ctaFloat6 {
		0%,
		100% { transform: translateY(0); opacity: 0.55; }
		50% { transform: translateY(-18px); opacity: 1; }
	}

	@keyframes ctaFloat7 {
		0%,
		100% { transform: translateY(0) rotate(0deg); }
		50% { transform: translateY(-10px) rotate(5deg); }
	}

	@keyframes ctaFloat8 {
		0%,
		100% { transform: translateY(0); opacity: 0.5; }
		50% { transform: translateY(9px); opacity: 0.95; }
	}

	.cta-float-1 { animation: ctaFloat1 8s ease-in-out infinite; }
	.cta-float-2 { animation: ctaFloat2 6s ease-in-out infinite; }
	.cta-float-3 { animation: ctaFloat3 7.5s ease-in-out infinite 0.6s; }
	.cta-float-4 { animation: ctaFloat4 6.8s ease-in-out infinite 0.3s; }
	.cta-float-5 { animation: ctaFloat5 7s ease-in-out infinite 1s; }
	.cta-float-6 { animation: ctaFloat6 9s ease-in-out infinite 0.5s; }
	.cta-float-7 { animation: ctaFloat7 8.2s ease-in-out infinite 0.4s; }
	.cta-float-8 { animation: ctaFloat8 7.2s ease-in-out infinite 0.8s; }
</style>
