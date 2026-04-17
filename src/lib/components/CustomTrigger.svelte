<script lang="ts">
  import { SidebarTrigger, useSidebar } from "$lib/components/ui/sidebar/index.js";
  import { cn } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";

  type Place = "sidebar" | "navbar";

  let {
    place,
    class: className,
    ...restProps
  }: {
    place: Place;
    class?: string;
  } & Omit<ComponentProps<typeof SidebarTrigger>, "class"> = $props();

  const sidebar = useSidebar();

  const sidebarOpen = $derived.by(() => (sidebar.isMobile ? sidebar.openMobile : sidebar.open));
  const hideOnNavbar = $derived.by(() => place === "navbar" && sidebarOpen);
  const hideOnSidebar = $derived.by(() => place === "sidebar" && !sidebarOpen);
</script>

<SidebarTrigger class={cn("transition-all duration-300 ease-out motion-reduce:transition-none", !sidebarOpen && place === "navbar" && "fill-mode-forwards delay-100", !hideOnNavbar && place === "navbar" && "me-2 shrink-0 opacity-100", hideOnNavbar && "pointer-events-none absolute opacity-0", hideOnSidebar && "pointer-events-none absolute opacity-0", className)} {...restProps} />
