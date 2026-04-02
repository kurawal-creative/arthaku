<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import ModeToggle from "./ModeToggle.svelte";
	import SearchToggle from "./SearchToggle.svelte";
</script>

<nav class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
	<div class="max-w-7xl mx-auto w-full px-4">
		<div class="grid h-16 grid-cols-3 items-center">
			<div class="flex items-center">
				<span class="text-xl font-bold text-primary">Arthaku</span>
			</div>

			<div class="flex justify-center gap-4">
				<a href="#features" class="text-sm font-medium text-primary-dark transition-colors duration-300 hover:text-primary">
					Features
				</a>
				<a href="#pricing" class="text-sm font-medium text-primary-dark transition-colors duration-300 hover:text-primary">
					Pricing
				</a>
				<a href="#contact" class="text-sm font-medium text-primary-dark transition-colors duration-300 hover:text-primary">
					Contact
				</a>
			</div>

			<div class="flex items-center justify-end gap-2">
				<SearchToggle />

				<div class="h-6 w-px bg-border/80"></div>

				<ModeToggle />

				<div class="h-6 w-px bg-border/80"></div>

				<a href="/login" class="group flex items-center gap-0.5">
					<div class="rounded-l-xs bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-primary-hover">
						Login Sekarang
					</div>

					<div class="rounded-r-xs bg-primary p-2.5 text-white transition-colors duration-300 group-hover:bg-primary-hover">
						<ArrowRight size={12} />
					</div>
				</a>
			</div>
		</div>
	</div>
</nav>
