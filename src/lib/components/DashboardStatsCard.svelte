<script lang="ts">
  import Target from "@lucide/svelte/icons/target";
  import Wallet from "@lucide/svelte/icons/wallet";
  import TrendingUp from "@lucide/svelte/icons/trending-up";
  import TrendingDown from "@lucide/svelte/icons/trending-down";
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right";
  import ArrowDownRight from "@lucide/svelte/icons/arrow-down-right";

  const formatRupiah = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Dummy data (bisa dari API nanti)
  const stats = [
    {
      title: "Target Tabungan",
      value: 15000000,
      change: 59,
      up: true,
      note: "tercapai - teruskan semangat!",
      icon: Target,
      highlight: true,
    },
    {
      title: "Total Tabungan",
      value: 8903440,
      prev: 7992110,
      change: 5,
      up: true,
      icon: Wallet,
    },
    {
      title: "Pengeluaran",
      value: 3250000,
      prev: 3540000,
      change: 5,
      up: false,
      icon: Wallet,
    },
    {
      title: "Pemasukan",
      value: 5000000,
      prev: 4800000,
      change: 4,
      up: true,
      icon: Wallet,
    },
  ];
</script>

<div class="grid grid-cols-2 gap-4">
  {#each stats as stat}
    <div class={`rounded-2xl px-4 py-6 shadow-sm overflow-hidden ${stat.highlight ? "bg-primary text-white" : "bg-white text-primary-dark"}`}>
      <!-- Header -->
      <div class="flex justify-between items-start">
        <p class={`text-sm font-medium ${stat.highlight ? "opacity-90" : "text-gray-500"}`}>
          {stat.title}
        </p>

        <stat.icon class={`w-5 h-5 ${stat.highlight ? "opacity-80" : "text-gray-400"}`} />
      </div>

      <!-- Value -->
      <div class="mt-4">
        <h1 class="text-2xl md:text-3xl font-bold tracking-tight">
          {formatRupiah(stat.value)}
        </h1>
      </div>

      <!-- Footer -->
      <div class="mt-3 flex items-center gap-2 text-xs">
        {#if stat.up}
          <span class={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.highlight ? "bg-white/20" : "bg-green-100 text-green-600"}`}>
            <TrendingUp class="w-3 h-3" />
            {stat.change}%
          </span>
        {:else}
          <span class={`flex items-center gap-1 px-2 py-1 rounded-full ${stat.highlight ? "bg-white/20" : "bg-red-100 text-red-600"}`}>
            <TrendingDown class="w-3 h-3" />
            {stat.change}%
          </span>
        {/if}

        <!-- Conditional text -->
        {#if stat.note}
          <span class={`${stat.highlight ? "opacity-90" : "text-gray-400"}`}>
            {stat.note}
          </span>
        {:else}
          <span class="text-gray-400">
            vs sebelumnya {formatRupiah(stat.prev || 0)}
          </span>
        {/if}
      </div>
    </div>
  {/each}
</div>
