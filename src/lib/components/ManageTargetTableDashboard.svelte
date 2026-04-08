<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import * as Popover from "$lib/components/ui/popover/index";
  import * as Table from "$lib/components/ui/table/index";
  import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";
  import Badge from "./ui/badge/badge.svelte";

  // Data Mock untuk Target
  const targets = [
    {
      id: "TGT001",
      name: "Beli Laptop Baru",
      targetAmount: 15000000,
      currentAmount: 7500000,
      status: "Berjalan",
    },
    {
      id: "TGT002",
      name: "Liburan ke Bali",
      targetAmount: 5000000,
      currentAmount: 5000000,
      status: "Tercapai",
    },
    {
      id: "TGT003",
      name: "Dana Darurat",
      targetAmount: 20000000,
      currentAmount: 2000000,
      status: "Berjalan",
    },
    {
      id: "TGT004",
      name: "Tabungan Nikah",
      targetAmount: 50000000,
      currentAmount: 45000000,
      status: "Hampir Tercapai",
    },
  ];

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  const statusClassMap: Record<string, string> = {
    Tercapai: "bg-[#dcfce7] text-[#16a34a]",
    Berjalan: "bg-[#d1fae5] text-[#059669]",
    "Hampir Tercapai": "bg-[#ecfccb] text-[#84cc16]",
    Gagal: "bg-[#dcfce7] text-[#22c55e]",
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };
</script>

<div class="rounded-2xl shadow-sm overflow-hidden h-92">
  <Card.Root class="h-full flex flex-col">
    <Card.Header class="flex gap-4 flex-row items-center justify-between">
      <div>
        <Card.Title>Target Keuangan</Card.Title>
        <Card.Description>Pantau kemajuan tabungan dan target Anda</Card.Description>
      </div>

      <Popover.Root>
        <Popover.Trigger>
          {#snippet child({ props })}
            <button {...props} type="button" class="rounded-full p-2 hover:bg-muted transition-colors" aria-label="Menu target">
              <EllipsisVertical class="w-4 h-4" />
            </button>
          {/snippet}
        </Popover.Trigger>

        <Popover.Content align="end" class="w-44 p-2">
          <div class="grid gap-1">
            <button type="button" class="rounded-md px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"> Tambah Target </button>
            <button type="button" class="rounded-md px-2.5 py-2 text-left text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"> Lihat Semua </button>
          </div>
        </Popover.Content>
      </Popover.Root>
    </Card.Header>

    <Card.Content class="pt-0 flex-1 min-h-0">
      <div class="rounded-xl overflow-hidden bg-background h-full overflow-y-auto overflow-x-auto">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[25%]">Target</Table.Head>
              <Table.Head>Nominal</Table.Head>
              <Table.Head class="min-w-32.5">Progress</Table.Head>
              <Table.Head class="text-right">Status</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#if targets.length === 0}
              <Table.Row>
                <Table.Cell colspan={4} class="text-center text-muted-foreground">Belum ada target yang dibuat</Table.Cell>
              </Table.Row>
            {:else}
              {#each targets as target (target.id)}
                {@const progress = calculateProgress(target.currentAmount, target.targetAmount)}
                <Table.Row class="hover:bg-muted/40 transition-colors">
                  <Table.Cell class="font-medium">
                    {target.name}
                  </Table.Cell>
                  <Table.Cell>
                    <div class="flex flex-col">
                      <span class="text-sm font-medium">{formatRupiah(target.targetAmount)}</span>
                      <span class="text-xs text-muted-foreground">Terkumpul: {formatRupiah(target.currentAmount)}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <div class="flex flex-col gap-1.5">
                      <div class="md:hidden flex items-center justify-between text-xs font-medium">
                        <span>{progress}%</span>
                      </div>
                      <div class="md:flex md:items-center md:gap-2">
                        <div class="h-2 w-full rounded-full bg-muted">
                          <div class="h-full rounded-full bg-primary transition-all duration-500" style="width: {progress}%"></div>
                        </div>
                        <span>{progress}%</span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell class="text-right">
                    <Badge class={`${statusClassMap[target.status] ?? "bg-muted text-muted-foreground"}`}>
                      {target.status}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              {/each}
            {/if}
          </Table.Body>
        </Table.Root>
      </div>
    </Card.Content>
  </Card.Root>
</div>
