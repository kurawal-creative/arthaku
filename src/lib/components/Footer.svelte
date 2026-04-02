<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils";

	type FooterLink = {
		title: string;
		href: string;
		icon?: import("svelte").Snippet;
	};

	type FooterSection = {
		label: string;
		links: FooterLink[];
	};

	const footerLinks: FooterSection[] = [
		{
			label: "Product",
			links: [
				{ title: "Features", href: "#" },
				{ title: "Pricing", href: "#" },
				{ title: "Testimonials", href: "#" },
				{ title: "Integration", href: "#" },
			],
		},
		{
			label: "Company",
			links: [
				{ title: "FAQs", href: "#" },
				{ title: "About Us", href: "#" },
				{ title: "Privacy Policy", href: "#" },
				{ title: "T&S", href: "#" },
			],
		},
		{
			label: "Resources",
			links: [
				{ title: "Blog", href: "#" },
				{ title: "Changelog", href: "#" },
				{ title: "Brand", href: "#" },
				{ title: "Help", href: "#" },
			],
		},
		{
			label: "Social Links",
			links: [
				{ title: "Facebook", href: "#" },
				{ title: "Instagram", href: "#" },
				{ title: "Youtube", href: "#" },
				{ title: "LinkedIn", href: "#" },
			],
		},
	];

	let shouldReduceMotion = $state(false);
	let footerRef = $state<HTMLElement | null>(null);
	let footerVisible = $state(false);
	let introVisible = $state(false);
	let columnsVisible = $state(false);
	let currentYear = new Date().getFullYear();

	const columnVisibleMap = $state<boolean[]>(footerLinks.map(() => false));

	function observeInView(
		node: HTMLElement,
		options: { delay?: number; onEnter: () => void; threshold?: number; rootMargin?: string } = {
			onEnter: () => undefined,
		}
	) {
		let timeout: ReturnType<typeof setTimeout> | undefined;

		if (shouldReduceMotion) {
			options.onEnter();
			return {
				destroy() {
					if (timeout) clearTimeout(timeout);
				},
			};
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;

				timeout = setTimeout(() => {
					options.onEnter();
				}, options.delay ?? 0);

				observer.disconnect();
			},
			{
				threshold: options.threshold ?? 0.35,
				rootMargin: options.rootMargin ?? "0px 0px -10% 0px",
			}
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
				if (timeout) clearTimeout(timeout);
			},
		};
	}

	onMount(() => {
		shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		footerVisible = true;

		const footerObserver = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;

				introVisible = true;
				columnsVisible = true;
				footerObserver.disconnect();
			},
			{
				threshold: 0.15,
			}
		);

		if (footerRef) {
			footerObserver.observe(footerRef);
		}

		if (shouldReduceMotion) {
			introVisible = true;
			columnsVisible = true;
			columnVisibleMap.fill(true);
			footerObserver.disconnect();
		}

		return () => {
			footerObserver.disconnect();
		};
	});
</script>

<footer
	bind:this={footerRef}
	class={cn(
		"relative mx-auto flex w-full max-w-7xl flex-col items-center justify-center rounded-t-4xl border-t px-6 md:rounded-t-6xl md:px-8 lg:mt-20",
		"dark:bg-[radial-gradient(35%_128px_at_50%_0%,--theme(--color-foreground/.1),transparent)]"
	)}
>
	<div class="absolute left-1/2 right-1/2 top-0 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/20 blur"></div>

	<div class="grid w-full gap-8 py-6 md:py-8 lg:grid-cols-3 lg:gap-8">
		<div
			use:observeInView={{
				delay: 0,
				onEnter: () => {
					introVisible = true;
				},
			}}
				class={cn(
					"space-y-4 transition-all duration-800 ease-out",
					introVisible ? "translate-y-0 opacity-100 blur-0" : "-translate-y-2 opacity-0 blur-xs"
				)}
		>
			<p class="mt-8 text-sm text-muted-foreground md:mt-0">Beautify your app with Arthaku.</p>
		</div>

		<div class="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:col-span-2 lg:mt-0">
			{#each footerLinks as section, index}
				<div
					use:observeInView={{
						delay: 100 + index * 100,
						onEnter: () => {
							columnVisibleMap[index] = true;
						},
					}}
					class={cn(
						"mb-10 transition-all duration-800 ease-out md:mb-0",
						columnVisibleMap[index] ? "translate-y-0 opacity-100 blur-0" : "-translate-y-2 opacity-0 blur-xs"
					)}
				>
					<h3 class="text-xs">{section.label}</h3>
					<ul class="mt-4 space-y-2 text-sm text-muted-foreground">
						{#each section.links as link}
							<li>
								<a class="inline-flex items-center duration-250 hover:text-foreground [&_svg]:me-1 [&_svg]:size-4" href={link.href}>
									{#if link.icon}
										{@render link.icon()}
									{/if}
									{link.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<div class="h-px w-full bg-linear-to-r via-border"></div>

	<div class="flex w-full items-center justify-center py-4">
		<p class="text-sm text-muted-foreground">&copy; {currentYear} Arthaku, All rights reserved</p>
	</div>
</footer>
