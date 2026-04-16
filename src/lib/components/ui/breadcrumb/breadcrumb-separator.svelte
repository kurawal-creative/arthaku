<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

  let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<HTMLAttributes<HTMLSpanElement>> = $props();
</script>

<span bind:this={ref} data-slot="breadcrumb-separator" role="presentation" aria-hidden="true" class={cn("inline-flex items-center [&>svg]:size-3.5", className)} {...restProps}>
  {#if children}
    {@render children?.()}
  {:else}
    <ChevronRightIcon />
  {/if}
</span>
