<script lang="ts">
  import { onMount } from "svelte";
  import { cn } from "$lib/utils";

  let {
    class: className = "",
    text = "Hello Everyone Svelte is Fun",
    scrollTargetRef = null,
    segments = null,
    children,
  } = $props<{
    class?: string;
    text?: string;
    scrollTargetRef?: HTMLElement | null;
    segments?: Array<{ text: string; accent?: boolean }> | null;
    children?: () => unknown;
  }>();

  const words = $derived(text.split(" "));
  const revealSegments = $derived(segments ?? words.map((word: string) => ({ text: word })));
  let progress = $state(0);

  function wordProgress(index: number): number {
    const stagger = revealSegments.length > 1 ? 0.8 / (revealSegments.length - 1) : 0;
    const start = index * stagger;
    const local = stagger ? (progress - start) / 0.2 : progress;
    return clamp(local, 0, 1);
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  function updateProgress() {
    if (typeof window === "undefined") return;

    const target = scrollTargetRef;
    if (!target) return;

    const rect = target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionTop = window.scrollY + rect.top;
    const sectionHeight = rect.height;
    const maxScroll = Math.max(sectionHeight - viewportHeight, 1);

    progress = clamp((window.scrollY - sectionTop) / maxScroll, 0, 1);
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

<div class={cn("relative z-10 w-full", className)}>
  <div class="reveal-spacer">
    <div class="sticky top-0 mx-auto flex min-h-screen max-w-4xl items-center bg-transparent px-4 py-20">
      <div class="reveal-shell mx-auto w-full max-w-full">
        <p
          class={segments || children
            ? "mx-auto flex max-w-full flex-wrap justify-center p-5 text-2xl font-bold text-primary md:p-8 md:text-3xl lg:p-10 lg:text-4xl"
            : "mx-auto flex max-w-full flex-wrap justify-center p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl"}
        >
          {#if segments}
            {#each segments as segment, i}
              {@const localProgress = wordProgress(i)}
              <span
                class={segment.accent ? "mx-1 inline-block text-accent" : "mx-1 inline-block text-primary"}
                style={`opacity: ${0.2 + localProgress * 0.8};`}
              >
                {segment.text}
              </span>
            {/each}
          {:else if children}
            {@render children()}
          {:else}
            {#each words as item, i}
              {@const localProgress = wordProgress(i)}
              <span
                class="mx-1 inline-block"
                style={`opacity: ${0.2 + localProgress * 0.8};`}
              >
                {item}
              </span>
            {/each}
          {/if}
        </p>
      </div>
    </div>
  </div>
</div>

<style>
  .reveal-spacer {
    width: 100%;
    min-height: 200vh;
  }

  .reveal-shell {
    overflow: hidden;
  }
</style>
