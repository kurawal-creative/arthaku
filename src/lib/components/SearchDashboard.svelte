<script>
  import * as Kbd from "$lib/components/ui/kbd/index";
  import Search from "@lucide/svelte/icons/search";
</script>

<div
  class="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2 py-0"
>
  <Search class="w-4 h-4 text-gray-500 shrink-0" />

  <input
    type="text"
    placeholder="Search"
    class="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400 min-w-0"
  />
  
  <Kbd.Root
    class="flex items-center text-xs text-gray-400 px-2 py-0.5 bg-gray-50 shrink-0"
  >
    Ctrl + K
  </Kbd.Root>
</div>
