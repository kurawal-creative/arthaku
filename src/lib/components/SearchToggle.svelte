<script lang="ts">
  import Button from "./ui/button/button.svelte";
  import Search from "@lucide/svelte/icons/search";
  import Input from "./ui/input/input.svelte";

  let isOpen = $state(false);
  let inputRef = $state<HTMLInputElement | null>(null);
  let containerRef = $state<HTMLDivElement | null>(null);
  let inputValue = $state("");

  function handleOpen() {
    isOpen = true;
    setTimeout(() => inputRef?.focus(), 0);
  }

  function handleClose() {
    isOpen = false;
    inputValue = "";
  }

  $effect(() => {
    if (!isOpen) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef && !containerRef.contains(event.target as Node)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
</script>

<div bind:this={containerRef}>
  {#if !isOpen}
    <Button
      variant="outline"
      size="icon"
      class="rounded-xs"
      onclick={handleOpen}
    >
      <Search class="h-[1.2rem] w-[1.2rem]" />
    </Button>
  {:else}
    <Input
      bind:ref={inputRef}
      bind:value={inputValue}
      type="text"
      placeholder="Search..."
      class="px-3 py-1.5 border border-input rounded-xs text-sm focus:outline-none focus:ring focus:ring-ring h-8 w-48 animate-in fade-in duration-200"
    />
  {/if}
</div>
