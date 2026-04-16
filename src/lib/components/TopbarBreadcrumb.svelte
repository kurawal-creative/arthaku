<script lang="ts">
  import SlashIcon from '@lucide/svelte/icons/slash'
  import { Badge } from './ui/badge'
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index'
  import { page } from '$app/state'
  import { navLinks } from '$lib/components/AppShared.svelte'

  const todayLabel = new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())

  function buildBreadcrumbs(pathname: string) {
    const segments = pathname.split('/').filter(Boolean)
    const crumbs: { label: string; href: string; isCurrent: boolean }[] = []

    let cumulativePath = ''
    for (let i = 0; i < segments.length; i++) {
      cumulativePath += '/' + segments[i]
      const match = navLinks.find((item) => item.path === cumulativePath)
      const label = match?.title ?? segments[i].charAt(0).toUpperCase() + segments[i].slice(1)
      crumbs.push({
        label,
        href: cumulativePath,
        isCurrent: i === segments.length - 1,
      })
    }

    return crumbs
  }

  const breadcrumbs = $derived(buildBreadcrumbs(page.url.pathname))
</script>

<Breadcrumb.Root class="flex gap-2 items-center">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Badge variant="outline" class="rounded-full px-3 py-1 text-xs">
        {todayLabel}
      </Badge>
    </Breadcrumb.Item>

    {#each breadcrumbs as crumb (crumb.href)}
      <Breadcrumb.Separator>
        <SlashIcon />
      </Breadcrumb.Separator>
      <Breadcrumb.Item>
        {#if crumb.isCurrent}
          <Breadcrumb.Page class="text-sm font-medium">{crumb.label}</Breadcrumb.Page>
        {:else}
          <Breadcrumb.Link href={crumb.href} class="text-sm font-medium">{crumb.label}</Breadcrumb.Link>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
