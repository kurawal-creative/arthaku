<script lang="ts">
  import { Motion, useTransform } from "svelte-motion";

  let {
    progress = 0,
    range,
    wordsLen = 0,
    children,
  } = $props<{
    progress?: any;
    range: [number, number];
    wordsLen?: number;
    children?: () => unknown;
  }>();

  const opacity = $derived.by(() => {
    const rangeValue1 = wordsLen ? range[0] / wordsLen : 0;
    const rangeValue2 = wordsLen ? range[1] / wordsLen : 0;
    return useTransform(progress, [rangeValue1, rangeValue2], [0.2, 1]);
  });
</script>

<span class="xl:lg-3 relative mx-1 lg:mx-2.5">
  <span class="absolute opacity-30">
    {@render children?.()}
  </span>
  <Motion style={{ opacity: opacity }} let:motion>
    <span class="text-black dark:text-white" use:motion>
      {@render children?.()}
    </span>
  </Motion>
</span>
