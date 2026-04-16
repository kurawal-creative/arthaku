<script lang="ts">
 import { SvelteKitTopLoader } from 'sveltekit-top-loader';
 import * as Sidebar from "$lib/components/ui/sidebar/index.js";
 import AppSidebar from "$lib/components/AppSidebar.svelte";
 
 let { children } = $props();
</script>
 
<Sidebar.Provider>
 <AppSidebar />
 <main class="w-full">
  <!-- <Sidebar.Trigger /> -->
  {@render children?.()}
</main>
<SvelteKitTopLoader color="#408a71" showSpinner={false} />
</Sidebar.Provider>