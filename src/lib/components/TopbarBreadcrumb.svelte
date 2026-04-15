<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import { Badge } from "./ui/badge";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index";

  const todayLabel = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
</script>

<Breadcrumb.Root class="flex gap-2 items-center">
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <!-- Badge Date -->
      <Badge variant="outline" class="rounded-full px-3 py-1 text-xs">
        {todayLabel}
      </Badge>
      <Breadcrumb.Separator>
        <SlashIcon />
      </Breadcrumb.Separator>
      <Breadcrumb.Link href="/dashboard" class="text-sm font-medium">Dashboard</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
