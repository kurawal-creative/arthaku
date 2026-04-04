<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import LogOut from "@lucide/svelte/icons/log-out";
  import { authClient } from "$lib/auth-client";
  import { signOut } from "$lib/sign-out";
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import SearchToggle from "$lib/components/SearchToggle.svelte";

  const session = authClient.useSession();
  const isLoggedIn = $derived(Boolean($session.data?.user));

  let isLoggingOut = $state(false);

  async function handleLogout() {
    if (isLoggingOut) return;

    isLoggingOut = true;
    const result = await signOut();
    isLoggingOut = false;

    if (!result.ok) return;

    window.location.href = "/";
  }

  const Navbar = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "Contact", href: "#contact" },
  ];
</script>

<nav class="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
  <div class="max-w-7xl mx-auto w-full px-4">
    <div class="grid h-16 grid-cols-3 items-center">
      <div class="flex items-center">
        <span class="text-xl font-bold text-primary">Arthaku</span>
      </div>

      <div class="flex justify-center gap-4">
        {#each Navbar as item}
          <a href={item.href} class="text-sm font-medium text-primary-dark transition-colors duration-300 hover:text-primary">
            {item.name}
          </a>
        {/each}
      </div>

      <div class="flex items-center justify-end gap-2">
        <SearchToggle />

        <div class="h-6 w-px bg-border/80"></div>

        <ModeToggle />

        <div class="h-6 w-px bg-border/80"></div>
        {#if isLoggedIn}
          <button type="button" onclick={handleLogout} disabled={isLoggingOut} class="group flex items-center gap-1 rounded-xs bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70">
            <LogOut size={12} />
            {isLoggingOut ? "Keluar..." : "Logout"}
          </button>
        {:else}
          <a href="/login" class="group flex items-center gap-0.5">
            <div class="rounded-l-xs bg-primary px-3 py-1.5 text-sm font-medium text-white transition-colors duration-300 group-hover:bg-primary-hover">Login Sekarang</div>

            <div class="rounded-r-xs bg-primary p-2.5 text-white transition-colors duration-300 group-hover:bg-primary-hover">
              <ArrowRight size={12} />
            </div>
          </a>
        {/if}
      </div>
    </div>
  </div>
</nav>
