<script lang="ts">
  import { InputGroup, InputGroupAddon, InputGroupInput } from "$lib/components/ui/input-group/index.js";
  import { Kbd, KbdGroup } from "$lib/components/ui/kbd/index.js";
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";

  let groupRef = $state<HTMLDivElement | null>(null);
  const sidebar = useSidebar();

  function focusSearchAndOpen() {
    const input = groupRef?.querySelector<HTMLInputElement>("[data-slot=input-group-control]");

    input?.focus({ preventScroll: true });
    sidebar.setOpen(true);
  }

  function onKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      focusSearchAndOpen();
    }
  }
</script>

<svelte:window onkeydown={onKeydown} />

<InputGroup bind:ref={groupRef}>
  <InputGroupAddon align="inline-start" class="pl-1.75">
    <SearchIcon />
  </InputGroupAddon>

  <InputGroupInput aria-label="Search" name="q" placeholder="Search..." type="search" />

  <InputGroupAddon align="inline-end">
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  </InputGroupAddon>
</InputGroup>

<style>
  :global(input[type="search"]::-webkit-search-cancel-button),
  :global(input[type="search"]::-webkit-search-decoration),
  :global(input[type="search"]::-webkit-search-results-button),
  :global(input[type="search"]::-webkit-search-results-decoration) {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }

  :global(input[type="search"]::-ms-clear),
  :global(input[type="search"]::-ms-reveal) {
    display: none;
    width: 0;
    height: 0;
  }
</style>
