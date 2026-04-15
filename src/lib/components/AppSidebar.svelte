<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail, SidebarTrigger } from "$lib/components/ui/sidebar/index.js";
  import { cn } from "$lib/utils.js";
  import { navGroups } from "$lib/components/AppShared.svelte";
  import SearchDashboard from "$lib/components/SearchDashboard.svelte";
  import ModeToggle from "$lib/components/ModeToggle.svelte";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<Sidebar class={cn("*:data-[slot=sidebar-inner]:bg-background", "transition-[left,right,top,width] group-data-[collapsible=offcanvas]:top-[calc(var(--app-header-height)*0.5)]")} collapsible="offcanvas" variant="sidebar">
  <SidebarHeader class="h-(--app-header-height,3rem) flex-row items-center justify-between">
    <Button href="#link" variant="ghost" class="gap-2 px-2">
      <span class="font-medium">Arthaku</span>
    </Button>
    <SidebarTrigger />
  </SidebarHeader>

  <SidebarContent>
    {#each navGroups as group (group.label)}
      <SidebarGroup>
        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
        <SidebarMenu>
          {#each group.items as item (item.title)}
            <SidebarMenuItem>
              <SidebarMenuButton isActive={item.isActive} tooltipContent={item.title}>
                {#snippet child({ props })}
                  <a href={item.path} {...props}>
                    {#if item.icon}
                      {@const Icon = item.icon}
                      <Icon />
                    {/if}
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </SidebarMenuButton>
            </SidebarMenuItem>
          {/each}
        </SidebarMenu>
      </SidebarGroup>
    {/each}
  </SidebarContent>

  <SidebarFooter class="px-4">
    <div class="flex items-center pt-4 pb-2">
      <ThemeSwitcher />
      <Button href="#" aria-label="Settings" class="text-muted-foreground" size="icon-sm" variant="ghost">
        <SettingsIcon />
      </Button>
    </div>
  </SidebarFooter>

  <SidebarRail />
</Sidebar>
