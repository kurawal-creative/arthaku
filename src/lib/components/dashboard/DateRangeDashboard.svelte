<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index";
  import { Button } from "../ui/button";
  import Calendar from "@lucide/svelte/icons/calendar";
  import RangeCalendar from "$lib/components/ui/range-calendar/range-calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";

  import { getLocalTimeZone, today, type DateValue } from "@internationalized/date";
  import type { DateRange } from "bits-ui";

  type Preset = {
    label: string;
    days: number;
  };

  const presets: Preset[] = [
    { label: "7 hari lalu", days: 7 },
    { label: "30 hari lalu", days: 30 },
  ];

  function createDateRange(start: DateValue, end: DateValue): DateRange {
    return { start, end };
  }

  function createDefaultRange() {
    const end = today(getLocalTimeZone());
    return createDateRange(end.subtract({ days: 29 }), end);
  }

  let open = $state(false);
  let value = $state<DateRange | undefined>(createDefaultRange());

  const dateRange = $derived.by(() => formatRange(value));
  const selectedPreset = $derived.by(() => formatSelectedPreset(value));

  function formatRange(range: DateRange | undefined) {
    if (!range?.start || !range?.end) return "Select date";

    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const start = formatter.format(range.start.toDate(getLocalTimeZone()));
    const end = formatter.format(range.end.toDate(getLocalTimeZone()));

    return `${start} - ${end}`;
  }

  function getDayCount(range: DateRange | undefined) {
    if (!range?.start || !range?.end) return 0;

    const start = range.start.toDate(getLocalTimeZone());
    const end = range.end.toDate(getLocalTimeZone());
    const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
    const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

    return Math.max(1, Math.round((endUtc - startUtc) / 86_400_000) + 1);
  }

  function formatSelectedPreset(range: DateRange | undefined) {
    const dayCount = getDayCount(range);

    if (!dayCount) return "Pilih range tanggal";

    return `${dayCount} hari terakhir`;
  }

  function setRange(start: DateValue, end: DateValue) {
    value = createDateRange(start, end);
    open = false;
  }

  function setPresetRange(preset: Preset) {
    const end = today(getLocalTimeZone());
    setRange(end.subtract({ days: preset.days - 1 }), end);
  }
</script>

<div class="flex items-center">
  <ButtonGroup.Root class="items-stretch">
    <Button variant="outline" class="h-9 justify-start gap-2 px-3 py-0 text-sm">
      <Calendar class="h-4 w-4 shrink-0" />
      <span class="truncate">{dateRange}</span>
    </Button>

    <Popover.Root bind:open>
      <Popover.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="h-9 border-l-0 gap-2 px-3 py-0 text-sm" aria-label={`Pilih range tanggal, preset aktif ${selectedPreset}`}>
            <span class="truncate">{selectedPreset}</span>
            <ChevronDown class="h-4 w-4" />
          </Button>
        {/snippet}
      </Popover.Trigger>

      <Popover.Content class="overflow-hidden mt-2" align="center">
        <div class="p-0">
          <RangeCalendar
            bind:value
            maxValue={today(getLocalTimeZone())}
            onValueChange={(nextValue) => {
              if (nextValue?.start && nextValue?.end) open = false;
            }}
          />
        </div>

        <div class="border-t border-border pt-3 -mt-2">
          <div class="grid grid-cols-2 justify-center gap-2">
            {#each presets as preset (preset.label)}
              <Button variant="outline" class="justify-start" onclick={() => setPresetRange(preset)}>
                {preset.label}
              </Button>
            {/each}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  </ButtonGroup.Root>
</div>
