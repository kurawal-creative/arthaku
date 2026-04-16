<script>
  import DeleteAccount from '$lib/components/DeleteAccount.svelte';
  import SubscriptionStatus from '$lib/components/SubscriptionStatus.svelte';
  import TopbarProfile from '$lib/components/topbars/TopbarProfile.svelte'
  import { Input } from '$lib/components/ui/input/index.js'
  import * as Select from '$lib/components/ui/select/index.js'
  import { Switch } from '$lib/components/ui/switch/index.js'

  let name = $state('Astha')
  let goal = $state('Menabung')
  let tone = $state('Santai')
  let reminder = $state(true)

  const goalOptions = ['Menabung', 'Menghemat', 'Kontrol pengeluaran']
  const toneOptions = ['Santai', 'Formal', 'Tegas']

  const fieldClass =
    'h-10 w-full rounded-xl border border-border/70 bg-muted/30 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background focus:ring-2 focus:ring-primary/20 dark:bg-muted/25'

  const selectTriggerClass =
    'h-10 w-full rounded-xl border-border/70 bg-muted/30 px-3 text-sm focus:bg-background focus-visible:border-input focus-visible:ring-0 dark:bg-muted/25'

  const selectItemClass =
    'focus:bg-muted focus:text-foreground data-highlighted:bg-muted data-highlighted:text-foreground'
</script>

<main class="space-y-6 p-4 md:p-6">
  <TopbarProfile />

  <div class="grid gap-4 lg:grid-cols-3">
    <section class="space-y-4 rounded-2xl bg-card p-4 shadow-sm lg:col-span-2">
      <div>
        <h2 class="text-base font-semibold text-foreground">Informasi Dasar</h2>
        <p class="text-sm text-muted-foreground">Data personal untuk personalisasi chatbot keuangan.</p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="space-y-2 sm:col-span-2">
          <label class="text-sm font-normal text-foreground" for="profile-name">Nama yang digunakan bot</label>
          <Input id="profile-name" type="text" bind:value={name} class={fieldClass} />
          <p class="text-xs text-muted-foreground">Bot akan memanggil kamu dengan nama ini.</p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-normal text-foreground" for="profile-goal">Tujuan utama</label>
          <Select.Root type="single" bind:value={goal}>
            <Select.Trigger id="profile-goal" class={selectTriggerClass}>{goal}</Select.Trigger>
            <Select.Content>
              {#each goalOptions as option}
                <Select.Item value={option} label={option} class={selectItemClass} />
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-normal text-foreground" for="profile-tone">Gaya komunikasi</label>
          <Select.Root type="single" bind:value={tone}>
            <Select.Trigger id="profile-tone" class={selectTriggerClass}>{tone}</Select.Trigger>
            <Select.Content>
              {#each toneOptions as option}
                <Select.Item value={option} label={option} class={selectItemClass} />
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <div class="sm:col-span-2">
          <div class="flex items-center justify-between rounded-xl border border-border/70 bg-muted/30 px-3 py-2.5 dark:bg-muted/25">
            <div>
              <p class="text-sm font-medium text-foreground">Reminder harian</p>
              <p class="text-xs text-muted-foreground">Kirim pengingat otomatis untuk catat transaksi harian.</p>
            </div>
            <Switch bind:checked={reminder} aria-label="Reminder harian" />
          </div>
        </div>
      </div>
    </section>

    <div class="space-y-4">
      <!-- Subscription Status -->
      <SubscriptionStatus />

      <!-- Delete Account -->
      <DeleteAccount />
    </div>
  </div>
</main>