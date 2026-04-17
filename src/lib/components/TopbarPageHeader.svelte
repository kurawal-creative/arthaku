<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import CloudDownload from "@lucide/svelte/icons/cloud-download";
  import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";
  import { Button } from "$lib/components/ui/button";
  import * as Popover from "$lib/components/ui/popover/index";
  import CalendarPicker from "$lib/components/ui/calendar/calendar.svelte";
  import TopbarBreadcrumb from "./TopbarBreadcrumb.svelte";
  import CustomTrigger from "./CustomTrigger.svelte";

  let {
    title,
    description,
    showDatePicker = false,
    showExportButton = false,
    exportLabel = "Export",
  } = $props<{
    title: string;
    description: string;
    showDatePicker?: boolean;
    showExportButton?: boolean;
    exportLabel?: string;
  }>();

  let open = $state(false);
  let selectedDate = $state<DateValue>(today(getLocalTimeZone()));

  const hasActions = $derived(showDatePicker || showExportButton);
  const dateRange = $derived.by(() => formatRange(selectedDate));

  function formatRange(endDate: DateValue) {
    const startDate = endDate.subtract({ days: 29 });

    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const start = formatter.format(startDate.toDate(getLocalTimeZone()));
    const end = formatter.format(endDate.toDate(getLocalTimeZone()));

    return `${start} - ${end}`;
  }

  function handleDateChange(nextValue: DateValue | undefined) {
    if (!nextValue) return;
    selectedDate = nextValue;
    open = false;
  }
</script>

<div class="space-y-6">
  {#if hasActions}
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center">
        <CustomTrigger place="navbar" />
        <TopbarBreadcrumb />
      </div>

      <div class="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
        {#if showDatePicker}
          <Popover.Root bind:open>
            <Popover.Trigger>
              {#snippet child({ props })}
                <Button {...props} variant="outline" class="h-9 justify-start gap-2 px-3 text-sm">
                  <CalendarIcon class="h-4 w-4 shrink-0" />
                  <span class="truncate">{dateRange}</span>
                  <ChevronDown class="h-4 w-4" />
                </Button>
              {/snippet}
            </Popover.Trigger>

            <Popover.Content class="mt-2 overflow-hidden rounded-xl border bg-background shadow-lg" align="end">
              <CalendarPicker type="single" bind:value={selectedDate} maxValue={today(getLocalTimeZone())} onValueChange={handleDateChange} />
            </Popover.Content>
          </Popover.Root>
        {/if}

        {#if showExportButton}
          <Button class="h-9 gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90 hover:shadow-md">
            <CloudDownload class="h-4 w-4" />
            {exportLabel}
          </Button>
        {/if}
      </div>
    </div>
  {:else}
    <div class="flex flex-row">
      <TopbarBreadcrumb />
    </div>
  {/if}

  <div class="space-y-1">
    <h1 class="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{title}</h1>

    <p class="max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
  </div>
</div>
